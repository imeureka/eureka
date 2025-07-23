import Button from './common/Button/Button';
import DotFillButton from './common/Button/DotFillButton';
import GSAPRippleButton from './common/Button/RippleButton';

export default function Header() {
  const handleClick = (buttonName: string) => {
    console.log(`${buttonName} clicked!`);
  };
  return (
    <header className="absolute top-8 right-8 z-20 flex space-x-4">
      <Button>LET'S TALK</Button>
      <Button dotCount={2}>CONTACT US</Button>
      <Button variant="secondary">GET STARTED</Button>
    </header>
  );
}
