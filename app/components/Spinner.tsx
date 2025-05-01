import React from 'react';

export default function Spinner() {
  return (
    <div className='fixed inset-0 z-50 bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
      <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent' />
    </div>
  );
}
