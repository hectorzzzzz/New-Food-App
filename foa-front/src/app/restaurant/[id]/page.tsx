//file to create a cart

'use client';

import CartFloating from '@/components/CartFloating';
import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import { getCartItems, getDishes, setCartItem } from '@/services/restaurants';
import { CartItem, Dish } from '@/types/restaurant';
import React, { use, useEffect, useMemo, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ChangeQuantity from '../containers/ChangeQuantity';
import FoodCard from '../containers/FoodCard';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  params: Promise<{ id: string }>;
}

interface State {
  loading: boolean;
  loadingCartChanging: boolean;
  dishes: Dish[];
  cartItems: CartItem[];
  page: number;
  error: string | null;
}

const InitState: State = {
  loading: true,
  loadingCartChanging: false,
  dishes: [],
  cartItems: [],
  page: 1,
  error: null,
};

export default function RestaurantDetail({ params }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ dishes, loading, cartItems, page, loadingCartChanging, error }, updateState] =
    useFormReducer(InitState);
  const { id: restaurantId } = use<{ id: string }>(params);
  const [cartHashMap, setCartHashMap] = useState<Record<string, number>>({});

  useEffect(() => {
    setCartHashMap(
      cartItems.reduce((acc, cart) => {
        acc[cart.dish._id] = cart.quantity;
        return acc;
      }, {})
    );
  }, [cartItems]);

  function getPrice(dish: Dish) {
    if (dish.discountedPrice) {
      return (
        <h2 className="text-primary d-flex justify-content-end">
          ${dish.discountedPrice}
          <small className="text-decoration-line-through text-danger">
            ${dish.price}
          </small>
        </h2>
      );
    }

    return <h2 className="text-primary d-flex justify-content-end">${dish.price}</h2>;
  }

  async function loadMenu() {
    updateState({ loading: true, error: null });
    try {
      const { data } = await getDishes(restaurantId, page);
      updateState({ dishes: data.items });
      await loadCart();
    } catch (error: any) {
      console.error('Error loading menu:', error);
      updateState({ error: 'Failed to load menu.' });
    } finally {
      updateState({ loading: false });
    }
  }

  async function loadCart() {
    updateState({ loading: true, error: null });
    try {
      const { data } = await getCartItems(restaurantId);
      updateState({ cartItems: data?.carts || [] });
    } catch (error: any) {
      console.error('Error loading cart:', error);
      updateState({ error: 'Failed to load cart.' });
    } finally {
      updateState({ loading: false });
    }
  }

  async function handleChangeCart(dishId: string, quantity: number) {
    if (isNaN(quantity)) {
      console.error('Invalid quantity:', quantity);
      updateState({ error: 'Invalid quantity.' });
      return;
    }
    updateState({ loadingCartChanging: true, error: null });
    try {
      await setCartItem(restaurantId, dishId, quantity);
      updateState((prevState) => ({
        cartItems: prevState.cartItems.map((item) =>
          item.dish._id === dishId ? { ...item, quantity } : item
        ),
      }));
      setCartHashMap((prevHashMap) => ({
        ...prevHashMap,
        [dishId]: quantity,
      }));
    } catch (error: any) {
      console.error('Error changing cart:', error);
      updateState({ error: 'Failed to change cart.' });
    } finally {
      updateState({ loadingCartChanging: false });
    }
  }

  useEffect(() => {
    if (restaurantId) {
      loadMenu();
    } else {
      console.error('restaurantId is undefined.');
      updateState({ error: 'Restaurant ID is invalid.' });
    }
  }, [restaurantId]);

  return (
    <main ref={containerRef}>
      <WithLoading loading={loading} message="Mengambil data makanan">
        {error && <div className="alert alert-danger">{error}</div>}
        <div>
          <Container>
            <Row>
              {dishes.map((dish) => (
                <FoodCard
                  name={dish.name}
                  description={dish.description}
                  price={getPrice(dish)}
                  image={dish.image}
                  key={dish._id}
                >
                  <ChangeQuantity
                    handleChangeCart={handleChangeCart}
                    quantity={cartHashMap[dish._id] || 0}
                    disabled={loadingCartChanging}
                    dish={dish}
                  />
                </FoodCard>
              ))}
            </Row>
          </Container>
        </div>
      </WithLoading>
      <CartFloating cartItems={cartItems} restaurantId={restaurantId} />
    </main>
  );
}