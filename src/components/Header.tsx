const Header: React.FC = () => {
  return (
    <header className="absolute top-8 right-8 z-20 flex space-x-4">
      <button className="bg-neutral-800 text-white py-2 px-5 rounded-full font-semibold flex items-center space-x-2 hover:bg-neutral-700 transition">
        <span>LET'S TALK</span>
        <span className="w-2 h-2 bg-white rounded-full"></span>
      </button>
      <button className="bg-neutral-200 text-black py-2 px-5 rounded-full font-semibold flex items-center space-x-2 hover:bg-neutral-300 transition">
        <span>MENU</span>
        <span className="w-2 h-2 bg-black rounded-full"></span>
      </button>
    </header>
  );
};

export default Header;
