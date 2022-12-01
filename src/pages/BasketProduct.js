import React from 'react'
import BasketCard from './BasketCard'

const BasketProduct = ({ products, plusCard, minusCard, delCard }) => {
  return products.map((product, id) => (<BasketCard key={id}
    cardProduct={product} plusCard={plusCard} delCard={delCard}
    minusCard={minusCard} />))
}

export default BasketProduct
