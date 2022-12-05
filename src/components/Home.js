import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Products from './Products';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs, addDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null)
  const [prod, setProd] = useState([])
  const [sms, setSms] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setUser(docSnap.data().Name)
        } else {
          setUser(null)
        }
      }
    });
  }, [])
  useEffect(() => {
    async function getProducts() {
      let getArray = []
      const querySnapshot = await getDocs(collection(db, "Products"));
      querySnapshot.forEach((doc) => {
        getArray.push(doc.data())
      });
      setProd(getArray)
    }
    getProducts()
  }, [])
  const addToCard = (product) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login')
      } else
        await addDoc(collection(db, "Cart " + user.uid), {
          current: 1,
          total: product.price,
          url: product.url,
          price: product.price,
          discription: product.discription,
          title: product.title,
        }).then(() => {
          setSms('Product added... ')
          setTimeout(() => {
            setSms('')
          }, 1000)
        })
    })
  }

  const [getProd, setGetProd] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "Cart " + user.uid))
        onSnapshot(q, (querySnapshot) => {
          const res = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          setGetProd(res);
        });
      }
    });
  }, [])
  const current = getProd.map(elem => elem.price)
  const sum = current.reduce((acc, num) => acc + num, 0)
  const [data, setData] = useState('')
  const [el, setEl] = useState(false)
  const getProduct = (product) => {
    setEl('getProduct')
    setData(product)
    console.log(product)
  }
  const click = () => {
    setEl('delProduct')
  }
  return (
    <div>
      <Navbar user={user} current={getProd.length} sum={sum} />
      <h3 style={{ textAlign: 'center', color: 'white', width: '100%', background: 'green' }}>{sms}</h3>
      <div className={el}>
        <div className="dataProduct">
          <h2 className='dataH2'>{data.title}</h2>
          <img style={{ width: 250 }} src={data.url} alt="1" />
          <h3>{data.price}<span> p</span></h3>
          <p style={{ margin: 10 }}>{data.discription}</p>
          <button className='dataBtn' onClick={click}>delete</button>
        </div>
      </div>
      <div className="card">
        <Products products={prod} individualProduct={addToCard} getProducts={getProduct} />
      </div>

    </div>
  )
}

export default Home;
