import { createContext } from 'react';
import { UserDetailType } from '@/types';

type UserDataContextType = {
  userDetail: UserDetailType[] | null;
  setUserDetail: (userDetail: UserDetailType[] | null) => void;
};

export const UserDataContext = createContext<UserDataContextType>({
  userDetail: null,
  setUserDetail: () => {},
});