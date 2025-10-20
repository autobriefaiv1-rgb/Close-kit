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
import { PlusCircle, Trash, Upload, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { useFirebase, useCollection, addDocumentNonBlocking, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Customer, UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NewProposalPage() {
    const { firestore, user, firebaseApp } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
    const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

    const customersQuery = useMemoFirebase(
      () => userProfile ? collection(firestore, 'organizations', userProfile.organizationId, 'customers') : null,
      [firestore, userProfile]
    );
    const { data: customers } = useCollection<Customer>(customersQuery);

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            const allFiles = [...photos, ...newFiles];
            setPhotos(allFiles);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            const allPreviews = [...photoPreviews, ...newPreviews];
            setPhotoPreviews(allPreviews);
        }
    };
    
    const removePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
        setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
    };

    const handleSendProposal = async () => {
        if (!user || !firestore || !userProfile || !firebaseApp) return;

        if (!selectedCustomerId) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a customer.' });
            return;
        }

        setIsSaving(true);
        let photoURLs: string[] = [];

        if (photos.length > 0) {
            setIsUploading(true);
            const storage = getStorage(firebaseApp);
            
            try {
                const uploadPromises = photos.map(photo => {
                    const storageRef = ref(storage, `project-photos/${user.uid}/${Date.now()}-${photo.name}`);
                    return uploadBytes(storageRef, photo).then(snapshot => getDownloadURL(snapshot.ref));
                });
                photoURLs = await Promise.all(uploadPromises);
            } catch (error: any) {
                 toast({ variant: 'destructive', title: 'Photo Upload Failed', description: error.message });
                 setIsSaving(false);
                 setIsUploading(false);
                 return;
            }
            setIsUploading(false);
        }

        try {
            const selectedCustomer = customers?.find(c => c.id === selectedCustomerId);
            const proposalData = {
                organizationId: userProfile.organizationId,
                customerId: selectedCustomerId,
                customerName: selectedCustomer?.name || 'Unknown',
                status: 'Sent', // Or 'Draft' if you save as draft
                amount: 3754.10, // Placeholder
                createdAt: serverTimestamp(),
                photoURLs: photoURLs,
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
            {(isSaving || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUploading ? 'Uploading Photos...' : 'Send Proposal'}
          </Button>
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
               <div className="grid gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                     {photoPreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square">
                           <Image src={preview} alt={`Photo preview ${index + 1}`} fill className="object-cover rounded-md" />
                           <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 rounded-full"
                              onClick={() => removePhoto(index)}
                           >
                              <X className="h-4 w-4" />
                           </Button>
                        </div>
                     ))}
                     <div
                        className="flex items-center justify-center flex-col gap-2 rounded-md border-2 border-dashed text-sm text-muted-foreground cursor-pointer aspect-square hover:bg-muted/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                     >
                        <Upload className="h-6 w-6" />
                        <span>Upload</span>
                     </div>
                  </div>

                  <Input
                     ref={fileInputRef}
                     type="file"
                     multiple
                     accept="image/*"
                     className="hidden"
                     onChange={handleFileChange}
                  />
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm" disabled={isSaving}>
          Save Draft
        </Button>
        <Button size="sm" onClick={handleSendProposal} disabled={isSaving}>
            {(isSaving || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUploading ? 'Uploading...' : 'Send Proposal'}
        </Button>
      </div>
    </div>
  );
}
