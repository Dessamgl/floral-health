//@ts-ignore-file
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { Header } from '../components/Header';
import { Fragment, useEffect, useState } from 'react';
import { db } from '../services/firebase';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, documentId } from 'firebase/firestore';
import TableFloral from '../components/TableFloral';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import '../styles/new-floral.scss';
import { CardFloral } from '../components/Card';
import { Box, IconButton, Tooltip } from '@mui/material';
import { style } from '@mui/system';
import { yellow } from '@radix-ui/colors';
import Progress from '../components/Progress';

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
}

export function Historic() {
  const history = useHistory();

  const { user, signInWithGoogle } = useAuth()
  const [recipes, seRecipes] = useState<Recipe[]>([]);

  const recipeCollectionRef = collection(db, "recipe")

  useEffect(() => {
    const getRecipe = async () => {
      const data = await getDocs(recipeCollectionRef)
      seRecipes(data.docs.map(doc => ({...doc.data(), id: doc.id} as Recipe)))
    }

    getRecipe();
  }, [])

  const handleClickEditRecipe = (
    id: string,
    caution?: string,
    city?: string,
    clientName?: string,
    date?: string,
    modOfUse?: string,
    percent?: number,
    preservative?: string,
    floralName?: string[],
  ) => {
    history.push({
      pathname: `/receita/${id}`,
      state: {
        caution,
        city,
        clientName,
        date,
        modOfUse,
        percent,
        preservative,
        floralName
      }
    });
  };

 
  return (
    <>
      <Header/>
            {!recipes.length ? (
              <Progress />
            ) : (
              <main className="container">
              {recipes?.map((recipe) => (
                <CardFloral key={recipe.id}>
               
                <CardContent className="card">
                  <h1>
                    Fórmula florais de Bach
                  </h1>
                  <strong>
                    CLIENTE: <span>{recipe.clientName}</span>
                  </strong>
                  <strong>
                    INDICAÇÃO TERAPÊUTICA: <p>Florais de Bach</p>
                  </strong>
                  <strong>
                    NOME DAS ESSÊNCIAS: <p>{recipe.floralName}</p>
                  </strong>
                  <strong>
                    COMO TOMAR: <span>{recipe.modOfUse}</span>
                  </strong>
                  <strong>
                    CUIDADOS: 
                  <span>
                    {recipe.caution}
                  </span>
                  </strong>
                   <Box>
                  <strong>Cidade: <span>{recipe.city}</span></strong>
                  <strong>Data: <span>{recipe.date}</span></strong>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button>Learn More</Button>
                  <Tooltip title="Editar Receita">
                 <IconButton size="small" color="inherit" onClick={() => 
                   handleClickEditRecipe(
                     recipe.id, 
                     recipe.caution, 
                     recipe.city, 
                     recipe.clientName, 
                     recipe.date, 
                     recipe.modOfUse, 
                     recipe.percent, 
                     recipe.preservative, 
                     recipe.floralName)} 
                   style={{ background: yellow.yellow10, borderRadius: 5}}>
                  <ModeEditOutlineOutlinedIcon/>  Editar
                 </IconButton>
               </Tooltip>
                </CardActions>
              
                </CardFloral>
             ))}
  </main> 
            )}
    </>
  )
}