'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const menuBackgroundRef = useRef<HTMLDivElement>(null);

  const handleClick = (buttonName: string) => {
    console.log(`${buttonName} clicked!`);
  };

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

  // 메뉴 애니메이션
  useGSAP(() => {
    if (!menuOverlayRef.current || !menuItemsRef.current || !menuBackgroundRef.current) return;

    if (isMenuOpen) {
      // 메뉴 열기 애니메이션
      const tl = gsap.timeline();

      // 오버레이 표시
      gsap.set(menuOverlayRef.current, { display: 'flex' });

      // 배경 애니메이션 (원형으로 확장)
      tl.fromTo(
        menuBackgroundRef.current,
        { scale: 0, borderRadius: '50%' },
        {
          scale: 1,
          borderRadius: '0%',
          duration: 0.6,
          ease: 'power2.out',
        },
      );

      // 메뉴 아이템들 순차 등장
      const menuItems = menuItemsRef.current.children;
      tl.fromTo(
        Array.from(menuItems),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.2',
      );
    } else {
      // 메뉴 닫기 애니메이션
      const tl = gsap.timeline();

      // 메뉴 아이템들 사라지기
      const menuItems = menuItemsRef.current.children;
      tl.to(Array.from(menuItems), {
        y: -50,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      });

      // 배경 축소
      tl.to(
        menuBackgroundRef.current,
        {
          scale: 0,
          borderRadius: '50%',
          duration: 0.4,
          ease: 'power2.in',
        },
        '-=0.1',
      );

      // 오버레이 숨기기
      tl.set(menuOverlayRef.current, { display: 'none' });
    }
  }, [isMenuOpen]);

  const menuItems = [
    {
      label: currentLanguage === 'ko' ? '홈' : 'HOME',
      action: () => {
        window.location.href = '/';
        closeMenu();
      },
    },
    {
      label: currentLanguage === 'ko' ? '작업' : 'WORK',
      action: () => scrollToSection('featured-work'),
    },
    {
      label: currentLanguage === 'ko' ? '아티클' : 'ARTICLES',
      action: () => {
        window.location.href = '/articles';
        closeMenu();
      },
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center transition-all duration-300">
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
            onClick={toggleMenu}
            className="bg-gradient-to-r from-pink-300 to-orange-300 border-none text-white hover:text-black"
            flairColor="bg-orange-500">
            {isMenuOpen ? (currentLanguage === 'ko' ? 'MENU' : 'CLOSE') : 'MENU'}
          </FlairButton>
        </div>
      </header>

      {/* 풀스크린 메뉴 오버레이 */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-100 items-center justify-center hidden "
        style={{ display: 'none' }}>
        {/* 메뉴 배경 */}
        <div
          ref={menuBackgroundRef}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
          style={{ transformOrigin: 'center center' }}
        />

        {/* 닫기 버튼 */}
        <button
          onClick={closeMenu}
          className="absolute top-8 right-8 text-white hover:text-orange-400 transition-colors duration-300 z-10">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 메뉴 아이템들 */}
        <div ref={menuItemsRef} className="relative z-10 text-center space-y-8">
          {menuItems.map((item, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={item.action}
                className="group block text-white text-6xl md:text-8xl font-black leading-none tracking-tight hover:text-transparent bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-400 transition-all duration-500 transform hover:scale-110">
                <span className="z-50 inline-block transition-transform duration-300 group-hover:translate-y-[-10px]">
                  {item.label}
                </span>
              </button>

              {/* 언더라인 애니메이션 */}
              <div
                className="h-1 bg-gradient-to-r from-orange-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mx-auto mt-4"
                style={{ width: '200px' }}
              />
            </div>
          ))}

          {/* 장식 요소 */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
          <div
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* 언어 토글 버튼 (메뉴 내부) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={onLanguageToggle}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300">
            {currentLanguage === 'en' ? '한국어로 보기' : 'View in English'}
          </button>
        </div>
      </div>
    </>
  );
}
