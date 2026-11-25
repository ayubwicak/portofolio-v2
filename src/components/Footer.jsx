import { DATA } from '../data';

export default function Footer() {
  return (
    <footer>
      <div id="foot">
        © {new Date().getFullYear()} {DATA.name}. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
