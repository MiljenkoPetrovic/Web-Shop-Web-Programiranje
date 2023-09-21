import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { StoreItem } from '../Components/StorePage/StoreItem'; // Import the StoreItem component
import { getFirestore, collection, query, getDocs } from 'firebase/firestore'; // Import Firestore functions

export default function Store() {
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        const firestore = getFirestore(); // Get a reference to Firestore
        const q = query(collection(firestore, 'Products')); // Change 'Products' to your Firestore collection name
        const querySnapshot = await getDocs(q);

        const storeItemsData = querySnapshot.docs.map((doc) => doc.data());

        // Sort the items by their IDs (assuming your IDs are numbers)
        storeItemsData.sort((a, b) => a.id - b.id);

        setStoreItems(storeItemsData);
      } catch (error) {
        console.error('Error fetching store items:', error);
      }
    };

    fetchStoreItems();
  }, []);

  return (
    <Row md={2} xs={1} lg={3} className="g-3">
      {storeItems.map((item) => (
        <Col key={item.id}>
          <StoreItem {...item} /> 
        </Col>
      ))}
    </Row>
  );
}
