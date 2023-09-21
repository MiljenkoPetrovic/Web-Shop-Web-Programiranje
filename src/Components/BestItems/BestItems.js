import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { StoreItem } from '../StorePage/StoreItem';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'; // Import Firestore functions

export default function BestItems() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const firestore = getFirestore(); // Get a reference to Firestore
        const q = query(collection(firestore, 'Products'), orderBy('sold', 'desc'), limit(2)); // Change 'Products' to your Firestore collection name
        const querySnapshot = await getDocs(q);

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
