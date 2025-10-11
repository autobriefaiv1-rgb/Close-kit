'use client';
import { useContext } from 'react';
import { User } from 'firebase/auth';
import {
  FirebaseContext,
  FirebaseContextState,
} from '@/firebase/provider';

// This is the shape of the user-related data provided by the hook.
export interface UserAuthHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * A hook to access the current authentication state of the user.
 * It provides the user object, loading status, and any authentication errors.
 *
 * @returns {UserAuthHookResult} An object containing `user`, `isUserLoading`, and `userError`.
 */
export const useUser = (): UserAuthHookResult => {
  // Access the full Firebase context.
  const context = useContext<FirebaseContextState | undefined>(FirebaseContext);

  // Ensure the hook is used within a FirebaseProvider.
  if (context === undefined) {
    throw new Error('useUser must be used within a FirebaseProvider.');
  }

  // If the core services aren't available, it implies an unauthenticated state.
  if (!context.areServicesAvailable) {
    return {
      user: null,
      isUserLoading: false, // Not loading, as we know there are no services.
      userError: new Error('Firebase services are not available.'),
    };
  }

  // Destructure the user-related properties from the context.
  const { user, isUserLoading, userError } = context;

  // Return the authentication state.
  return { user, isUserLoading, userError };
};
