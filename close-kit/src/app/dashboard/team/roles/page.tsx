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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFirebase, useCollection, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import type { Organization, UserProfile } from '@/lib/types';
import { collection, doc, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Shield, Users2 } from 'lucide-react';
import { useState } from 'react';

type Role = 'admin' | 'member';

export default function RolesPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: currentUserProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);
  const { isAdmin } = useUser();

  const organizationRef = useMemoFirebase(() => currentUserProfile?.organizationId ? doc(firestore, 'organizations', currentUserProfile.organizationId) : null, [firestore, currentUserProfile]);
  const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);

  const teamQuery = useMemoFirebase(
    () =>
      currentUserProfile?.organizationId
        ? query(
            collection(firestore, 'users'),
            where('organizationId', '==', currentUserProfile.organizationId)
          )
        : null,
    [firestore, currentUserProfile]
  );
  const { data: teamMembers, isLoading: isTeamLoading } = useCollection<UserProfile>(teamQuery);

  const [memberRoles, setMemberRoles] = useState<{[key: string]: Role}>({});

  const handleRoleChange = (userId: string, role: Role) => {
    setMemberRoles(prev => ({...prev, [userId]: role}));
    
    const userDocRef = doc(firestore, 'users', userId);
    setDocumentNonBlocking(userDocRef, { role }, { merge: true });
    
    toast({
        title: "Role Updated",
        description: `The user's role has been changed to ${role}.`
    });
  };

  const isLoading = isProfileLoading || isOrgLoading || isTeamLoading;

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />
  }

  if (organization?.subscriptionPlan !== 'team' || !isAdmin) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-12">
        <div className="bg-primary/10 rounded-full p-4 mb-6">
          <Shield className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl mb-2">Access Denied</CardTitle>
        <CardDescription className="max-w-md mb-6">
          Managing user roles is a premium feature for administrators on the Team plan.
        </CardDescription>
        <Button asChild>
          <Link href="/pricing">View Upgrade Options</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
        <CardDescription>
          Assign roles to your team members. Admins can manage settings and billing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Member</TableHead>
              <TableHead className="w-1/3">Email</TableHead>
              <TableHead className="w-1/3">Role</TableHead>
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
                    <span className="font-medium">{member.firstName} {member.lastName}</span>
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Select
                    value={memberRoles[member.id] || member.role}
                    onValueChange={(value: Role) => handleRoleChange(member.id, value)}
                    disabled={member.id === currentUserProfile?.id} // Can't change your own role
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
