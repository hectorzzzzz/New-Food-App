//file to create a cart

'use client';

import CartFloating from '@/components/CartFloating';
import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import { getCartItems, getDishes, setCartItem } from '@/services/restaurants';
import { CartItem, Dish } from '@/types/restaurant';
import React, { use, useEffect, useMemo, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import ChangeQuantity from '../containers/changeQuantity';
import FoodCard from '../containers/foodCard';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

interface State {
  loading: boolean;
  loadingCartChanging: boolean;
  dishes: Dish[];
  cartItems: CartItem[];
  page: number;
}

const InitState: State = {
  loading: true,
  loadingCartChanging: false,
  dishes: [],
  cartItems: [],
  page: 1,
};

export default function RestaurantDetail({ params }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [
    { dishes, loading, cartItems, page, loadingCartChanging },
    updateState,
  ] = useFormReducer(InitState);
  const { id: restaurantId } = use<{ id: string }>(params);

  const cartHashMap = useMemo(() => {
    const hash: Record<string, number> = {};
    cartItems.forEach((cart) => {
      if (cart.dish._id) hash[cart.dish._id] = cart.quantity;
    });

    return hash;
  }, [cartItems]);

  function getPrice(dish: Dish) {
    if (dish.discountedPrice) {
      return (
        <h2 className='text-primary d-flex justify-content-end'>
          ${dish.discountedPrice}
          <small className='text-decoration-line-through text-danger'>
            ${dish.price}
          </small>
        </h2>
      );
    }

    return (
      <h2 className='text-primary d-flex justify-content-end'>${dish.price}</h2>
    );
  }

  async function loadMenu() {
    updateState({ loading: true });
    try {
      const { data } = await getDishes(restaurantId, page);
      updateState({ dishes: data.items });

      await loadCart();
    } finally {
      updateState({ loading: false });
    }
  }

  async function loadCart() {
    updateState({ loading: true });
    try {
      const { data } = await getCartItems(restaurantId);
      updateState({ cartItems: data.carts });
    } finally {
      updateState({ loading: false });
    }
  }

  async function handleChangeCart(dishId: string, quantity: number) {
    try {
      updateState({ loadingCartChanging: true });
      const { data } = await setCartItem(restaurantId, dishId, quantity);
      updateState({ cartItems: data.carts });
    } finally {
      updateState({ loadingCartChanging: false });
    }
  }

  useEffect(() => {
    loadMenu();
  }, []);

  useEffect(() => {
    console.log(containerRef);
  }, [containerRef]);

  // TODO: Check
  function infiniteScroll() {
    console.log('HERE');
  }
  useScrollToBottom(containerRef, infiniteScroll, 100);

  return (
    <main ref={containerRef}>
      <WithLoading
        loading={loading}
        message='Mengambil data makanan'>
        <div>
          <Container>
            <Row>
              {dishes.map((dish) => (
                <FoodCard
                  name={dish.name}
                  description={dish.description}
                  price={getPrice(dish)}
                  image={dish.image}
                  key={dish._id}>
                  <ChangeQuantity
                    handleChangeCart={handleChangeCart}
                    quantity={cartHashMap[dish._id]}
                    disabled={loadingCartChanging}
                    dish={dish}
                  />
                </FoodCard>
              ))}
            </Row>
          </Container>
        </div>
      </WithLoading>
      <CartFloating
        cartItems={cartItems}
        restaurantId={restaurantId}
      />
    </main>
  );
}