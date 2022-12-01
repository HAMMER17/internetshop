import React, { useState } from 'react'
import { db, storage } from '../firebase'
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";


const AddProduct = () => {
  const [title, setTitle] = useState('')
  const [discription, setDiscription] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)
  const [sms, setSms] = useState('')

  const createProduct = (e) => {
    e.preventDefault()

    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        addDoc(collection(db, "Products"), {
          title,
          discription,
          price: Number(price),
          url: downloadURL
        }).then(() => {
          setSms('Product added. Done')
          setDiscription('')
          setPrice('')
          setTitle('')
          setTimeout(() => {
            setSms('')
            setFile(null)
          }, 2000)
        })
      });
    });
    console.log(title, discription, price)
    console.log(uploadTask)
  }
  return (
    <div className='register' >
      <h1 className='registerH1'>{sms}</h1>
      <form className='form' onSubmit={createProduct}>
        <h1>Products</h1>
        <label htmlFor="title">Title</label>
        <input className='input' type="text" value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="desc">Discription</label>
        <input className='input' type="text" value={discription}
          onChange={(e) => setDiscription(e.target.value)} />
        <label htmlFor="price">Price</label>
        <input className='input' type="text" value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <label htmlFor="file">Password</label>
        <input type="file" id='file'
          onChange={(e) => setFile(e.target.files[0])} />
        <button className='inputBtn'>add product</button>

      </form>
    </div>
  )
}

export default AddProduct
