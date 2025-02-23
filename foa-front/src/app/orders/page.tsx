//file to create order page

'use client';
import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import { getUserOrders } from '@/services/restaurants';
import { Order } from '@/types/restaurant';
import React, { useEffect } from 'react';
import { Badge, Col, Container, ListGroup, Row } from 'react-bootstrap';

interface State {
    loading: boolean;
    orders: Order[];
  }
  
  const InitState: State = {
    loading: true,
    orders: [],
  };
  
  export default function OrderList() {
    const [{ loading, orders }, updateState] = useFormReducer(InitState);
  
    const BadgeColors: Record<string, string> = {
      Waiting: 'dangerous-soft',
      Delivering: 'warning-soft',
      Done: 'success-soft',
    };
  
    async function loadOrders() {
      updateState({ loading: false });
      try {
        const { data } = await getUserOrders();
        updateState({ orders: data });
      } finally {
        updateState({ loading: false });
      }
    }
  
    useEffect(() => {
      loadOrders();
    }, []);

    return (
        <main>
          <WithLoading
            loading={loading}
            message={'Memuat pesanan...'}>
            <Container className='mt-3'>
              <div className='col-xl-8 col-lg-10 col-12'>
                <ListGroup className='list-group-flush my-n3'>
                  {orders.map((order) => (
                    <ListGroup.Item key={order._id}>
                      <Row className='align-items-center'>
                        <Col xs='auto'>
                          <img
                            src={order.restaurant.image}
                            className='avatar avatar-rounded'
                            width={64}
                            height={48}
                            alt='restaurant'
                          />
                        </Col>
                        <Col className='ms-n2'>
                          <h2 className='mb-2'>{order.restaurant.name}</h2>
                          <p className='text-muted mb-0 small'>
                            {order.restaurant.alamat}
                          </p>
                        </Col>
                        <Col className='ms-n2 text-end'>
                          <Badge bg={BadgeColors[order.status]}>
                            {order.status}
                          </Badge>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Container>
          </WithLoading>
        </main>
    );
}