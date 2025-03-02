//file to create a checkout page

'use client';

import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import { checkout, getCartItems } from '@/services/restaurants';
import { CartItem } from '@/types/restaurant';
import { timeout } from '@/utils/time';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  params: Promise<{ id: string }>;
}

interface State {
  loading: boolean;
  cartItems: CartItem[];
  loadingCheckout: boolean;
  error: string | null;
}

const InitState: State = {
  loading: true,
  cartItems: [],
  loadingCheckout: false,
  error: null,
};

export default function Checkout({ params }: Props) {
  const router = useRouter();
  const [{ loading, cartItems, loadingCheckout, error }, updateState] =
    useFormReducer(InitState);
  const { id: restaurantId } = use<{ id: string }>(params);

  async function loadCart() {
    updateState({ loading: true, error: null });
    try {
      const { data } = await getCartItems(restaurantId);
      updateState({ cartItems: data?.carts || [] });
    } catch (err: any) {
      console.error('Error loading cart:', err);
      updateState({ error: 'Failed to load cart items.' });
    } finally {
      updateState({ loading: false });
    }
  }

  function getInvoiceCode() {
    return `Invoice #${restaurantId.toUpperCase().slice(10)}`;
  }

  function getPrice(dish?: CartItem['dish'], quantity = 1) {
    const price = (dish?.price || 0) * quantity;

    if (dish?.discountedPrice) {
      const discounted = (dish?.discountedPrice || 0) * quantity;
      return (
        <span className="text-primary">
          <small className="me-1 text-decoration-line-through text-danger">
            ${price}
          </small>
          ${discounted}
        </span>
      );
    }

    return <span className="text-primary">${price}</span>;
  }

  function getTotal() {
    return cartItems.reduce((prev, curr) => {
      if (curr.dish.discountedPrice) {
        return prev + curr.dish.discountedPrice * curr.quantity;
      }
      return prev + (curr.dish.price || 0) * curr.quantity;
    }, 0);
  }

  async function handleCheckout() {
    updateState({ loadingCheckout: true });
    try {
      await timeout(2000);
      await checkout(restaurantId);
      router.push('/orders');
    } catch (err: any) {
      console.error('Error during checkout:', err);
      updateState({ error: 'Checkout failed. Please try again.' });
    } finally {
      updateState({ loadingCheckout: false });
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <main>
      <Container>
        <div className="col-xl-8 col-lg-10 col-12">
          <div className="header mt-md-5">
            <div className="header-body">
              <div className="align-items-center row">
                <div className="col">
                  <h6 className="header-pretitle">Payments</h6>
                  <h1 className="header-title">{getInvoiceCode()}</h1>
                </div>
                <div className="col-auto">
                  <Button
                    disabled={loadingCheckout || loading}
                    className="lift ms-2"
                    onClick={handleCheckout}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <WithLoading loading={loading} message="Mengambil data pesanan...">
            {error && <div className="alert alert-danger">{error}</div>}
            <Card className={loadingCheckout ? 'opacity-50' : ''}>
              <Card.Body className="p-5">
                <Row>
                  <Col className="text-center">
                    <div className="d-flex align-items-center justify-content-center mb-4">
                      <div style={{ maxWidth: '80px' }} className="bg-dark p-2 w-100">
                        <img className="img-fluid" src="/vercel.svg" alt="Vercel Logo" />
                      </div>
                    </div>
                    <h2 className="mb-2">Pesanan Restaurant</h2>
                    <p className="text-muted mb-6">{getInvoiceCode()}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Table responsive className="my-4">
                      <thead>
                        <tr>
                          <th className="px-0 bg-transparent border-top-0">
                            <span className="h6">Item</span>
                          </th>
                          <th className="px-0 bg-transparent border-top-0">
                            <span className="h6">Quantity</span>
                          </th>
                          <th className="px-0 bg-transparent border-top-0 text-end">
                            <span className="h6">Price</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {cartItems.map((c) => (
                          <tr key={c._id}>
                            <td className="px-0">{c.dish.name}</td>
                            <td className="px-0">{c.quantity}</td>
                            <td className="px-0 text-end">{getPrice(c.dish, c.quantity)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="px-0 border-top border-top-2">Total</td>
                          <td colSpan={2} className="px-0 text-end border-top border-top-2 text-primary">
                            <h3>${getTotal()}</h3>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row></Row>
              </Card.Body>
            </Card>
          </WithLoading>
        </div>
      </Container>
    </main>
  );
}