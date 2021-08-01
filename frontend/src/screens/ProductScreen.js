import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
// import products from '../products'

const ProductScreen = (props) => {
  //// we're gonna use useState instead, and fetch product from backend rather than getting it from
  //// frontend only where we havt to store products.js file.
  // const product = products.find((p) => p._id === props.match.params.id)

  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${props.match.params.id}`)

      setProduct(data);
    }
    fetchProduct();
  }, [props.match.params.id])

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} count={product.numReviews} color={'yellow'} />
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Price: ${product.price}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <p><strong>Product Description: </strong>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button className='btn-block' type='button' disabled={!product.countInStock > 0}>Add To Cart</Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {/* <Card></Card> */}
    </div>
  )
}

export default ProductScreen
