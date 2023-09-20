import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../Components/StorePage/StoreItem";
import { useFirestoreCollectionData } from "reactfire";
import { db } from '../firebaseConfig'; // Import the db variable

export function Store() {
  const { data: storeItems, status } = useFirestoreCollectionData(
    db.collection("Products"),
    {
      idField: "id",
    }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!storeItems || storeItems.length === 0) {
    return <div>No items found.</div>;
  }

  return (
    <>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
