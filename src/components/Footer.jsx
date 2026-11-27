import { DATA } from '../data';
import Reveal from './Reveal';

export default function Footer() {
  return (
    <footer>
      <Reveal id="foot">
        © {new Date().getFullYear()} {DATA.name}. Hak cipta dilindungi.
      </Reveal>
    </footer>
  );
}
