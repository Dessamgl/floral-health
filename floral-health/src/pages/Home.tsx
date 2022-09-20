import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

import bannerFlloralImg from '../assets/images/banner-flloral.png'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { Button, Tooltip } from '@mui/material';
import { whiteA, blue } from '@radix-ui/colors';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/flowers');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    // const roomRef = await database

    // if (!roomRef.exists()) {
    //   alert('Room does not exists.');
    //   return;
    // }

    // if (roomRef.val().endedAt) {
    //   alert('Room already closed.');
    //   return;
    // }

    // history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={bannerFlloralImg} alt="Ilustração com o ícone do sistema floral health"/>
        <strong>FLORAL HEALTH</strong>
        <p>O seu sistema de gerenciamento de Florais</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Floral Health</h2>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Entre com sua conta Google
          </button>
          <div className="separator">ou entre com seu e-mail e senha</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite seu e-mail"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
          <input type="text"  placeholder="Digite sua senha"/>

            <Tooltip title="Fazer login no sistema">
        <Button
        style={{ background: blue.blue12, color: whiteA.whiteA12}}
          className="button"
          type="submit" 
       
        >
         Fazer Login
        </Button>
        </Tooltip>
        </form>
        </div>
      </main>
    </div>
  )
}