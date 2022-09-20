//@ts-ignore-file
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { Header } from '../components/Header';
import { db } from '../services/firebase';
import { IToast, Toast } from '../components/Toast';

import '../styles/new-floral.scss';
import { printElement } from '../utils/printElement';
import { Button, Tooltip } from '@mui/material';
import { whiteA, blue } from '@radix-ui/colors';

export interface Recipe {
  id: string;
  caution?: string;
  city?: string;
  clientName?: string;
  date?: string;
  modOfUse?: string;
  percent?: number;
  preservative?: string;
  floralName?: string[];
  dataFloralSelected: string[];
}

interface RecipeParams {
  id: string;
}

export function NewRecipe() {
  const history = useHistory();
  const params = useParams<RecipeParams>();
  const location = useLocation();
  const recipe = location.state as Recipe;
  const recipeId = params.id;

  const [caution, setCaution] = useState("");
  const [city, setCity] = useState("");
  const [clientName, setClientName] = useState("")
  const [modeOfUse, setModeOfUse] = useState("");
  const [percent, setPercent] = useState<number>();
  const [preservative, setPreservative] = useState<string>();
  const [date, setDate] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [floralName, setFloralName] = useState<string[]>([])
  const [toast, setToast] = useState<IToast>({
    altText: "",
    color: "green",
    open: openToast,
    textButton: "",
    title: "",
    onClickButtonToast: () => {}   
    });
  
  useEffect(() => {
    if(recipe.dataFloralSelected) {
      setFloralName(recipe.dataFloralSelected)
    }
  }, [])

  console.log(floralName)

  const recipeCollectionRef = collection(db, "recipe")


  function handleClickPrintOut() {
    printElement("#table-bordero");
  }


  const handleCreateRecipe = async () => {
    try {
      await addDoc(recipeCollectionRef, {
        caution,
        city,
        clientName,
        modeOfUse,
        percent,
        preservative,
        date
      })

      setToast({
        altText: "Receita criada, direcionamento para o histórico",
        color: "green",
        open: true,
        title: "Receita criada com sucesso.",
        textButton: "Ir para a tela de histórico",
        onClickButtonToast: () => {history.push('/hisotrico')}
      })
      
    } catch (error) {
      setToast({
        altText: "A receita não foi criada, manter na tela para uma nova tentativa",
        color: "red",
        open: true,
        title: "Não foi possível adicionar a Receita.",
        textButton: "Ok, tentar novamente",
        onClickButtonToast: () => {setOpenToast(false)},
      })
    }
  }

  const handleEditRecipe= async (newRecipe: any) => {
    try {
      const recipe = doc(db, "recipe", recipeId)
      await updateDoc(recipe, newRecipe)
      
      setToast({
        altText: "Receita atualizada, direcionamento para a tela histórico",
        color: "green",
        open: true,
        title: "Receita atualizada com sucesso.",
        textButton: "Ir para a tela histórico",
        onClickButtonToast: () => {history.push('/historico')}
      })
      
    } catch (error) {
        setToast({
          altText: "A Receita não foi atualizadda, manter na tela para uma nova tentativa",
          color: "red",
          open: true,
          title: "Não foi possível atualizar a receita.",
          textButton: "Ok, tentar novamente",
          onClickButtonToast: () => {setOpenToast(false)},
      })
    }
  }

  const checkDataRecipe = useCallback(() => {
    if (recipeId) {
      if (recipe?.caution) {
        setCaution(recipe.caution);
      }
      if (recipe?.clientName) {
        setClientName(recipe.clientName);
      }
      if (recipe?.modOfUse) {
        setModeOfUse(recipe.modOfUse);
      }
      if (recipe?.percent) {
        setPercent(recipe.percent);
      }
      if (recipe?.preservative) {
        setPreservative(recipe.preservative);
      }
      if (recipe?.date) {
        setDate(recipe.date);
      }
      if (recipe?.city) {
        setCity(recipe.city);
      }
      if (recipe?.floralName) {
        setFloralName(recipe.floralName);
      }
    }
  }, [recipe, recipeId]);

  useEffect(() => {
    checkDataRecipe();
  }, [checkDataRecipe]);

  const saveDataRecipe = () => {
    if(recipeId) {
      handleEditRecipe({
        caution,
        city,
        clientName,
        modeOfUse,
        percent,
        preservative,
        date
      })
    } else {
      handleCreateRecipe()
    }
  }

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPreservative(value);
  };

  return (
    <>
      <Header/>
           <main className="container" id="table-bordero">
    <form id="form">
    <fieldset className="fieldset-wrapper">
        <legend>Nova Receita</legend>

        <div className="input-wrapper">
          <label>Cliente:</label>
          <input 
          type="text" 
          placeholder="nome cliente" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)}
        />
        </div>

        <div className="input-wrapper">
          <label>Nome das essências:</label>
          <textarea 
          placeholder="essências"
          value={floralName}
          disabled
        />
        </div>

        <div className="input-wrapper">
          <label>Porcentagem:</label>
          <input 
          type="text" 
          placeholder="porcentagem"
          value={percent} 
          onChange={(e) => setPercent(Number(e.target.value))}
        />
        </div>

        <div className="input-wrapper">
          <label htmlFor='conservantes'>Conservantes:</label>
          <select
          id="conservantes" 
          placeholder="conservantes"
          value={preservative} 
          onChange={selectChange}
        >
          <option value="glicerina">Glicerina</option>
          <option value="vinagre">Vinagre de maça</option>
          <option value="conhaque">Conhaque</option>
        </select>
        </div>

        <div className="input-wrapper">
          <label>Como tomar:</label>
          <textarea 
          placeholder="modo de uso"
          value={modeOfUse} 
          onChange={(e) => setModeOfUse(e.target.value)}
        />
        </div>

        <div className="input-wrapper">
          <label>Cuidados:</label>
          <textarea 
          placeholder="descrição dos cuidados"
          value={caution} 
          onChange={(e) => setCaution(e.target.value)}
        />
        </div>


        <div className="input-wrapper">
          <label>Cidade:</label>
          <input 
          type="text" 
          placeholder="cidade"
          value={city} 
          onChange={(e) => setCity(e.target.value)}
        />
        </div>

        <div className="input-wrapper">
          <label>Data:</label>
          <input 
          type="date" 
          placeholder="data da receita"
          value={date} 
          onChange={(e) => setDate(e.target.value)}
        />
        </div>
      </fieldset>
      
        </form>
        <footer>
        <Tooltip title="Criar receita">
        <Button
        style={{ background: blue.blue12, color: whiteA.whiteA12}}
          className="button"
          type="submit" 
          onClick={saveDataRecipe}
       
        >
             Criar receita
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