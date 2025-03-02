'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface Props {
  redirect?: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  image?: string;
}

export default function CardResto({
  redirect,
  title,
  description,
  children,
  image,
}: Props) {
  return (
    <Card className="d-flex flex-row align-items-center p-3 mb-6">
      {image && (
        <Card.Img
          src={image}
          className="img-fluid rounded"
          style={{ width: '40%', height: '120px', objectFit: 'cover' }}
        />
      )}

      <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
        <h4 className="mb-2 name text-truncate">
          {redirect ? <Link href={redirect}>{title}</Link> : title}
        </h4>
        <div className="small text-muted card-description">{description}</div>
        {children && <div className="mt-3">{children}</div>}
      </Card.Body>

      <style jsx>{`
        .card-description {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Maksimal 2 baris */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          min-height: 40px; /* Atur tinggi minimal agar semua kartu sama */
        }
      `}</style>
    </Card>
  );
}
