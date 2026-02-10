import { FaInstagram, FaFacebook } from "react-icons/fa";

function Navbar() {
  return (
    <header className="bg-black border-b border-yellow-600/30 shadow-lg shadow-yellow-600/20">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <img
          src="/ClemciLogo.jpeg"
          alt="Clemci Logo"
          className="h-16 w-16 rounded-full shadow-lg shadow-yellow-600/50"
        />

        <ul className="flex items-center gap-6 md:gap-8">
          <li className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer text-lg font-semibold">
            Nos pizzas
          </li>
          <li className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer text-lg font-semibold">
            Nos boissons
          </li>
          <li className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer text-lg font-semibold">
            Nos événements
          </li>
          <li className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer text-lg font-semibold">
            Nous découvrir
          </li>
        </ul>

        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/c.l.e.m.c.i/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://www.facebook.com/clemciPizza/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
            aria-label="Facebook"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
