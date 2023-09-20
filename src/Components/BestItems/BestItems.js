import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { db } from '../../firebaseConfig';
import { StoreItem } from '../StorePage/StoreItem'; 

export default function BestItems() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const productsRef = db.collection('Products');
        const querySnapshot = await productsRef.orderBy('sold', 'desc').limit(2).get();
        const topProductsData = querySnapshot.docs.map((doc) => doc.data());
        setTopProducts(topProductsData);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <Row md={2} xs={1} lg={2} className="g-3">
      {topProducts.map((item) => (
        <Col key={item.id}>
          <StoreItem {...item} />
        </Col>
      ))}
    </Row>
  );
}
