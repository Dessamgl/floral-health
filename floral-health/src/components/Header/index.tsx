import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';

import styles from './styles.module.scss'; 

export function Header() {  
  const { user } = useAuth()

  return (
    <header className={styles.headerContent}>
      <div className={styles.title}>
        <img src={logoImg} alt="logo floral health" />
        <span>Floral Health.</span>
        {
          user?.displayName && (
            <legend>{`Olá, ${user?.displayName}`}</legend>

          )
        }
      </div>
      <nav>
        <Link to="/floral"> Tela inicial</Link>
        <Link to="/anamnese">Anamnese</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/">Sair</Link>
      </nav>
    </header>
  )
}