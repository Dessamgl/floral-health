//@ts-ignore-file
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom'

import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import TableFloral from '../components/TableFloral';
import '../styles/floral.scss';
import Progress from '../components/Progress';

export interface Floral {
  id: string;
  name: string;
  description: string;
}

export function Floral() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [floral, setFloral] = useState<Floral[]>([]);

  const flowerCollectionRef = collection(db, "floral")

  useEffect(() => {
    const getFlowers = async () => {
      const data = await getDocs(flowerCollectionRef)
      setFloral(data.docs.map(doc => ({...doc.data(), id: doc.id}) as Floral))
    }

    getFlowers();
  }, [])

 
  return (
    <>
      <Header/>
      {!floral.length ? (
    <Progress />
      ): (
        <main className='container'>
          <TableFloral data={floral} />
        </main>
      )}
    </>
  )
}