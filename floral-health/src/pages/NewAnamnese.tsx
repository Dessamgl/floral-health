//@ts-ignore-file
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom'

import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, documentId } from 'firebase/firestore';

import '../styles/new-floral.scss';
import { Button, Grid, Tooltip } from '@mui/material';
import { whiteA, blue } from '@radix-ui/colors';

export interface Floral {
  id: string;
  name: string;
  description: string;
}

export function NewAnamnese() {
  const history = useHistory();
  const [client, setClient ] = useState("");
  const [nameFloral, setNameFloral] = useState([]);
  const [percent, setPercent] = useState<number>();
  const [preservative, setPreservative] = useState("");
  const [modeOfUse, setModeOfUse] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

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

  const getFlowers = async (id: string) => {
    const data = await documentId()
    
    console.log(data)
  }

 
  return (
    <>
      <Header/>
           <main className="container">
    <form id="form">
      <h1>Ficha de anamnese para Terapia Floral</h1>
    <fieldset>
        <div className="fieldset-wrapper">
        <legend>Dados gerais</legend>

        <Grid container spacing={2}>
          <Grid item xs={8}>
        <div className="input-wrapper">
          <label>Nome: </label>
          <input
            placeholder="nome do paciente"
            type="text" 
            id="event-title" 
           
          />
          </div>
          </Grid>
          <Grid item xs={4}>
        <div className="input-wrapper">
          <label>Data nascimento: </label>
          <input type="date" id="event-link" placeholder="dd/mm/aaaa"/>
        </div>
          </Grid>
        </Grid>


        <Grid container spacing={2}>
          <Grid item xs={7}>
          <div className="input-wrapper">
          <label>Endereço: </label>
          <input type="text" id="event-link" placeholder="endereço"/>
        </div>
          </Grid>
          <Grid item xs={5}>
        
          <div className="input-wrapper">
          <label>Bairro: </label>
          <input type="text" id="event-link" placeholder="bairro"/>
        </div>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Telefone: </label>
          <input type="phone" id="event-link" placeholder="(51) 99999-9999"/>
        </div>
          </Grid>
          <Grid item xs={8}>
        
          <div className="input-wrapper">
          <label>E-mail: </label>
          <input type="email" id="event-link" placeholder="exemplo@gmail.com"/>
        </div>
          </Grid>
        </Grid>

         <Grid container spacing={2}>
          <Grid item xs={5}>
          <div className="input-wrapper">
          <label>Profissão: </label>
          <input type="text" id="event-link" placeholder="trabalho/profissão/sustento"/>
        </div>
          </Grid>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Estado cívil: </label>
          <input type="text" id="event-link" placeholder="solteiro(a)/Casado(a)/Viúvo(a)"/>
        </div>

          </Grid>
          <Grid item xs={3}>
          <div className="input-wrapper">
          <label>Filhos: </label>
          <input type="text" id="event-link" placeholder="possui filhos"/>
        </div>
          </Grid>
        </Grid>
      </div>
      </fieldset>

      <fieldset>
        
        <div className="fieldset-wrapper">
        <legend>Padrão corporal</legend>

        <Grid container spacing={2}>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Atividade física: </label>
          <input type="text" id="event-email" placeholder="atividade física"/>
        </div>

          </Grid>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Cirurgias: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="cirurgia"
          />
        </div>
          </Grid>
        </Grid>
    
   
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Fraturas: </label>
          <input type="text" id="event-private" placeholder="fraturas"/>
        </div>
          </Grid>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Dores: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="dores"
          />
        </div>

          </Grid>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Cirurgias: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="cirurgia"
          />
        </div>
          </Grid>
        </Grid>
        </div>
        </fieldset>

        <fieldset>
          <div className="fieldset-wrapper">
          <legend>Saúde</legend>
  
            <div className="input-wrapper">
          <label>Alguma observação sobre sua saúde geral: </label>
          <textarea 
            id="event-password" 
            placeholder="saúde geral"
          />
        </div>

        <Grid container spacing={2}>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Método contraceptivo: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="anticoncepcional"
          />
        </div>
          </Grid>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Reposição hormonal: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="reposição hormonal"
          />
        </div>

          </Grid>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Histórico oncológico: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="histórico oncológico"
          />
        </div>
          </Grid>
        </Grid>
    
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Doenças anteriores: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="doenças anteriores"
          />
        </div>

          </Grid>

          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Tratamentos anteriores: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="tratamentos anteriores"
          />
        </div>
          </Grid>
        </Grid>
     


        <div className="input-wrapper">
          <label>Atualmente faz acompanhamento médico, psicológico ou outra terapia: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="acompanhamento médico, psicológico ou outra terapia"
          />
        </div>

        <div className="input-wrapper">
          <label>Faz uso de alguma medicação: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="usa medicações"
          />
        </div>
        
  
          </div>
          </fieldset>

          <fieldset>
          <div className="fieldset-wrapper">
          <legend>Alimentação</legend>
  
            {/* <div className="col-3"> */}
            <div className="input-wrapper">
          <label>Alguma observação sobre sua alimentação geral: </label>
          <textarea 
            id="event-password" 
            placeholder="alimentação geral"
          />
        </div>

        
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Nível de stress: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="nível de stress"
          />
        </div>
          </Grid>
          
          <Grid item xs={6}>
        
          <div className="input-wrapper">
          <label>Nível de ansiedade: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="nível de ansiedade"
          />
        </div>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
             
          <div className="input-wrapper">
          <label>Dorme bem: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="dorme bem"
          />
        </div>
          </Grid>
          
          <Grid item xs={4}>
        
        
          <div className="input-wrapper">
          <label>Quem mora com você: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="quem mora com você"
          />
        </div>
          </Grid>

          <Grid item xs={4}>
        
        
          <div className="input-wrapper">
          <label>Gosta do que faz/estuda: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="gosta do que faz/estuda"
          />
        </div>
        </Grid>
        </Grid>
 

        <Grid container spacing={2}>
          <Grid item xs={6}>
             
          <div className="input-wrapper">
          <label>Leitura: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="leitura"
          />
        </div>
          </Grid>
          
          <Grid item xs={6}>
        
        
          <div className="input-wrapper">
          <label>Última vez que tirou férias: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="ultima vez que tirou férias"
          />
        </div>
          </Grid>
        </Grid>
        
  
        <div className="input-wrapper">
          <label>Planejamento profissional/médio prazo </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="planejamento profissional"
          />
        </div>
          </div>
          </fieldset>

          <fieldset>
          <div className="fieldset-wrapper">
          <legend>Social</legend>
  
            {/* <div className="col-3"> */}
            <div className="input-wrapper">
          <label>Possui amigos: </label>
          <input 
           type="text" 
            id="event-password" 
            placeholder="possui amigos"
          />
        </div>
      
        <div className="input-wrapper">
          <label>Religião: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="religião"
          />
        </div>

        <div className="input-wrapper">
          <label>Costuma viajar: </label>
          <input 
            type="text" 
            id="event-password" 
            placeholder="costuma viajar"
          />
        </div>
            {/* </div> */}
  
          </div>
          </fieldset>
      
        </form>
        <footer>
        <Tooltip title="Adicionar Ficha Anamnese">
        <Button
        style={{ background: blue.blue12, color: whiteA.whiteA12}}
          className="button"
          type="submit" 
       
        >
         Adicionar Ficha Anamnese
        </Button>
        </Tooltip>
        </footer>
  </main>
    </>
  )
}