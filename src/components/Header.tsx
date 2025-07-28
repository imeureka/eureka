import Button from './common/Button/Button';
import DotFillButton from './common/Button/DotFillButton';
import FlairButton from './common/Button/FlairButton';
import GSAPRippleButton from './common/Button/RippleButton';

type Language = 'en' | 'ko';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageToggle: () => void;
}

export default function Header({ currentLanguage, onLanguageToggle }: HeaderProps) {
  const handleClick = (buttonName: string) => {
    console.log(`${buttonName} clicked!`);
  };

  return (
    <header className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center">
      {/* 왼쪽: 번역기 버튼 */}
      <FlairButton
        onClick={onLanguageToggle}
        className="bg-black text-white px-4 py-2 rounded-full transition-colors duration-300 font-medium text-sm">
        {currentLanguage === 'en' ? '한국어' : 'English'}
      </FlairButton>

      {/* 오른쪽: 기존 버튼들 */}
      <div className="flex space-x-4">
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
      </div>
    </header>
  );
}
