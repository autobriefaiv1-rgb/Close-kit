import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function AiToolkitDemo() {
    const image = PlaceHolderImages.find((img) => img.id === 'demo-ai-toolkit');
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">The AI Toolkit</CardTitle>
                <CardDescription>Leverage powerful AI tools to generate options, translate technical jargon, and analyze competitor pricing to gain a competitive edge.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video overflow-hidden rounded-lg border">
                    {image && (
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
