import React from 'react'
import '../style/card.css'

const CardProduct = ({ cardProduct, individualProduct }) => {
  const addProduct = () => {
    individualProduct(cardProduct)
  }

  return (

    <div className="cardGrid" key={cardProduct.id}>
      <h1>{cardProduct.title}</h1>
      <h3>{cardProduct.discription}</h3>
      <img style={{ width: 150, heigth: 200, objectFit: 'cover' }} src={cardProduct.url} alt="url" />
      <h4>{cardProduct.price}<span> p</span></h4>
      <button className='cardBtn' onClick={addProduct}>added</button>
    </div>

  )
}

export default CardProduct
