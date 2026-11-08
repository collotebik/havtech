import {createRoot} from 'react-dom/client'; import HaosHero from './HaosHero'; import './index.css';
const mount=document.querySelector('#top .hr'); if(mount) createRoot(mount).render(<HaosHero/>);
