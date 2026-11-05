import { createRoot } from 'react-dom/client';
import { FloatingIconsCta } from './components/FloatingIconsCta';
import { FloatingIconsHero } from './components/FloatingIconsHero';
import './index.css';

const target = document.querySelector<HTMLElement>('#cta');
if (target) createRoot(target).render(<FloatingIconsHero cta />);
