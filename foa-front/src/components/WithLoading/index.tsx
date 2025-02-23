//file to create loading

import React from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
  children: React.ReactNode;
  loading: boolean;
  message?: string | null;
}

export default function WithLoading({ children, loading, message }: Props) {
  if (loading) {
    return (
      <div className='d-flex justify-content-center flex-column align-items-center my-5'>
        <Spinner variant='primary' />
        {!!message && <p className='mt-4'>{message}</p>}
      </div>
    );
  }
  return children;
}