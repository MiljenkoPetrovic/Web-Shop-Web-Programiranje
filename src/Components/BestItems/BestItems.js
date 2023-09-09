import Container from 'react-bootstrap/Container';
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StoreItem } from "src\Components\StorePage\StoreItem.tsx"
import storeItems from "src\Components\data\items.json"


export default function BestItems() {
    return (       
    <Row md={2} xs={1} lg={2} className="g-3">
        {storeItems.map(item => (
        <Col key={item.id}>
            <StoreItem {...item} />
            </Col>
        ))}
    </Row>
            
    )
}