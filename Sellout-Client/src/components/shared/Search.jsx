import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../api/product';


const Search = () => {
    const [keyword, setKeyword] = useState(''); 
    const [products, setProducts] = useState([]);
  
    const handleSearch = (event) => { 
      event.preventDefault();
      searchProducts(keyword)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('The error was:', error);
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

export default Search;
