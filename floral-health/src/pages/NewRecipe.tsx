//@ts-ignore-file
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { Header } from '../components/Header';
import { db } from '../services/firebase';
import { IToast, Toast } from '../components/Toast';

import '../styles/new-floral.scss';
import { Button, Tooltip } from '@mui/material';
import { whiteA, blue } from '@radix-ui/colors';
import { useAuth } from '../hooks/useAuth';

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
  const { getFloralNames } = useAuth()

  const [caution, setCaution] = useState("");
  const [city, setCity] = useState("");
  const [clientName, setClientName] = useState("")
  const [modeOfUse, setModeOfUse] = useState("");
  const [percent, setPercent] = useState<number>();
  const [preservative, setPreservative] = useState<string>();
  const [date, setDate] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [floralName, setFloralName] = useState<string[]>([])
  const [isDisable, setIsDisable] = useState(false)
  const [toast, setToast] = useState<IToast>({
    altText: "",
    color: "green",
    open: openToast,
    textButton: "",
    title: "",
    onClickButtonToast: () => {}   
    });
  
  useEffect(() => {
    if(recipe?.dataFloralSelected) {
      setFloralName(recipe.dataFloralSelected)
      getFloralNames(recipe.dataFloralSelected)
    }
  }, [recipe.dataFloralSelected, getFloralNames])

  console.log(recipe?.dataFloralSelected)

  const recipeCollectionRef = collection(db, "recipe")


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
        onClickButtonToast: () => {history.push('/historico')}
      })
      setIsDisable(true)
      
    } catch (error) {
      setToast({
        altText: "A receita não foi criada, manter na tela para uma nova tentativa",
        color: "red",
        open: true,
        title: "Não foi possível adicionar a Receita.",
        textButton: "Ok, tentar novamente",
        onClickButtonToast: () => {setOpenToast(false)},
      })
      console.log(error);
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

      setIsDisable(true)
      
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
      if (recipe?.dataFloralSelected) {
        setFloralName(recipe?.dataFloralSelected);
      }
    }
  }, [recipe, recipeId]);

  useEffect(() => {
    checkDataRecipe();
  }, [checkDataRecipe]);

  const saveDataRecipe = async (event: FormEvent) => {
    event.preventDefault();

    if(recipeId) {
      await handleEditRecipe({
        caution,
        city,
        clientName,
        modeOfUse,
        percent,
        preservative,
        date
      })
    } else {
      await handleCreateRecipe()
    }
  }

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPreservative(value);
  };

   const disabledButtonSave = (
    !clientName || !city || !modeOfUse || !percent || preservative === ""  || !date
  )

  return (
    <>
      <Header/>
           <main className="container" id="table-bordero">
    <form id="form" onSubmit={saveDataRecipe}>
    <fieldset className="fieldset-wrapper">
    <legend>{recipeId ? "Editar Receita" : "Nova Receita"}</legend>

        <div className="input-wrapper">
          <label>Paciente: <span>(somente letras)</span></label>
          <input
          disabled={isDisable}  
          pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
          type="text" 
          placeholder="nome paciente" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)}
          required
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
          <label>Porcentagem: <span>(somente números)</span></label>
          <input
          disabled={isDisable}  
          type="number" 
          placeholder="exemplo: 20"
          value={percent} 
          maxLength={2}
          required
          onChange={(e) => setPercent(Number(e.target.value))}
        />
        </div>

        <div className="input-wrapper">
          <label htmlFor='conservantes'>Conservantes:</label>
          <select
          disabled={isDisable} 
          id="conservantes" 
          placeholder="Selecione uma opção"
          value={preservative} 
          required
          onChange={selectChange}
        >
            <option value="">Selecione uma opção</option>
          <option value="glicerina">Glicerina</option>
          <option value="vinagre">Vinagre de maça</option>
          <option value="conhaque">Conhaque</option>
        </select>
        </div>

        <div className="input-wrapper">
          <label>Como tomar: </label>
          <textarea
          disabled={isDisable}  
          placeholder="modo de uso"
          maxLength={150}
          value={modeOfUse} 
          required
          onChange={(e) => setModeOfUse(e.target.value)}
        />
        </div>

        <div className="input-wrapper">
          <label>Cuidados: </label>
          <textarea
          disabled={isDisable}  
          placeholder="descrição dos cuidados"
          value={caution} 
          onChange={(e) => setCaution(e.target.value)}
        />
        </div>


        <div className="input-wrapper">
          <label>Cidade: <span>(somente letras)</span></label>
          <input
          disabled={isDisable}  
          type="text" 
          placeholder="cidade"
          pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
          value={city} 
          required
          onChange={(e) => setCity(e.target.value)}
        />
        </div>

        <div className="input-wrapper">
          <label>Data:</label>
          <input
          disabled={isDisable}  
          type="date" 
          placeholder="data da receita"
          value={date} 
          required
          onChange={(e) => setDate(e.target.value)}
        />
        </div>
      </fieldset>
      
        </form>
        <footer>
        <Tooltip title={recipeId ? "Editar Receita" : "Adicionar Receita"}>
        <Button
        style={{ background: blue.blue12, color: whiteA.whiteA12}}
          className="button"
          type="submit" 
          disabled={disabledButtonSave || isDisable}
          form="form"
        >
           {recipeId ? "Editar Receita" : "Adicionar Receita"}
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