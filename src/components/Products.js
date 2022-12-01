import React from 'react'
import CardProduct from './CardProduct'


const Products = ({ products, individualProduct }) => {
  return products.map((product, id) => (<CardProduct key={id}
    cardProduct={product}
    individualProduct={individualProduct} />
  ))
}

export default Products
