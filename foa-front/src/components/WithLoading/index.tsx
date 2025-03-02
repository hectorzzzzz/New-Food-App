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
      <div className="d-flex justify-content-center align-items-center vh-100 bg">
        <div className="text-center">
          <Spinner variant="primary" />
          {!!message && <p className="mt-4">{message}</p>}
        </div>
      </div>
    );
  }
  return children;
}