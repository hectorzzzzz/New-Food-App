//file to handle quantity change in cart

'use client';

import { Dish } from '@/types/restaurant';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

interface Props {
  handleChangeCart: (dishId: string, quantity: number) => Promise<void>;
  quantity: number;
  dish: Dish;
  disabled: boolean;
}

export default function ChangeQuantity({
  disabled,
  dish,
  quantity,
  handleChangeCart,
}: Props) {
  return (
    <Row className="justify-content-center">
      <Col xs="auto">
        <Button
          disabled={disabled || quantity === 0}
          onClick={() => handleChangeCart(dish._id, quantity - 1)}
          variant="outline-primary"
        >
          -
        </Button>
      </Col>
      <Col xs="auto">
        <Form.Control
          disabled
          value={quantity || 0}
          className="text-center px-0"
        />
      </Col>
      <Col xs="auto">
        <Button
          disabled={disabled}
          onClick={() => handleChangeCart(dish._id, quantity + 1)}
          variant="outline-primary"
        >
          +
        </Button>
      </Col>
    </Row>
  );
}