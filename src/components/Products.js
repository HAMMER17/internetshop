import React from 'react'
import CardProduct from './CardProduct'


const Products = ({ products, individualProduct, getProducts }) => {
  return products.map((product, id) => (<CardProduct key={id}
    cardProduct={product} getProducts={getProducts}
    individualProduct={individualProduct} />
  ))
}

export default Products
