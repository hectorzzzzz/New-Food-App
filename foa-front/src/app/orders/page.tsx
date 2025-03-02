//file to create order page

'use client';

import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import { getUserOrders } from '@/services/restaurants';
import { Order } from '@/types/restaurant';
import React, { useEffect } from 'react';
import { Badge, Col, Container, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface State {
  loading: boolean;
  orders: Order[];
  error: string | null;
}

const InitState: State = {
  loading: true,
  orders: [],
  error: null,
};

export default function OrderList() {
  const [{ loading, orders, error }, updateState] = useFormReducer(InitState);

  const BadgeColors: Record<string, string> = {
    Waiting: 'danger', 
    Delivering: 'warning',
    Done: 'success',
  };

  async function loadOrders() {
    updateState({ loading: true, error: null });

    try {
      const { data } = await getUserOrders();
      console.log('Orders Data:', data); 

      updateState({ orders: data, loading: false });
    } catch (err: any) {
      console.error('Error loading orders:', err);
      updateState({ loading: false, error: 'Failed to load orders.' });
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <main>
      <WithLoading loading={loading} message={'Memuat pesanan...'}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Container className="mt-3">
          <div className="col-xl-8 col-lg-10 col-12">
            <ListGroup className="list-group-flush my-n3">
              {orders.map((order) => (
                <ListGroup.Item key={order._id}>
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <img
                        src={order?.restaurant?.image} 
                        className="rounded-circle border" 
                        width={64}
                        height={48}
                        alt={order?.restaurant?.name || 'Restaurant'}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.png'; 
                        }}
                      />
                    </Col>

                    <Col className="ms-n2">
                      <h2 className="mb-2">{order?.restaurant?.name || 'Nama Tidak Tersedia'}</h2>
                      <p className="text-muted mb-0 small">
                        {order?.restaurant?.alamat || 'Alamat Tidak Diketahui'}
                      </p>
                    </Col>

                    <Col className="ms-n2 text-end">
                      <Badge bg={BadgeColors[order.status] || 'secondary'}>
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
