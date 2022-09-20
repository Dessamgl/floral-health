import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/images/logo.svg';

import styles from './styles.module.scss'; 

export function Header() {
  const history = useHistory();

  return (
    <header className={styles.headerContent}>
      <div className={styles.title}>
        <img src={logoImg} alt="logo floral health" />
        <span>Floral Health.</span>
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