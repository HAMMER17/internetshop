import React from 'react'
import '../style/card.css'

const CardProduct = ({ cardProduct, individualProduct, getProducts }) => {

  const addProduct = () => {
    individualProduct(cardProduct)
  }
  const getProduct = () => {
    getProducts(cardProduct)
  }
  return (
    <>

      <div className="cardGrid" key={cardProduct.id} onClick={getProduct}>
        <h1>{cardProduct.title}</h1>
        <h3>{cardProduct.discription}</h3>
        <img style={{ width: 150, heigth: 200, objectFit: 'cover' }} src={cardProduct.url} alt="url" />
        <h4>{cardProduct.price}<span> p </span>
          <button className='cardBtn' onClick={addProduct}>added</button>
        </h4>
      </div>
    </>
  )
}

export default CardProduct
