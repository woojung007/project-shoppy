import { User } from 'firebase/auth';
import React from 'react';

type UserProps = {
  user: User;
};

export default function UserProfile({
  user: { photoURL, displayName },
}: UserProps) {
  return (
    <div className='flex items-center shrink-0'>
      <img
        className='w-10 h-10 mr-2 rounded-full'
        src={photoURL!}
        alt={displayName!}
      />
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
