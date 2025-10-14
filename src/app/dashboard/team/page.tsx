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
import { PlusCircle, Loader2, MoreHorizontal, Lock, Users2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFirebase, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import type { Organization, UserProfile } from '@/lib/types';
import { collection, doc, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function TeamPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: currentUserProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const organizationRef = useMemoFirebase(() => currentUserProfile?.organizationId ? doc(firestore, 'organizations', currentUserProfile.organizationId) : null, [firestore, currentUserProfile]);
  const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);

  const teamQuery = useMemoFirebase(
    () =>
      currentUserProfile && organization?.subscriptionPlan === 'team'
        ? query(
            collection(firestore, 'users'),
            where('organizationId', '==', currentUserProfile.organizationId)
          )
        : null,
    [firestore, currentUserProfile, organization]
  );
  const { data: teamMembers, isLoading: isTeamLoading } = useCollection<UserProfile>(teamQuery);

  const handleInvite = async () => {
    if (!inviteEmail) {
      toast({
        variant: 'destructive',
        title: 'Email required',
        description: 'Please enter an email to send an invite.',
      });
      return;
    }
    setIsSaving(true);

    // In a real app, you would trigger a Firebase Function to send an email
    // and create an invitation document.
    console.log(`Simulating invite to: ${inviteEmail}`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Invite Sent (Simulated)',
      description: `${inviteEmail} has been invited to join your team.`,
    });

    setIsSaving(false);
    setIsDialogOpen(false);
    setInviteEmail('');
  };
  
  const isLoading = isProfileLoading || isOrgLoading || isTeamLoading;

  if (isLoading) {
     return (
       <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
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

  if (organization?.subscriptionPlan !== 'team') {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-12">
        <div className="bg-primary/10 rounded-full p-4 mb-6">
          <Users2 className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl mb-2">Upgrade to Manage Your Team</CardTitle>
        <CardDescription className="max-w-md mb-6">
          Team Management is a premium feature. Upgrade to the Team plan to invite members, share price books, and collaborate on proposals.
        </CardDescription>
        <Button asChild>
          <Link href="/pricing">View Upgrade Options</Link>
        </Button>
      </Card>
    );
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Team Management</CardTitle>
          <CardDescription>
            Manage your team members and their roles.
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto gap-1">
              <PlusCircle className="h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a New Team Member</DialogTitle>
              <DialogDescription>
                Enter the email of the person you want to invite. They will
                receive an email with instructions to join.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleInvite} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                          <DropdownMenuItem>Make Admin</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove
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
