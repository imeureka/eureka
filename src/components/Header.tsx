'use client';

import { useState, useRef, useEffect } from 'react';
import FlairButton from './common/Button/FlairButton';
import RippleButton from './common/Button/RippleButton';
import Button from './common/Button/Button';
import ThemeToggle from './ThemeToggle';
import SimpleThemeToggle from './SimpleThemeToggle';

type Language = 'en' | 'ko';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageToggle: () => void;
}

export default function Header({ currentLanguage, onLanguageToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const menuBackgroundRef = useRef<HTMLDivElement>(null);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  // 간단한 애니메이션 (GSAP 없이)
  useEffect(() => {
    if (!menuOverlayRef.current || !menuItemsRef.current || !menuBackgroundRef.current) return;

    if (isMenuOpen) {
      // 메뉴 열기
      menuOverlayRef.current.style.display = 'flex';
      menuOverlayRef.current.style.opacity = '0';

      setTimeout(() => {
        if (menuOverlayRef.current) {
          menuOverlayRef.current.style.opacity = '1';
          menuOverlayRef.current.style.transition = 'opacity 0.3s ease';
        }
      }, 10);
    } else {
      // 메뉴 닫기
      if (menuOverlayRef.current) {
        menuOverlayRef.current.style.opacity = '0';
        setTimeout(() => {
          if (menuOverlayRef.current) {
            menuOverlayRef.current.style.display = 'none';
          }
        }, 300);
      }
    }
  }, [isMenuOpen]);

  const menuItems = [
    {
      label: 'HOME',
      action: () => {
        window.location.href = '/';
        closeMenu();
      },
    },
    {
      label: 'WORK',
      action: () => scrollToSection('featured-work'),
    },
    {
      label: 'ARTICLES',
      action: () => {
        window.location.href = '/articles';
        closeMenu();
      },
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-120 ${isMobile ? 'px-4 py-4' : 'px-8 py-6'} flex justify-between items-center transition-all duration-300`}>
        {/* 왼쪽: 번역기 버튼 */}
        <Button
          onClick={onLanguageToggle}
          className={`bg-black text-white rounded-full  font-medium ${
            isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'
          }`}>
          {currentLanguage === 'en' ? '한국어' : 'English'}
        </Button>

        {/* 오른쪽: 기존 버튼들 */}
        <div className={`flex ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
          <FlairButton
            className={`bg-gradient-to-r from-orange-300 to-pink-300 border-none text-white hover:text-black transition-all duration-300 ${
              isMobile ? 'px-3 py-2 text-xs rounded-full' : 'px-4 py-2 text-2xl rounded-full'
            }`}
            flairColor="bg-orange-500">
            {isMobile ? 'TALK' : "LET'S TALK"}
          </FlairButton>
          <FlairButton
            onClick={toggleMenu}
            className={`bg-gradient-to-r from-pink-300 to-orange-300 border-none text-white hover:text-black transition-all duration-300 ${
              isMobile ? 'px-3 py-2 text-xs rounded-full' : 'px-4 py-2 text-2xl rounded-full'
            }`}
            flairColor="bg-orange-500">
            {isMenuOpen ? (currentLanguage === 'ko' ? 'MENU' : 'MENU') : 'MENU'}
          </FlairButton>
        </div>
      </header>

      {/* 풀스크린 메뉴 오버레이 */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-100 items-center justify-center hidden"
        style={{ display: 'none' }}>
        {/* 메뉴 배경 */}
        <div
          ref={menuBackgroundRef}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
        />

        {/* 닫기 버튼 */}
        <button
          onClick={closeMenu}
          className={`absolute ${isMobile ? 'top-4 right-4' : 'top-8 right-8'} text-white hover:text-orange-400 transition-colors duration-300 z-10`}>
          <svg className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 메뉴 아이템들 */}
        <div ref={menuItemsRef} className={`relative z-10 text-center ${isMobile ? 'space-y-6' : 'space-y-8'}`}>
          {menuItems.map((item, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={item.action}
                className={`group block text-white font-black leading-none tracking-tight hover:text-orange-300 bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-400 transition-all duration-500 transform hover:scale-110 ${
                  isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'
                }`}>
                <span className="z-50 inline-block transition-transform duration-300 group-hover:translate-y-[-5px]">
                  {item.label}
                </span>
              </button>

              {/* 언더라인 애니메이션 */}
              <div
                className={`h-1 bg-gradient-to-r from-orange-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mx-auto mt-2 ${
                  isMobile ? 'w-24' : 'w-48'
                }`}
              />
            </div>
          ))}

          {/* 장식 요소 - 모바일에서는 더 작게 */}
          <div
            className={`absolute bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse ${
              isMobile ? '-top-10 -left-10 w-20 h-20' : '-top-20 -left-20 w-40 h-40'
            }`}
          />
          <div
            className={`absolute bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse ${
              isMobile ? '-bottom-10 -right-10 w-24 h-24' : '-bottom-20 -right-20 w-60 h-60'
            }`}
            style={{ animationDelay: '1s' }}
          />
        </div>
      </div>
    </>
  );
}
