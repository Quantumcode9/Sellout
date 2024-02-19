import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../api/cart';
import {Card, Button} from 'react-bootstrap';
import { handleDeleteFromCart } from '../../api/cart';
import './Cart.css';

const CartPage = ({ user }) => {
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      getCartItems(user)
        .then(res => setCartItems(res.data.cart))
        .catch(err => console.error(err));
    }, []);
  
    const handleDelete = (tvId) => {
      handleDeleteFromCart(tvId, user)
        .then(() => {
          setCartItems(cartItems.filter(item => item._id !== tvId));
        })
        .catch(err => {
     

        });
    };
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Your Cart</h1>
        {cartItems.map(item => (
          <Card key={item._id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                Price: {item.price}
              </Card.Text>
              <Button variant="dark">Go to item</Button>
              {/* Delete From Cart */}
              <Button
                className='m-2'
                variant='dark'
                onClick={() => handleDelete(item._id)}
              >
                Delete From Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
  
  export default CartPage;