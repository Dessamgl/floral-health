//@ts-ignore-file
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Header } from '../components/Header';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

import '../styles/new-floral.scss';
import { Button, Grid, Tooltip } from '@mui/material';
import { whiteA, blue } from '@radix-ui/colors';
import { IToast, Toast } from '../components/Toast';

export interface Anamnese {
  id: string;
  name?: string;
  birthdate?: string;
  telephone?: string;
  email?: string;
  contraceptiveMethode?: string;
  hormoneReplacement?: string;
  likeWhatYouDo?: string;
  stressLevel?: string;
  addresses?: string;
  anxietyLevel?: string;
  neighborhood?: string;
  family?: string;
  food?: string;
  friends?: string;
  health?: string;
  medicalFollowUp?: string;
  lastVocations?: string;
  maritalStatus?: string;
  medication?: string;
  pains?: string;
  physicalActivity?: string;
  planning?: string;
  previousIllnesses?: string;
  previousTratments?: string;
  profession?: string;
  reading?: string;
  religion?: string;
  sleepTight?: string;
  sons?: string;
  surgeries?: string;
  travel?: string;
  fractures?: string;
  oncological?: string;
}

interface AnamneseParams {
  id: string;
}

export function NewAnamnese() {
  const history = useHistory();
  const params = useParams<AnamneseParams>();
  const location = useLocation();
  const anamnese = location.state as Anamnese;
  const anamneseId = params.id;

  const [name, setName ] = useState("");
  const [isDisable, setIsDisable] = useState(false)
  const [birthdate, setBirthdate] = useState("");
  const [telephone, setTelephone] = useState<number>();
  const [email, setEmail] = useState("");
  const [contraceptiveMethode, setContraceptiveMethode] = useState("");
  const [hormoneReplacement, setHormoneReplacement] = useState("");
  const [likeWhatYouDo, setLikeWhatYouDo] = useState("");
  const [stressLevel, setStressLevel] = useState("")
  const [addresses, setAddresses] = useState("");
  const [anxietyLevel, setAnxietyLevel] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [family, setFamily] = useState("");
  const [food, setFood] = useState("");
  const [friends, setFriends] = useState("");
  const [health, setHealth] = useState("");
  const [medicalFollowUp, setMedicalFollowUp] = useState("");
  const [lastVocations, setLastVocations] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [medication, setMedication] = useState("");
  const [pains, setPains] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [planning, setPlanning] = useState("");
  const [previousIllnesses, setPreviousIllnesses] = useState("");
  const [previousTratments, setPreviousTratments] = useState("");
  const [profession, setProfession] = useState("");
  const [reading, setReading] = useState("");
  const [religion, setReligion] = useState("");
  const [sleepTight, setSleepTight] = useState("");
  const [sons, setSons] = useState("");
  const [surgeries, setSurgeries] = useState("");
  const [travel, setTravel] = useState("");
  const [fractures, setFractures] = useState("");
  const [oncological, setOncological] = useState("")
  const [openToast, setOpenToast] = useState(false);
  const [toast, setToast] = useState<IToast>({
    altText: "",
    color: "green",
    open: openToast,
    textButton: "",
    title: "",
    onClickButtonToast: () => {}   
    });

  const anamneseCollectionRef = collection(db, "anamnese")

  const handleCreateAnamnese = async () => {
    try {
      await addDoc(anamneseCollectionRef, {
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
        oncological,
      })

      setToast({
        altText: "Ficha Anamnese criada, direcionamento para o hist??rico",
        color: "green",
        open: true,
        title: "Ficha Anamnese criada com sucesso.",
        textButton: "Ir para a tela de hist??rico",
        onClickButtonToast: () => {history.push('/historico')}
      })
      
    } catch (error) {
      setToast({
        altText: "A Ficha Anamnese n??o foi criada, manter na tela para uma nova tentativa",
        color: "red",
        open: true,
        title: "N??o foi poss??vel adicionar a Ficha Anamnese.",
        textButton: "Ok, tentar novamente",
        onClickButtonToast: () => {setOpenToast(false)},
      })
    }
  }

  const handleEditAnamnese= async (newAnamnese: any) => {
    try {
      const anamnese = doc(db, "anamnese", anamneseId)
      await updateDoc(anamnese, newAnamnese)
      
      setToast({
        altText: "Ficha Anamnese atualizada, direcionamento para a tela hist??rico",
        color: "green",
        open: true,
        title: "Ficha anamnese atualizada com sucesso.",
        textButton: "Ir para a tela hist??rico",
        onClickButtonToast: () => {history.push('/historico')}
      })

      setIsDisable(true)
      
    } catch (error) {
        setToast({
          altText: "A Ficha Anamnese n??o foi atualizadda, manter na tela para uma nova tentativa",
          color: "red",
          open: true,
          title: "N??o foi poss??vel atualizar a ficha anamnese.",
          textButton: "Ok, tentar novamente",
          onClickButtonToast: () => {setOpenToast(false)},
      })
    }
  }

  const saveDataAnamnese = async (event: FormEvent) => {
    event.preventDefault();
    if(anamneseId) {
      await handleEditAnamnese({
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
        oncological,
      })
    } else {
      await handleCreateAnamnese()
    }
  }

  const checkDataAnamnese = useCallback(() => {
    if (anamneseId) {
      if (anamnese?.name) {
        setName(anamnese.name);
      }
      if (anamnese?.birthdate) {
        setBirthdate(anamnese.birthdate);
      }
      if (anamnese?.telephone) {
        setTelephone(Number(anamnese.telephone));
      }
      if (anamnese?.email) {
        setEmail(anamnese.email);
      }
      if (anamnese?.contraceptiveMethode) {
        setContraceptiveMethode(anamnese.contraceptiveMethode);
      }
      if (anamnese?.hormoneReplacement) {
        setHormoneReplacement(anamnese.hormoneReplacement);
      }
      if (anamnese?.likeWhatYouDo) {
        setLikeWhatYouDo(anamnese.likeWhatYouDo);
      }
      if (anamnese?.stressLevel) {
        setStressLevel(anamnese.stressLevel);
      }
      if (anamnese?.addresses) {
        setAddresses(anamnese.addresses);
      }
      if (anamnese?.anxietyLevel) {
        setAnxietyLevel(anamnese.anxietyLevel);
      }
      if (anamnese?.neighborhood) {
        setNeighborhood(anamnese.neighborhood);
      }
      if (anamnese?.family) {
        setFamily(anamnese.family);
      }
      if (anamnese?.food) {
        setFood(anamnese.food);
      }
      if (anamnese?.friends) {
        setFriends(anamnese.friends);
      }
      if (anamnese?.health) {
        setHealth(anamnese.health);
      }
      if (anamnese?.medicalFollowUp) {
        setMedicalFollowUp(anamnese.medicalFollowUp);
      }
      if (anamnese?.lastVocations) {
        setLastVocations(anamnese.lastVocations);
      }
      if (anamnese?.maritalStatus) {
        setMaritalStatus(anamnese.maritalStatus);
      }
      if (anamnese?.medication) {
        setMedication(anamnese.medication);
      }
      if (anamnese?.pains) {
        setPains(anamnese.pains);
      }
      if (anamnese?.physicalActivity) {
        setPhysicalActivity(anamnese.physicalActivity);
      }
      if (anamnese?.planning) {
        setPlanning(anamnese.planning);
      }
      if (anamnese?.previousIllnesses) {
        setPreviousIllnesses(anamnese.previousIllnesses);
      }
      if (anamnese?.previousTratments) {
        setPreviousTratments(anamnese.previousTratments);
      }
      if (anamnese?.profession) {
        setProfession(anamnese.profession);
      }
      if (anamnese?.reading) {
        setReading(anamnese.reading);
      }
      if (anamnese?.religion) {
        setReligion(anamnese.religion);
      }
      if (anamnese?.sleepTight) {
        setSleepTight(anamnese.sleepTight);
      }
      if (anamnese?.sons) {
        setSons(anamnese.sons);
      }
      if (anamnese?.surgeries) {
        setSurgeries(anamnese.surgeries);
      }
      if (anamnese?.fractures) {
        setFractures(anamnese.fractures);
      }
      if (anamnese?.oncological) {
        setOncological(anamnese.oncological);
      }
    }
  }, [anamnese, anamneseId]);

  useEffect(() => {
    checkDataAnamnese();
  }, [checkDataAnamnese]);

  const disabledButtonSave = (
    !birthdate.length || !name || !telephone || !email
  )

 
  return (
    <>
      <Header/>
           <main className="container">
    <form id="form" onSubmit={saveDataAnamnese}>
      <h1>{anamneseId ? `Editar Ficha de anamnese para Terapia Floral` : `Adicionar Ficha de anamnese para Terapia Floral`}</h1>
    <fieldset>
        <div className="fieldset-wrapper">
        <legend>Dados gerais</legend>

        <Grid container spacing={2}>
          <Grid item xs={8}>
        <div className="input-wrapper">
          <label>Nome: <span>(somente letras)</span></label> 
          <input disabled={isDisable}
          required
            placeholder="nome do paciente"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            type="text" 
            maxLength={50}
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          </div>
          </Grid>
          <Grid item xs={4}>
        <div className="input-wrapper">
          <label>Data nascimento: </label>
          <input disabled={isDisable} required type="date" placeholder="dd/mm/aaaa" value={birthdate} 
            onChange={(e) => setBirthdate(e.target.value)}/>
        </div>
          </Grid>
        </Grid>


        <Grid container spacing={2}>
          <Grid item xs={7}>
          <div className="input-wrapper">
          <label>Endere??o: </label>
          <input disabled={isDisable} type="text" placeholder="endere??o" value={addresses} 
            onChange={(e) => setAddresses(e.target.value)}/>
        </div>
          </Grid>
          <Grid item xs={5}>
        
          <div className="input-wrapper">
          <label>Bairro: <span>(somente letras)</span></label>
          <input disabled={isDisable} type="text" pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$" placeholder="bairro" value={neighborhood} 
            onChange={(e) => setNeighborhood(e.target.value)}/>
        </div>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Telefone: <span>(somente n??meros)</span></label>
          <input disabled={isDisable} required type="number" placeholder="51999999999" value={telephone} 
            onChange={(e) => setTelephone(Number(
              Math.max(0, parseInt(e.target.value)).toString().slice(0, 11)
            ))}/>
        </div>
          </Grid>
          <Grid item xs={8}>
        
          <div className="input-wrapper">
          <label>E-mail: </label>
          <input disabled={isDisable} required type="email" placeholder="exemplo@gmail.com" value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
          </Grid>
        </Grid>

         <Grid container spacing={2}>
          <Grid item xs={5}>
          <div className="input-wrapper">
          <label>Profiss??o: <span>(somente letras)</span></label>
          <input disabled={isDisable} type="text" pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$" placeholder="trabalho/profiss??o/sustento" value={profession} 
            onChange={(e) => setProfession(e.target.value)}/>
        </div>
          </Grid>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Estado c??vil: <span>(somente letras)</span></label>
          <input disabled={isDisable} type="text" pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$" placeholder="solteiro(a)/Casado(a)/Vi??vo(a)" value={maritalStatus} 
            onChange={(e) => setMaritalStatus(e.target.value)}/>
        </div>

          </Grid>
          <Grid item xs={3}>
          <div className="input-wrapper">
          <label>Filhos: <span>(somente n??meros)</span></label>
          <input disabled={isDisable} type="number" placeholder="filhos" value={sons} 
            onChange={(e) => setSons(e.target.value)} />
        </div>
          </Grid>
        </Grid>
      </div>
      </fieldset>

      <fieldset>
        
        <div className="fieldset-wrapper">
        <legend>Padr??o corporal</legend>

        <Grid container spacing={2}>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Atividade f??sica:  <span>(somente letras)</span></label>
          <input disabled={isDisable} type="text" pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$" placeholder="atividade f??sica" value={physicalActivity} 
            onChange={(e) => setPhysicalActivity(e.target.value)}/>
        </div>

          </Grid>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Cirurgias: </label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="cirurgia"
            value={surgeries} 
            onChange={(e) => setSurgeries(e.target.value)}
          />
        </div>
          </Grid>
        </Grid>
    
   
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Fraturas: </label>
          <input disabled={isDisable} type="text" placeholder="fraturas" value={fractures} 
            onChange={(e) => setFractures(e.target.value)}/>
        </div>
          </Grid>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Dores: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="dores"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={pains} 
            onChange={(e) => setPains(e.target.value)}
          />
        </div>

          </Grid>
        </Grid>
        </div>
        </fieldset>

        <fieldset>
          <div className="fieldset-wrapper">
          <legend>Sa??de</legend>
  
            <div className="input-wrapper">
          <label>Alguma observa????o sobre sua sa??de geral: <span>(somente letras)</span></label>
          <textarea 
          disabled={isDisable} 
           value={health} 
           onChange={(e) => setHealth(e.target.value)}
            placeholder="sa??de geral"
            maxLength={200}
          />
        </div>

        <Grid container spacing={2}>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>M??todo contraceptivo: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="anticoncepcional"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={contraceptiveMethode} 
            onChange={(e) => setContraceptiveMethode(e.target.value)}
          />
        </div>
          </Grid>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Reposi????o hormonal: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="reposi????o hormonal"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={hormoneReplacement} 
            onChange={(e) => setHormoneReplacement(e.target.value)}
          />
        </div>

          </Grid>
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Hist??rico oncol??gico: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="hist??rico oncol??gico"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={oncological} 
            onChange={(e) => setOncological(e.target.value)}
          />
        </div>
          </Grid>
        </Grid>
    
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Doen??as anteriores: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="doen??as anteriores"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={previousIllnesses} 
            onChange={(e) => setPreviousIllnesses(e.target.value)}
          />
        </div>

          </Grid>

          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>Tratamentos anteriores:  <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="tratamentos anteriores"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={previousTratments} 
            onChange={(e) => setPreviousTratments(e.target.value)}
          />
        </div>
          </Grid>
        </Grid>
     


        <div className="input-wrapper">
          <label>Atualmente faz acompanhamento m??dico, psicol??gico ou outra terapia:  <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="acompanhamento m??dico, psicol??gico ou outra terapia"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={medicalFollowUp} 
            onChange={(e) => setMedicalFollowUp(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label>Faz uso de alguma medica????o: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="medica????es"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={medication} 
            onChange={(e) => setMedication(e.target.value)}
          />
        </div>
        
  
          </div>
          </fieldset>

          <fieldset>
          <div className="fieldset-wrapper">
          <legend>Alimenta????o</legend>
  
            {/* <div className="col-3"> */}
            <div className="input-wrapper" >
          <label>Alguma observa????o sobre sua alimenta????o geral: <span>(somente letras)</span></label>
          <textarea 
          disabled={isDisable} 
            placeholder="alimenta????o geral"
            maxLength={200}
            value={food} 
            onChange={(e) => setFood(e.target.value)}
          />
        </div>

        
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <div className="input-wrapper">
          <label>N??vel de stress: </label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="n??vel de stress"
            value={stressLevel} 
            onChange={(e) => setStressLevel(e.target.value)}
          />
        </div>
          </Grid>
          
          <Grid item xs={6}>
        
          <div className="input-wrapper">
          <label>N??vel de ansiedade: </label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="n??vel de ansiedade"
            value={anxietyLevel} 
            onChange={(e) => setAnxietyLevel(e.target.value)}
          />
        </div>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
             
          <div className="input-wrapper">
          <label>Dorme bem: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            placeholder="dorme bem"
            value={sleepTight} 
            onChange={(e) => setSleepTight(e.target.value)}
          />
        </div>
          </Grid>
          
          <Grid item xs={4}>
          <div className="input-wrapper">
          <label>Quem mora com voc??: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            placeholder="quem mora com voc??"
            value={family} 
            onChange={(e) => setFamily(e.target.value)}
          />
        </div>
          </Grid>

          <Grid item xs={4}>
        
        
          <div className="input-wrapper">
          <label>Gosta do que faz/estuda: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            placeholder="gosta do que faz/estuda"
            value={likeWhatYouDo} 
            onChange={(e) => setLikeWhatYouDo(e.target.value)}
          />
        </div>
        </Grid>
        </Grid>
 

        <Grid container spacing={2}>
          <Grid item xs={6}>
             
          <div className="input-wrapper">
          <label>Leitura: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="leitura"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={reading} 
            onChange={(e) => setReading(e.target.value)}
          />
        </div>
          </Grid>
          
          <Grid item xs={6}>
        
        
          <div className="input-wrapper">
          <label>??ltima vez que tirou f??rias: </label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="ultima vez que tirou f??rias"
            value={lastVocations} 
            onChange={(e) => setLastVocations(e.target.value)}
          />
        </div>
          </Grid>
        </Grid>
        
  
        <div className="input-wrapper">
          <label>Planejamento profissional/m??dio prazo </label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="planejamento profissional"
            value={planning} 
            onChange={(e) => setPlanning(e.target.value)}
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
          <input disabled={isDisable} 
           type="text" 
            placeholder="possui amigos"
            value={friends} 
            onChange={(e) => setFriends(e.target.value)}
          />
        </div>
      
        <div className="input-wrapper">
          <label>Religi??o: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="religi??o"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={religion} 
            onChange={(e) => setReligion(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label>Costuma viajar: <span>(somente letras)</span></label>
          <input disabled={isDisable} 
            type="text" 
            placeholder="costuma viajar"
            pattern="[A-Za-z?????????????????????????????????????????????????????????????? ]+$"
            value={travel} 
            onChange={(e) => setTravel(e.target.value)}
          />
        </div>
          </div>
          </fieldset>
      
        </form>
        <footer>
        <Tooltip title={anamneseId ? "Editar Ficha Anamnese" : "Adicionar Ficha Anamnese"}>
        <Button
        style={{ background: blue.blue12, color: whiteA.whiteA12}}
          className="button"
          form="form"
          type="submit" 
          disabled={disabledButtonSave || isDisable}
        >
         {anamneseId ? "Editar Ficha Anamnese" : "Adicionar Ficha Anamnese"}
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