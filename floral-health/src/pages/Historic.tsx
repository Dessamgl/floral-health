import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom'
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { collection, getDocs } from 'firebase/firestore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import '../styles/historic.scss';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { CardFloral } from '../components/Card';
import { Box, IconButton, Tooltip } from '@mui/material';
import { yellow, blue, whiteA } from '@radix-ui/colors';
import Progress from '../components/Progress';
import { printElement } from '../utils/printElement';
import { format } from 'date-fns';
import { Anamnese } from './NewAnamnese';

export interface Recipe {
  id: string;
  caution?: string;
  city?: string;
  clientName?: string;
  date?: string;
  modeOfUse?: string;
  percent?: number;
  preservative?: string;
  floralName?: readonly string[];
}

export function Historic() {
  const history = useHistory();


  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [anamneses, setAnamnese] = useState<Anamnese[]>([]);
  const { floralName } = useAuth()
  console.log(floralName)

  const recipeCollectionRef = collection(db, "recipe")
  const anamneseCollectionRef = collection(db, "anamnese")

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(recipeCollectionRef)
      const response = await data.docs?.map(doc => ({...doc.data(), id: doc.id}) as Recipe)
      console.log(response)
      setRecipes(response)
    }

    fetchData();
  }, [recipeCollectionRef])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(anamneseCollectionRef)
      const response = await data.docs?.map(doc => ({...doc.data(), id: doc.id}) as Anamnese)
      console.log(response)
      setAnamnese(response)
    } 

    fetchData()
  }, [anamneseCollectionRef])

  console.log(floralName)

  const handleClickEditRecipe = (
    id: string,
    caution?: string,
    city?: string,
    clientName?: string,
    date?: string,
    modeOfUse?: string,
    percent?: number,
    preservative?: string,
    floralName?: readonly string[],
  ) => {
    history.push({
      pathname: `/receita/${id}`,
      state: {
        caution,
        city,
        clientName,
        date,
        modeOfUse,
        percent,
        preservative,
        floralName
      }
    });
  };

  const handleClickEditAnamnese = (
    id: string,
    name?: string,
    birthdate?: string,
    telephone?: string,
    email?: string,
    contraceptiveMethode?: string,
    hormoneReplacement?: string,
    likeWhatYouDo?: string,
    stressLevel?: string,
    addresses?: string,
    anxietyLevel?: string,
    neighborhood?: string,
    family?: string,
    food?: string,
    friends?: string,
    health?: string,
    medicalFollowUp?: string,
    lastVocations?: string,
    maritalStatus?: string,
    medication?: string,
    pains?: string,
    physicalActivity?: string,
    planning?: string,
    previousIllnesses?: string,
    previousTratments?: string,
    profession?: string,
    reading?: string,
    religion?: string,
    sleepTight?: string,
    sons?: string,
    surgeries?: string,
    travel?: string,
    fractures?: string,
    oncological?: string,
  ) => {
    history.push({
      pathname: `/anamnese/${id}`,
      state: {
        name,
        birthdate,
        telephone,
        email,
        contraceptiveMethode,
        hormoneReplacement,
        likeWhatYouDo,
        stressLevel,
        addresses,
        anxietyLevel,
        neighborhood,
        family,
        food,
        friends,
        health,
        medicalFollowUp,
        lastVocations,
        maritalStatus,
        medication,
        pains,
        physicalActivity,
        planning,
        previousIllnesses,
        previousTratments,
        profession,
        reading,
        religion,
        sleepTight,
        sons,
        surgeries,
        travel,
        fractures,
        oncological
    }
  });
  };

  function handleClickPrintOut() {
    printElement("#card-recipe");
  }
 
  return (
    <>
      <Header/>
            {!recipes.length ? (
              <Progress />
            ) : (
              <>
              <h1 style={{maxWidth:"1120px", margin:"0 auto", padding:"2rem"}}>Histórico</h1>
           
              <main className="container-historic">
         
              {recipes?.map((recipe) => (
                 <CardFloral key={recipe.id}>
               
                 <CardContent className="card-historic" id="card-recipe">
                   <legend>
                     Fórmula florais de Bach
                   </legend>
                   <strong>
                   Paciente: <span>{recipe.clientName}</span>
                   </strong>
                   <Box display="flex" flexDirection="row">
                   <strong>
                     Indicação terapeutica:
                   </strong>
                   <p>Florais de Bach</p>
                   </Box>
                   <strong>
                     Nome das essências: <p>{floralName || "-----"}</p>
                   </strong>
                   <strong>
                     Como tomar: <span>{recipe.modeOfUse || "-----"}</span>
                   </strong>
                   <strong>
                     Cuidados: 
                   <span>
                     {recipe.caution || "-----"}
                   </span>
                   </strong>
                   <strong>Cidade: <span>{recipe.city}</span></strong>
                   <strong>Data: <span>{recipe.date ? format(new Date(recipe.date), "dd/MM/yyyy") : "-----"}</span></strong>
                   
                 </CardContent>
                 <CardActions className="card-icons">
                 <Tooltip title="Baixar receita em PDF">
                 <IconButton size="small" color="inherit" onClick={handleClickPrintOut}
                    style={{ background: blue.blue12, color: whiteA.whiteA12, borderRadius: 5}}>
                  <PictureAsPdfIcon/>  Baixar PDF
                 </IconButton>
               </Tooltip>
                  <Tooltip title="Editar Receita">
                 <IconButton size="small" color="inherit" onClick={() => 
                    handleClickEditRecipe(
                      recipe.id, 
                      recipe.caution, 
                      recipe.city, 
                      recipe.clientName, 
                      recipe.date, 
                      recipe.modeOfUse, 
                      recipe.percent, 
                      recipe.preservative, 
                      floralName)} 
                    style={{ background: yellow.yellow10, borderRadius: 5}}>
                  <ModeEditOutlineOutlinedIcon/>  Editar
                 </IconButton>
               </Tooltip>
                </CardActions>
               
                 </CardFloral>
             ))}
                {anamneses.map((anamnese) => (
                <CardFloral key={anamnese.id}>
               
                <CardContent className="card-historic" id="card-recipe">
                  <legend>
                    Ficha Anamnese
                  </legend>
                  <strong>
                    Paciente: <span>{anamnese.name || "-----"}</span>
                  </strong>
                  <strong>
                    E-mail: <p>{anamnese.email || "-----"}</p>
                  </strong>
                  <strong>
                    Número de telefone: <span>{anamnese.telephone || "-----" }</span>
                  </strong>
                  <strong>
                    Saúde: 
                  <span>
                   {anamnese.health || "-----"}
                  </span>
                  </strong>
                  <strong>Doenças anteriores: <span>{anamnese.previousIllnesses || "-----"}</span></strong>
                  <strong>Tratamentos anteriores: <span>{anamnese.previousTratments || "-----"}</span></strong>
                  
                </CardContent>
                <CardActions className="card-icons">
                 <Tooltip title="Editar Ficha Anamnese">
                <IconButton size="small" color="inherit" onClick={() => 
                   handleClickEditAnamnese(
                    anamnese.id,
                    anamnese.name,
                    anamnese.birthdate,
                    anamnese.telephone,
                    anamnese.email,
                    anamnese.contraceptiveMethode,
                    anamnese.hormoneReplacement,
                    anamnese.likeWhatYouDo,
                    anamnese.stressLevel,
                    anamnese.addresses,
                    anamnese.anxietyLevel,
                    anamnese.neighborhood,
                    anamnese.family,
                    anamnese.food,
                    anamnese.friends,
                    anamnese.health,
                    anamnese.medicalFollowUp,
                    anamnese.lastVocations,
                    anamnese.maritalStatus,
                    anamnese.medication,
                    anamnese.pains,
                    anamnese.physicalActivity,
                    anamnese.planning,
                    anamnese.previousIllnesses,
                    anamnese.previousTratments,
                    anamnese.profession,
                    anamnese.reading,
                    anamnese.religion,
                    anamnese.sleepTight,
                    anamnese.sons,
                    anamnese.surgeries,
                    anamnese.travel,
                    anamnese.fractures,
                    anamnese.oncological
                     )} 
                   style={{ background: yellow.yellow10, borderRadius: 5, marginTop: 15}}>
                 <ModeEditOutlineOutlinedIcon/>  Editar
                </IconButton>
              </Tooltip>
               </CardActions>
              
                </CardFloral>
             ))}
  </main> 
  </>
            )}
    </>
  )
}