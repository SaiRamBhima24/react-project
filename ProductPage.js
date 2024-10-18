import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <img src={product.image} alt={product.title} width="200" />
      <p>Price: ${product.price}</p>
    </div>
  );
}

export default ProductPage;
