import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../api/product';
import { Link } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
// import { response } from 'express';


const Search = () => {
    const [keyword, setKeyword] = useState(''); 
    const [products, setProducts] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        searchProducts(keyword)
        .then((response) => {
            console.log('All this crap came through', response.data.products);
            setProducts(response.data.products); 
        })
        .catch((error) => {
            console.error('Failed to search products:', error);
        });
    };


    



    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search"
                />
                <button type="submit">Search</button>
            </form>

            <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {products.map((product, index) => (
                    <Card key={index}>
                    <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
                            {product.name}
                    </Card.Header>
                        <Card.Text>${product.salePrice}</Card.Text>
                        <Card.Img src={product.image} alt={product.name} />
                        <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
                        <Link to={`/products/${product.id}`}>
                            <Button variant="light"
                            >View</Button>
                        </Link>
                    </Card.Footer>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

export default Search;
