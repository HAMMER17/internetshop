import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot, query, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

import BasketProduct from './BasketProduct';

const Basket = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setUser(docSnap.data().Name)

        } else {
          setUser(null)
          console.log("No such document!");
        }
      }
    });
  }, [])
  const [getProd, setGetProd] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "Cart " + user.uid))
        onSnapshot(q, (querySnapshot) => {

          const res = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          setGetProd(res);
          // console.log("Current Product: ", res);
        });
      }
    });
  }, [])
  const plusCard = (product) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const addProd = doc(db, "Cart " + user.uid, product.id);
        await updateDoc(addProd, {
          current: product.current + 1,
          total: product.total + product.price,
          url: product.url,
          price: product.price,
          discription: product.discription,
          title: product.title,
        });
      }
    })
  }
  const minusCard = (product) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const addProd = doc(db, "Cart " + user.uid, product.id);
        await updateDoc(addProd, {
          current: product.current - 1,
          total: product.total - product.price,
          url: product.url,
          price: product.price,
          discription: product.discription,
          title: product.title,
        });
      }
    })
  }
  const delCard = (product) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await deleteDoc(doc(db, "Cart " + user.uid, product.id));
        console.log('delete')
      }
    })
  }
  const cur = getProd.map(elem => {
    return elem.current
  })
  const count = ((acc, num) => acc + num)
  const current = cur.reduce(count, 0)
  const total = getProd.map(item => item.total)
  const sum = total.reduce((acc, num) => acc + num, 0)
  console.log(getProd.length)
  return (
    <>
      <Navbar user={user} current={current} sum={sum} />
      <div className="card">
        <BasketProduct products={getProd} delCard={delCard}
          plusCard={plusCard} minusCard={minusCard} />
      </div>
    </>
  )
}

export default Basket
