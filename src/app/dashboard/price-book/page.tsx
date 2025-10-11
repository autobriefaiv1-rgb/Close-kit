'use client';

import { PlusCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFirebase, useCollection, addDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import type { PriceBookItem } from '@/lib/types';
import { useState } from 'react';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PriceBookPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  
  const priceBookQuery = useMemoFirebase(
    () => user ? collection(firestore, 'userAccounts', user.uid, 'priceBookEntries') : null,
    [firestore, user]
  );
  const { data: priceBook, isLoading } = useCollection<PriceBookItem>(priceBookQuery);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newItem, setNewItem] = useState<{name: string, category: 'Material' | 'Equipment' | 'Labor' | '', cost: string, unit: string}>({
    name: '',
    category: '',
    cost: '',
    unit: '',
  });

  const handleSaveItem = async () => {
    if (!user || !firestore) return;
    if (!newItem.name || !newItem.category || !newItem.cost) {
        toast({ variant: 'destructive', title: 'Missing Information', description: 'Name, category, and cost are required.' });
        return;
    }
    
    setIsSaving(true);
    try {
        const itemData = { 
            ...newItem, 
            cost: parseFloat(newItem.cost),
            userId: user.uid 
        };
        await addDocumentNonBlocking(collection(firestore, 'userAccounts', user.uid, 'priceBookEntries'), itemData);
        
        toast({ title: 'Item Added', description: `${newItem.name} has been added to your price book.` });
        setIsDialogOpen(false);
        setNewItem({ name: '', category: '', cost: '', unit: '' });
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
        setIsSaving(false);
    }
  };


  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Price Book</CardTitle>
          <CardDescription>
            Manage costs for materials, equipment, and labor.
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Price Book Item</DialogTitle>
              <DialogDescription>
                Enter the details for the new item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select onValueChange={(value: 'Material' | 'Equipment' | 'Labor') => setNewItem({...newItem, category: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Material">Material</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Labor">Labor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">
                  Cost
                </Label>
                <Input id="cost" type="number" className="col-span-3" value={newItem.cost} onChange={e => setNewItem({...newItem, cost: e.target.value})} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unit
                </Label>
                <Input id="unit" placeholder="e.g., each, per foot" className="col-span-3" value={newItem.unit} onChange={e => setNewItem({...newItem, unit: e.target.value})} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveItem} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Item
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
                [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
                    </TableRow>
                ))
            ) : priceBook && priceBook.length > 0 ? (
                priceBook.map((item) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No price book items found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
