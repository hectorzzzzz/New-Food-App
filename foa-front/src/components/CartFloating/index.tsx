//file to make a floating cart

'use client'

import React, { useState, useMemo } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import style from './page.module.scss';
import { CartItem } from '@/types/restaurant';
import Link from 'next/link';

interface Props {
  cartItems: CartItem[];
  restaurantId: string;
}

export default function CartFloating({ cartItems, restaurantId }: Props) {
  const [show, setShow] = useState(false);
  const cartLength = useMemo(() => cartItems?.length || 0, [cartItems]);

  return (
    <div className={style['float-container']}>
      <div className='position-relative'>
        {show && (
          <div
            className={`${style['cart-container']} rounded border border-primary-subtle bg-white shadow p-3 d-flex flex-column`}
          >
            <div className='flex-fill'>
              {cartLength > 0 ? (
                <ListGroup className='list-group-flush my-n3'>
                  {cartItems?.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className='align-items-center'>
                        <Col xs='auto'>
                          <img
                            src='https://i.etsystatic.com/22609133/c/2250/2250/0/326/il/b8b7d4/2340471765/il_300x300.2340471765_rahs.jpg'
                            className='avatar avatar-rounded'
                            width={64}
                            height={48}
                            alt='item'
                          />
                        </Col>
                        <Col className='ms-n2'>
                          <h4 className='mb-2'>
                            {item.dish.name} x {item.quantity}
                          </h4>
                          <small className='card-text text-muted'>
                            Harga: {item.quantity * (item.dish.price || 0)}
                          </small>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                  <h2 className='text-muted'>Keranjang Kosong</h2>
                </div>
              )}
            </div>

            <div className='d-flex justify-content-center'>
              <Link href={`/restaurant/${restaurantId}/checkout`}>
                <Button variant='outline-primary'>Checkout</Button>
              </Link>
            </div>
          </div>
        )}
        <Button
          className='shadow'
          onClick={() => setShow((prev) => !prev)}
        >
          <i className='fe fe-shopping-cart'></i>
        </Button>
      </div>
    </div>
  );
}