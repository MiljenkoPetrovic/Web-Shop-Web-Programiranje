import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../Components/StorePage/StoreItem"
import storeItems from "../Components/data/items.json"



export function Store() {
  return <>
  <Row md={2} xs={1} lg={3} className="g-3">
    {storeItems.map(item => (
      <Col key={item.id}>
        <StoreItem {...item} />
        </Col>
    ))}
  </Row>
  </>
}