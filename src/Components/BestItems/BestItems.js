import Container from 'react-bootstrap/Container';
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./BestItems.css";


export default function BestItems() {
    return (
    <Container>
        <div className='Items'>
        <Row >
            <Col>
                <img
                    className="item"
                    src='https://advanti.com/images/category/gpu.png'
                    width={500}
                    height={500}
                />
            </Col>
                <img
                    className="item"
                    src='https://advanti.com/images/category/gpu.png'
                    width={500}
                    height={500}
                />
        </Row>
        </div>
    </Container>
    )
}