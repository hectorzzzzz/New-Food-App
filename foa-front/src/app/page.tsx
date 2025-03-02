//file for running app

'use client';
import CardResto from '@/components/CardResto';
import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import { getRestaurants } from '@/services/restaurants';
import { Restaurant } from '@/types/restaurant';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface State {
  restaurants: Restaurant[];
  loading: boolean;
}

const InitState: State = {
  restaurants: [],
  loading: true,
};

export default function Home() {
  const [{ restaurants, loading }, updateState] = useFormReducer(InitState);

  async function load() {
    updateState({ loading: true });
    try {
      const { data } = await getRestaurants();
      updateState({ restaurants: data.items });
    } finally {
      updateState({ loading: false });
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main>
      <WithLoading
        loading={loading}
        message='Mengambil data restaurant...'>
        <div>
          <h1 className='text-center m-3'>Pilih Restoran &#128523; &#127860;</h1>
        </div>
        <Container>
          <Row>
            {restaurants.map((res, index) => (
              <Col
                xs={12}
                md={6}
                xl={3}
                key={index}>
                <CardResto
                  title={res.name}
                  description={res.description}
                  image={res.image}
                  redirect={`/restaurant/${res._id}`}>
                  <Row>
                    <Col className='d-flex justify-content-end'>
                      <Link href={`/restaurant/${res._id}`}>
                        <button
                          className={"bg-green-500 hover:bg-green-600 text-white w-20 h-9 rounded-md"}>Kunjungi
                        </button>
                      </Link>
                    </Col>
                  </Row>
                </CardResto>
              </Col>
            ))}
          </Row>
        </Container>
      </WithLoading>
    </main>
  );
}
