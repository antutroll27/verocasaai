import { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserDetailType } from '@/types';

type UserDataContextType = {
  userDetail: UserDetailType[] | null;
  setUserDetail: (userDetail: UserDetailType[] | null) => void;
  isLoading: boolean;
};

export const UserDataContext = createContext<UserDataContextType>({
  userDetail: null,
  setUserDetail: () => {},
  isLoading: false,
});

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<UserDetailType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded: isClerkLoaded } = useUser();

  useEffect(() => {
    async function fetchUserData() {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        const response = await fetch('/api/verify-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user }),
        });

        if (!response.ok) throw new Error('Failed to fetch user data');

        const data = await response.json();
        setUserDetail(data.result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isClerkLoaded && user) {
      fetchUserData();
    }
  }, [user, isClerkLoaded]);

  return (
    <UserDataContext.Provider value={{ userDetail, setUserDetail, isLoading }}>
      {children}
    </UserDataContext.Provider>
  );
}