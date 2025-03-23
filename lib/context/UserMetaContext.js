'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserMetaContext = createContext();

export function UserMetaProvider({ children, userId }) {
  const value = {
    userId: '123',
    warehouses: [
        {
            id: '1',
            name: 'TikTok US East'
        },
        {
            id: '2',
            name: 'TikTok US West'
        },
        {
            id: '3',
            name: 'Amazon ATL'
        },
        {
            id: '4',
            name: 'Ebay US'
        }
    ],
  };

  return (
    <UserMetaContext.Provider value={value}>
      {children}
    </UserMetaContext.Provider>
  );
}

export function useUserMeta() {
  const context = useContext(UserMetaContext);
  if (context === undefined) {
    throw new Error('useUserMeta must be used within a UserMetaProvider');
  }
  return context;
} 