'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, Send, Bot, User, MessageSquare, X } from 'lucide-react';
import { askAria } from '@/ai/flows/aria-support-flow';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function AskAriaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAria({
        query: input,
        history: messages,
      });
      const ariaMessage: Message = { role: 'model', content: response.response };
      setMessages((prev) => [...prev, ariaMessage]);
    } catch (error) {
      console.error('Error asking Aria:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        setTimeout(() => (viewport.scrollTop = viewport.scrollHeight), 0);
      }
    }
  }, [messages, isOpen]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="rounded-full w-14 h-14 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          <span className="sr-only">Ask Aria</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <Card className="w-full max-w-sm h-[60vh] flex flex-col shadow-2xl">
            <CardHeader className="text-center border-b">
              <div className="flex justify-center items-center gap-3">
                <Avatar>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot />
                  </div>
                </Avatar>
                <CardTitle className="font-headline text-2xl">Aria Support</CardTitle>
              </div>
              <CardDescription className="pt-2">
                Ask me anything about Close Kit.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden p-4">
              <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Avatar className="border">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Bot />
                      </div>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg max-w-[80%] speech-bubble-left">
                      <p className="text-sm">
                        Hello! I'm Aria. How can I help you today?
                      </p>
                    </div>
                  </div>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        message.role === 'user' ? 'justify-end' : ''
                      }`}
                    >
                      {message.role === 'model' && (
                        <Avatar className="border">
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Bot />
                          </div>
                        </Avatar>
                      )}
                      <div
                        className={`p-3 rounded-lg max-w-[80%] ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground speech-bubble-right'
                            : 'bg-muted speech-bubble-left'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <Avatar className="border">
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <Avatar className="border">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Bot />
                        </div>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg speech-bubble-left">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="flex items-center gap-2 mt-4 border-t pt-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && !isLoading && handleSend()
                  }
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="text-base"
                />
                <Button onClick={handleSend} disabled={isLoading} size="icon">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
