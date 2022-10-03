import { useHistory } from 'react-router-dom'

import bannerFlloralImg from '../assets/images/banner-flloral.png'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { auth } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { Tooltip } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export function Home() {
  const history = useHistory();
  const { getUser } = useAuth()

  function handleGoogleSigIn() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
    .then(result => {
      getUser(result.user)
      history.push("/floral")
    })
    .catch(err => {
      console.log(err);
      
    })
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={bannerFlloralImg} alt="Ilustração com o ícone do sistema floral health, na cor verde"/>
        <strong>FLORAL HEALTH</strong>
        <p>O seu sistema de gerenciamento de Florais</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Floral Health</h2>
          <p> Clique no botão e escolha o seu melhor e-mail para fazer login</p>
          <Tooltip title="Fazer login no sistema com sua conta Google">
          <button onClick={handleGoogleSigIn} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Entre com sua conta Google
          </button>
          </Tooltip>
        </div>
      </main>
    </div>
  )
}