import Button from './common/Button/Button';
import DotFillButton from './common/Button/DotFillButton';
import FlairButton from './common/Button/FlairButton';
import GSAPRippleButton from './common/Button/RippleButton';

export default function Header() {
  const handleClick = (buttonName: string) => {
    console.log(`${buttonName} clicked!`);
  };
  return (
    <header className="absolute top-8 right-8 z-20 flex space-x-4">
      <FlairButton
        className="bg-gradient-to-r from-orange-300 to-pink-300 border-none text-white hover:text-black"
        flairColor="bg-orange-500">
        LET'S TALK
      </FlairButton>
      <FlairButton
        className="bg-gradient-to-r from-pink-300 to-orange-300 border-none text-white hover:text-black"
        flairColor="bg-orange-500">
        MENU
      </FlairButton>
    </header>
  );
}
