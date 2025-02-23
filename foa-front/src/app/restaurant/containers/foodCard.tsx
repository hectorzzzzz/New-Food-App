//file to generate cards for food/dish

import CardLayout from '@/components/CardLayout';
import React, { ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';

interface Props {
  children: ReactNode;
  name: string;
  description: string;
  price: ReactNode;
  image?: string;
}

export default function FoodCard({
  children,
  name,
  description,
  price,
  image,
}: Props) {
  return (
    <Col
      xs={12}
      md={6}
      xl={4}>
      <CardLayout
        title={name}
        description={
          <Row>
            <Col xs={6}>{description}</Col>
            <Col xs={6}>{price}</Col>
          </Row>
        }
        redirect=''
        image={image}>
        {children}
      </CardLayout>
    </Col>
  );
}