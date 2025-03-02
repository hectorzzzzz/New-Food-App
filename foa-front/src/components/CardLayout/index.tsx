'use client';

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
      <img className="card-img-top" src={image} loading="lazy" />
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <h4 className="mb- name">
              {redirect ? <Link href={redirect}>{title}</Link> : title}
            </h4>
            <div className="small text-muted card-text">{description}</div> 
          </Col>
        </Row>
      </Card.Body>
      {children && <Card.Footer className="card-footer-box">{children}</Card.Footer>}
    </Card>
  );
}