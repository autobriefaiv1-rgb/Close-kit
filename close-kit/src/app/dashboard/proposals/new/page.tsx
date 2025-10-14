'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Trash, Upload, Loader2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useFirebase, useCollection, addDocumentNonBlocking, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import type { Customer, UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function NewProposalPage() {
    const { firestore, user } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();

    const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
    const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

    const customersQuery = useMemoFirebase(
      () => userProfile ? collection(firestore, 'organizations', userProfile.organizationId, 'customers') : null,
      [firestore, userProfile]
    );
    const { data: customers } = useCollection<Customer>(customersQuery);

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [isSaving, setIsSaving] = useState(false);


    const handleSendProposal = async () => {
        if (!user || !firestore || !userProfile) return;

        if (!selectedCustomerId) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a customer.' });
            return;
        }

        setIsSaving(true);
        try {
            const selectedCustomer = customers?.find(c => c.id === selectedCustomerId);
            const proposalData = {
                organizationId: userProfile.organizationId,
                customerId: selectedCustomerId,
                customerName: selectedCustomer?.name || 'Unknown',
                status: 'Sent', // Or 'Draft' if you save as draft
                amount: 3754.10, // Placeholder
                createdAt: serverTimestamp(),
            };

            await addDocumentNonBlocking(collection(firestore, 'organizations', userProfile.organizationId, 'proposals'), proposalData);
            
            toast({ title: 'Proposal Sent!', description: 'Your proposal has been successfully sent.' });
            router.push('/dashboard/proposals');

        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
            setIsSaving(false);
        }
    }


  return (
    <div className="mx-auto grid max-w-6xl flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          New Proposal
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" disabled={isSaving}>Save Draft</Button>
          <Button onClick={handleSendProposal} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Proposal
          </Button>
        </div>
         <div className="md:hidden ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                  <MoreVertical />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled={isSaving}>Save Draft</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSendProposal} disabled={isSaving}>
                    {isSaving ? 'Sending...' : 'Send Proposal'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Details</CardTitle>
              <CardDescription>
                Select customer and provide job details.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="customer">Customer</Label>
                <Select onValueChange={setSelectedCustomerId} value={selectedCustomerId}>
                  <SelectTrigger id="customer" aria-label="Select customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers?.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  defaultValue="New AC unit installation for a 2000 sq ft home. Includes removal of old unit."
                  className="min-h-32"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Line Items</CardTitle>
              <CardDescription>
                Add materials, labor, and other costs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      High-Efficiency Furnace
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>$2,500.00</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon"><Trash className="h-4 w-4"/></Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Senior HVAC Technician
                    </TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>$120.00</TableCell>
                    <TableCell className="text-right">$960.00</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon"><Trash className="h-4 w-4"/></Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardContent>
                <Button size="sm" variant="outline" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Line Item
                </Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Good-Better-Best Options</CardTitle>
              <CardDescription>
                Generate AI-powered options to present to your customer.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <Button variant="outline">Generate GBB Options with AI</Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$3,460.00</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax (8.5%)</span>
                    <span>$294.10</span>
                </div>
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$3,754.10</span>
                </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Job Photos</CardTitle>
              <CardDescription>
                Upload images related to the job site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="grid h-48 w-full cursor-pointer grid-cols-2 gap-2">
                    <div className="flex items-center justify-center rounded-md border border-dashed text-sm">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                    </div>
                     <div className="flex items-center justify-center rounded-md border border-dashed text-sm">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
