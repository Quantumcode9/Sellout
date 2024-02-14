import React, { useState } from 'react';
import axios from 'axios';

const SearchProducts = () => {
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.get(`/search/${keyword}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to search products:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search for products"
                />
                <button type="submit">Search</button>
            </form>

            <div>
                {products.map((product, index) => (
                    <div key={index}>
                        <h4>{product.name}</h4>
                        <p>{product.salePrice}</p>
                        <img src={product.image} alt={product.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchProducts;
