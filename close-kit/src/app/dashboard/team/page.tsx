'use client';
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
import { PlusCircle, Loader2, MoreHorizontal, Users2, KeyRound, Copy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFirebase, useCollection, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import type { Organization, UserProfile } from '@/lib/types';
import { collection, doc, query, where, getDocs, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

function TeamSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </div>
                <Skeleton className="h-10 w-32" />
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {[...Array(2)].map((_, i) => (
                        <TableRow key={i}>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-5 w-24" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-40" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-16" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-8 w-8 ml-auto" />
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    )
}

export default function TeamPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [inviteKey, setInviteKey] = useState('');

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: currentUserProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const organizationRef = useMemoFirebase(() => currentUserProfile?.organizationId ? doc(firestore, 'organizations', currentUserProfile.organizationId) : null, [firestore, currentUserProfile]);
  const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);

  const teamQuery = useMemoFirebase(
    () =>
      currentUserProfile?.organizationId && organization?.subscriptionPlan === 'team'
        ? query(
            collection(firestore, 'users'),
            where('organizationId', '==', currentUserProfile.organizationId)
          )
        : null,
    [firestore, currentUserProfile, organization]
  );
  const { data: teamMembers, isLoading: isTeamLoading } = useCollection<UserProfile>(teamQuery);

  const copyUserKey = () => {
    if (currentUserProfile?.userKey) {
        navigator.clipboard.writeText(currentUserProfile.userKey);
        toast({
            title: "Copied to Clipboard",
            description: "Your personal user key has been copied."
        });
    }
  }
  
  const handleInvite = async () => {
    if (!inviteKey || !currentUserProfile?.organizationId) {
      toast({
        variant: 'destructive',
        title: 'User Key required',
        description: 'Please enter a key to invite a user.',
      });
      return;
    }
    setIsSaving(true);
    
    try {
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('userKey', '==', inviteKey), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            toast({ variant: 'destructive', title: 'Invalid Key', description: 'No user found with that key.' });
            setIsSaving(false);
            return;
        }

        const userToInviteRef = querySnapshot.docs[0].ref;
        
        await setDocumentNonBlocking(userToInviteRef, {
            organizationId: currentUserProfile.organizationId,
            role: 'member'
        }, { merge: true });

        toast({
            title: 'User Added!',
            description: `The user has been successfully added to your organization.`,
        });

        setIsSaving(false);
        setIsDialogOpen(false);
        setInviteKey('');
    } catch(e: any) {
         toast({ variant: 'destructive', title: 'Error', description: e.message });
         setIsSaving(false);
    }
  };
  
  const isLoading = isProfileLoading || isOrgLoading || isTeamLoading;

  if (isLoading) {
     return <TeamSkeleton />
  }

  if (organization?.subscriptionPlan !== 'team') {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-12">
        <div className="bg-primary/10 rounded-full p-4 mb-6">
          <Users2 className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl mb-2">Upgrade to Manage Your Team</CardTitle>
        <CardDescription className="max-w-md mb-6">
          Team Management is a premium feature. Upgrade to the Team plan to invite members, manage roles, and collaborate on proposals.
        </CardDescription>
        <Button asChild>
          <Link href="/pricing">View Upgrade Options</Link>
        </Button>
      </Card>
    );
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="grid gap-2">
          <CardTitle>Team Management</CardTitle>
          <CardDescription>
            Invite and manage your team members and their roles.
          </CardDescription>
        </div>
         <div className="flex items-center gap-2">
            {currentUserProfile?.userKey && (
                <Card className="p-2 flex items-center gap-2 bg-secondary">
                    <KeyRound className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm text-muted-foreground">Your Key: {currentUserProfile.userKey}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyUserKey}>
                        <Copy className="w-4 h-4" />
                    </Button>
                </Card>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Invite by User Key</DialogTitle>
                <DialogDescription>
                    Enter the unique 8-character key of the user you want to add to your organization.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="key" className="text-right">
                    User Key
                    </Label>
                    <Input
                    id="key"
                    className="col-span-3 font-mono"
                    value={inviteKey}
                    onChange={(e) => setInviteKey(e.target.value.toUpperCase())}
                    />
                </div>
                </div>
                <DialogFooter>
                <Button onClick={handleInvite} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Member
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatarUrl} alt={`${member.firstName} ${member.lastName}`} />
                          <AvatarFallback>
                            {member.firstName?.[0]}
                            {member.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {member.firstName} {member.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell className="capitalize">{member.role}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                           <DropdownMenuItem asChild>
                                <Link href={`/dashboard/team/roles/${member.id}`}>Manage Role</Link>
                           </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove from Team
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
