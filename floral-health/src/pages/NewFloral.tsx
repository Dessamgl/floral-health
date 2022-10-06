import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { db } from '../services/firebase';
import '../styles/new-floral.scss';

import { Header } from '../components/Header';
import { IToast, Toast } from '../components/Toast';
import { Button, Tooltip } from '@mui/material';
import { blue, whiteA } from '@radix-ui/colors';

interface FloralParams {
  id: string;
}

interface StateFloralProps {
  name: string;
  description: string;
}

export function NewFloral() {
  const history = useHistory()
  const params = useParams<FloralParams>();
  const location = useLocation();
  const floral = location.state as StateFloralProps;
  const floralId = params.id;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [isDisable, setIsDisable] = useState(false)
  const [toast, setToast] = useState<IToast>({
  altText: "",
  color: "green",
  open: openToast,
  textButton: "",
  title: "",
  onClickButtonToast: () => {}   
  });

  const flowerCollectionRef = collection(db, "floral")

  const handleCreateFlower = async () => {
    try {
      await addDoc(flowerCollectionRef, {
        name,
        description,
      })

      setToast({
        altText: "Essência criada, direcionamento para a tela inicial",
        color: "green",
        open: true,
        title: "Floral adicionado com sucesso.",
        textButton: "Ir para a tela inicial",
        onClickButtonToast: () => {history.push('/floral')}
      })
      setName("")
      setDescription("")

    } catch (error) {
      setToast({
        altText: "Essência não foi criada, manter na tela para uma nova tentativa",
        color: "red",
        open: true,
        title: "Não foi possível adicionar o Floral.",
        textButton: "Ok, tentar novamente",
        onClickButtonToast: () => {setOpenToast(false)},
      })
      setName("")
      setDescription("")
    }
  }

  const handleEditFlower = async (newFloral: any) => {
    try {
      const flower = doc(db, "floral", floralId)
      await updateDoc(flower, newFloral)
      
      setToast({
        altText: "Essência atualizada, direcionamento para a tela inicial",
        color: "green",
        open: true,
        title: "Floral atualizado com sucesso.",
        textButton: "Ir para a tela inicial",
        onClickButtonToast: () => {history.push('/floral')}
      })
   
      
    } catch (error) {
        setToast({
          altText: "Essência não foi atualizadda, manter na tela para uma nova tentativa",
          color: "red",
          open: true,
          title: "Não foi possível atualizar o Floral.",
          textButton: "Ok, tentar novamente",
          onClickButtonToast: () => {setOpenToast(false)},
      })
    }
  }

  const checkDataFloral = useCallback(() => {
    if (floralId) {
      if (floral?.name) {
        setName(floral.name);
      }
      if (floral?.description) {
        setDescription(floral.description);
      }
    }
  }, [floral, floralId]);

  useEffect(() => {
    checkDataFloral();
  }, [checkDataFloral]);

  const saveDataFloral = async (event: FormEvent) => {
    event.preventDefault();

    if(floralId) {
      await handleEditFlower({
        name,
        description
      })
    } else {
      await handleCreateFlower()
    }
  }

const disabledButtonSave = (
  !name || !description
)

  return (
    <>
      <Header/>
      <main className="container">
    <form id="form" onSubmit={saveDataFloral}>
    <fieldset className="fieldset-wrapper">
        <legend>{floralId ? "Editar Essência Floral" : "Adicionar Essência Floral"}</legend>

        <div className="input-wrapper">
          <label>Nome da essência:</label>
          <input
          disabled={isDisable} 
          type="text" 
          placeholder="nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        </div>

        <div className="input-wrapper">
          <label>Descrição da essência</label>
          <input
          disabled={isDisable} 
          type="text" 
          placeholder="descrição"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
      </fieldset>
        </form>
        <footer>
        <Tooltip title={floralId ? "Editar Floral" : "Adicionar Floral"}>
        <Button
        style={{ background: blue.blue12, color: whiteA.whiteA12}}
          className="button"
          type="submit" 
          disabled={disabledButtonSave || isDisable}
          form="form"
        >
         {floralId ? "Editar Floral" : "Adicionar Floral"}
        </Button>
        </Tooltip>
        </footer>
  </main>
  <Toast 
    textButton={toast.textButton}
    open={toast.open} 
    onClickButtonToast={toast.onClickButtonToast} 
    title={toast.title}
    altText={toast.altText} 
    color={toast.color} 
    />
    </>
  )
}
