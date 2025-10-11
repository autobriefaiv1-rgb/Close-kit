'use client';

import { useEffect, useState } from 'react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, getDocs, query, QuerySnapshot, DocumentData } from 'firebase/firestore';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import type { UserProfile } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const { firestore, user, isUserLoading } = useFirebase();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) {
      return;
    }
    if (!user) {
      router.push('/login');
      return;
    }

    user.getIdTokenResult().then(idTokenResult => {
      const claims = idTokenResult.claims;
      if (claims.isAdmin) {
        setIsAdmin(true);
        const fetchUsers = async () => {
          if (!firestore) return;
          setIsLoading(true);
          const usersCollection = collection(firestore, 'userAccounts');
          const userSnapshot = await getDocs(usersCollection);
          const usersList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile));
          setUsers(usersList);
          setIsLoading(false);
        };
        fetchUsers();
      } else {
        setIsAdmin(false);
        router.push('/dashboard');
      }
    });
  }, [user, isUserLoading, firestore, router]);
  
  if (isUserLoading || !isAdmin) {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
             <Skeleton className="w-full h-screen" />
        </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Admin Dashboard</h1>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>A list of all users in the database.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>User ID</TableHead>
                             <TableHead>Subscription</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                                     <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                </TableRow>
                            ))
                        ) : users.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>{u.companyName}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell className="font-mono text-xs">{u.id}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">Solo Plan</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
                <CardDescription>
                    You must use a backend environment (like Firebase Cloud Functions) with the Firebase Admin SDK to set custom claims.
                </CardDescription>
            </CardHeader>
             <CardContent>
                <p className="text-sm text-muted-foreground">
                    To make another user an admin, you need to run a function on a trusted server. You cannot do this from the client-side application.
                    <br/>
                    Example Cloud Function code:
                </p>
                <pre className="mt-2 p-4 bg-muted rounded-md text-xs overflow-x-auto">
                    <code>
{`
const admin = require('firebase-admin');

// Make sure to initialize the app in your function
// admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check request is made by an admin
  if (context.auth.token.isAdmin !== true) {
    return { error: 'Only admins can add other admins.' };
  }
  // Get user and add custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      isAdmin: true
    });
  }).then(() => {
    return { message: \`Success! \${data.email} has been made an admin.\` }
  }).catch(err => {
    return err;
  });
});
`}
                    </code>
                </pre>
                 <Button variant="link" asChild className="p-0 mt-2">
                    <Link href="https://firebase.google.com/docs/auth/admin/custom-claims" target="_blank">
                        Learn more about custom claims
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
