import React from 'react'
import '../style/basket.css'

const BasketCard = ({ cardProduct, plusCard, minusCard, delCard }) => {
  const plusBasket = () => {
    plusCard(cardProduct)
  }
  const minusBasket = () => {
    minusCard(cardProduct)
  }
  const deleteCard = () => {
    delCard(cardProduct)
  }
  return (
    <div className="cardGrid" key={cardProduct.id}>
      <h1>{cardProduct.title}</h1>
      <h3>{cardProduct.discription}</h3>
      <img style={{ width: 150, heigth: 200, objectFit: 'cover' }} src={cardProduct.url} alt="url" />
      <h4>{cardProduct.price}</h4>
      <button className='cardBtn delete' onClick={deleteCard}>delete</button>

      <div className='basketForm'>
        <button className='basketBtn plus' onClick={plusBasket}>+</button>
        <span>{cardProduct.current}</span>
        <button className='basketBtn minus' onClick={minusBasket}>-</button>
      </div>
      <p>{cardProduct.total}</p>
    </div>
  )
}

export default BasketCard
