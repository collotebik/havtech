import {createRoot} from 'react-dom/client'; import HaosHero from './HaosHero'; import './index.css'; import '../script.js';
const mount=document.querySelector('#top .hr'); if(mount) createRoot(mount).render(<HaosHero/>);
