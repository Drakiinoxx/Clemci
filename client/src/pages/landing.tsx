import {
  FaInstagram,
  FaFacebook,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function Landing() {
  return (
    <div className="relative flex flex-col items-center justify-center  bg-black text-white px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-100 text-8xl">🍕</div>
        <div className="absolute top-40 right-20 text-6xl">🍄</div>
        <div className="absolute bottom-20 left-20 text-7xl">🧀</div>
        <div className="absolute bottom-38 right-10 text-6xl">🍕</div>
        <div className="absolute top-1/2 left-1/4 text-5xl">🌿</div>
        <div className="absolute top-1/3 right-1/3 text-6xl">🍄</div>
      </div>

      <div className="text-center mb-8 relative z-10">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full animate-pulse"></div>
          <img
            src="/ClemciLogo.jpeg"
            alt="Clemci Logo"
            className="w-40 md:w-50 mx-auto relative z-10 hover:scale-110 transition-transform duration-500 rounded-full -mt-10"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-yellow-500 mt-6 hover:text-yellow-400 transition-colors duration-300">
          Clemci Pizzeria
        </h1>
        <p className="text-gray-400 text-lg mt-2 italic mb-2">
          🍕 L'art de la pizza artisanale 🍕
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl w-full mb-8 relative z-10">
        {/* GAUCHE - Contact */}
        <div className="flex flex-col items-center lg:items-end lg:pr-8 space-y-8">
          <div className="text-center lg:text-right group">
            <h2 className="text-3xl font-serif text-yellow-500 mb-6 flex items-center justify-center lg:justify-end gap-3">
              <FaPhoneAlt className="group-hover:rotate-12 transition-transform duration-300" />
              Nous contacter
            </h2>

            <a
              href="tel:+33477788651"
              className="block text-3xl md:text-4xl font-bold text-yellow-500 hover:text-yellow-400 hover:scale-110 transition-all duration-300 mb-2"
            >
              04 77 78 86 51
            </a>
            <p className="text-gray-400 mb-8">Appelez pour commander 🍕</p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=38+rue+des+Ecoles+Saint+Denis+de+Cabanne"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xl text-gray-300 hover:text-yellow-500 hover:scale-105 transition-all duration-300 group"
            >
              <FaMapMarkerAlt className="inline mb-1 mr-2 group-hover:bounce" />
              38 rue des Écoles
              <br />
              Saint-Denis-de-Cabanne
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start lg:pl-8 lg:border-l lg:border-yellow-600/20">
          <div className="text-center lg:text-left w-full group">
            <h2 className="text-3xl font-serif text-yellow-500 mb-8 flex items-center justify-center lg:justify-start gap-3">
              <FaClock className="group-hover:rotate-180 transition-transform duration-500" />
              Nos horaires
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3 hover:border-yellow-600/50 transition-colors duration-300 group">
                <span className="text-gray-400 text-lg group-hover:text-yellow-500 transition-colors">
                  🌞 Lun — Jeu
                </span>
                <span className="text-yellow-500 text-lg">
                  10h-14h / 18h-22h
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-800 pb-3 hover:border-yellow-600/50 transition-colors duration-300 group">
                <span className="text-gray-400 text-lg group-hover:text-yellow-500 transition-colors">
                  🎉 Ven — Sam
                </span>
                <span className="text-yellow-500 text-lg">
                  10h-14h / 18h-23h
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-800 pb-3 hover:border-yellow-600/50 transition-colors duration-300 group">
                <span className="text-gray-400 text-lg group-hover:text-yellow-500 transition-colors">
                  ☀️ Dimanche
                </span>
                <span className="text-yellow-500 text-lg">18h-23h</span>
              </div>

              <div className="pt-4 bg-red-900/10 rounded-lg p-3 border border-red-600/20">
                <p className="text-red-400 text-sm italic flex items-center justify-center lg:justify-start gap-2">
                  ❌ Fermé : Mardi & Dimanche midi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 relative z-10">
        <p className="text-2xl md:text-3xl font-serif text-yellow-500 italic animate-pulse">
          ✨ Venez découvrir nos pizzas artisanales ! ✨
        </p>
      </div>
    </div>
  );
}

export default Landing;
