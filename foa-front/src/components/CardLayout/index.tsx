//file to create card layout

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

interface Props {
  redirect?: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  image?: string;
}

export default function CardLayout({
  redirect,
  title,
  description,
  children,
  image,
}: Props) {
  return (
    <Card>
      <img
        className='card-img-top'
        src={image}
        loading='lazy'
      />
      <Card.Body>
        <Row className='align-items-center'>
          <Col>
            <h4 className='mb-2 name'>
              {redirect ? <Link href={redirect}>{title}</Link> : title}
            </h4>
            <p className='small text-muted card-text'>{description}</p>
          </Col>
        </Row>
      </Card.Body>
      {children && (
        <Card.Footer className='card-footer-box'>{children}</Card.Footer>
      )}
    </Card>
  );
}