//@ts-ignore-file
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { Header } from '../components/Header';
import { useCallback, useEffect, useState } from 'react';
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
  const [floral, setFloral] = useState<Floral[]>([]);
  const flowerCollectionRef = collection(db, "floral")

  const getFlowers = useCallback( async () => {
    const data = await getDocs(flowerCollectionRef)
    setFloral(data.docs.map(doc => ({...doc.data(), id: doc.id}) as Floral))
  } , []);

  useEffect(() => {
    getFlowers()
  }, [getFlowers])

 
  return (
    <>
      <Header/>
      {!floral.length ? (
    <Progress />
      ): (
        <main className='container'>
          <legend> <ErrorOutlineOutlinedIcon color="info" fontSize="large"/> <strong>Selecione</strong> os florais na <strong>tabela</strong> para <strong>criar uma nova receita</strong></legend>
         
          <TableFloral data={floral} />
        </main>
      )}
    </>
  )
}