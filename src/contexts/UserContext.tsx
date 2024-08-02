import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
// import { attachTokenInterceptor } from '../api/api';
import getStorage from '../api/storage';
import type { StorageValue } from '../api/storage';
import type { User } from '../api/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

function isUser(value: unknown): value is User {
  if (
    value &&
    typeof value === 'object' &&
    'id' in value &&
    'name' in value &&
    'email' in value
  ) {
    return true;
  }
  return false;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const storage = getStorage();

  useEffect(() => {
    const init = async () => {
      storage.getItem<StorageValue>('user')
        .then((result) => {
          if (typeof result === 'object' && isUser(result))
            setUser(result);
        });
      storage.getItem<StorageValue>('accessToken')
        .then((token) => {
          if (typeof token === 'string') {
            setAccessToken(token);
            // attachTokenInterceptor(token);
          }
        })
    }
    init()
  }, []);

  useEffect(() => {
    if (user) {
      // chrome.storage.local.set({ user });
      storage.setItem('user', user as unknown as Record<string, unknown>);
    } else {
      // chrome.storage.local.remove('user');
      storage.removeItem('user');
    }

    if (accessToken) {
      // chrome.storage.local.set({ accessToken });
      storage.setItem('accessToken', accessToken);
      // attachTokenInterceptor(accessToken);
    } else {
      // chrome.storage.local.remove('accessToken');
      storage.removeItem('accessToken');
    }
  }, [user, accessToken]);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    // chrome.storage.local.remove('user');
    // chrome.storage.local.remove('accessToken');
    storage.removeItem('user');
    storage.removeItem('accessToken');
  };

  return (
    <UserContext.Provider value={{ user, setUser, accessToken, setAccessToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
