'use client';

import { useRef, useState, useEffect } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const PhotoStack = () => {
  const [photos] = useState<Photo[]>([
    {
      id: 1,
      src: '/images/profile.png',
      alt: '한강에서 스윗 1주년 모임',
    },
    {
      id: 2,
      src: '/images/profile2.png',
      alt: 'SOPT 팀 스윗 최우수상 수상',
    },
    {
      id: 3,
      src: '/images/profile3.png',
      alt: '구름톤유니브 벚꽃톤 대상(카카오대표이사상) 수상',
    },
    {
      id: 4,
      src: '/images/profile4.png',
      alt: '세션 발표 준비를 하고 있는 유신이와 나',
    },
  ]);

  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [draggedPhoto, setDraggedPhoto] = useState<number | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(photos.length);
  const [isMobile, setIsMobile] = useState(false);

  // 데스크탑용 터치 레퍼런스
  const previousTouch = useRef<Touch | undefined>(undefined);

  // 모바일용 터치 레퍼런스
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 초기 랜덤 위치 설정
  useEffect(() => {
    const baseX = window.innerWidth / 2;
    const baseY = isMobile ? window.innerHeight * 0.1 : window.innerHeight / 2;

    photoRefs.current.forEach((photo, index) => {
      if (!photo) return;

      if (isMobile) {
        // 모바일에서는 가운데를 중심으로 약간 흩뿌리기
        const smallRange = 40; // 작은 범위로 흩뿌리기
        const randomX = Math.random() * (smallRange * 2) - smallRange;
        const randomY = Math.random() * (smallRange * 2) - smallRange;
        const randomRotate = Math.random() * 20 - 10; // 회전만 약간 랜덤

        photo.style.left = `${baseX + randomX}px`;
        photo.style.top = `${baseY + randomY}px`;
        photo.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
        photo.style.zIndex = `${photos.length - index}`;
      } else {
        // 데스크탑에서는 기존 로직 유지
        const range = 150;
        const randomX = Math.random() * (range * 2) - range;
        const randomY = Math.random() * (range * 2) - range;
        const randomRotate = Math.random() * 30 - 15;

        const posX = baseX + randomX;
        const posY = baseY + randomY;

        photo.style.left = `${posX}px`;
        photo.style.top = `${posY}px`;
        photo.style.transform = `translate(-150%, -200%) rotate(${randomRotate}deg)`;
        photo.style.zIndex = `${photos.length - index}`;
      }
    });
  }, [photos.length, isMobile]);

  // 데스크탑용 업데이트 함수 (기존 로직)
  const updateElementPositionDesktop = (element: HTMLDivElement, event: MouseEvent | TouchEvent) => {
    let movementX: number, movementY: number;

    if (event.type === 'touchmove') {
      const touch = (event as TouchEvent).touches[0];
      movementX = previousTouch.current ? touch.clientX - previousTouch.current.clientX : 0;
      movementY = previousTouch.current ? touch.clientY - previousTouch.current.clientY : 0;
      previousTouch.current = touch;
    } else {
      const mouseEvent = event as MouseEvent;
      movementX = mouseEvent.movementX;
      movementY = mouseEvent.movementY;
    }

    const currentTop = parseInt(element.style.top || '0');
    const currentLeft = parseInt(element.style.left || '0');

    const elementY = currentTop + movementY;
    const elementX = currentLeft + movementX;

    element.style.top = `${elementY}px`;
    element.style.left = `${elementX}px`;
  };

  // 모바일용 업데이트 함수
  const updateElementPositionMobile = (element: HTMLDivElement, clientX: number, clientY: number) => {
    if (!lastTouchRef.current) return;

    const deltaX = clientX - lastTouchRef.current.x;
    const deltaY = clientY - lastTouchRef.current.y;

    const currentLeft = parseInt(element.style.left || '0');
    const currentTop = parseInt(element.style.top || '0');

    element.style.left = `${currentLeft + deltaX}px`;
    element.style.top = `${currentTop + deltaY}px`;

    lastTouchRef.current = { x: clientX, y: clientY };
  };

  // 데스크탑용 드래그 시작 (기존 로직)
  const startDragDesktop = (element: HTMLDivElement, event: React.MouseEvent | React.TouchEvent, photoId: number) => {
    event.preventDefault();

    const newZIndex = highestZIndex + 1;
    element.style.zIndex = `${Math.min(newZIndex, 49)}`;
    setHighestZIndex(newZIndex);
    setDraggedPhoto(photoId);

    const updateFunction = (e: MouseEvent | TouchEvent) => updateElementPositionDesktop(element, e);
    const stopFunction = () => stopDragDesktop(updateFunction, stopFunction);

    document.addEventListener('mousemove', updateFunction);
    document.addEventListener('touchmove', updateFunction, { passive: false });
    document.addEventListener('mouseup', stopFunction);
    document.addEventListener('touchend', stopFunction);
  };

  const stopDragDesktop = (updateFunction: (e: MouseEvent | TouchEvent) => void, stopFunction: () => void) => {
    previousTouch.current = undefined;
    setDraggedPhoto(null);

    document.removeEventListener('mousemove', updateFunction);
    document.removeEventListener('touchmove', updateFunction);
    document.removeEventListener('mouseup', stopFunction);
    document.removeEventListener('touchend', stopFunction);
  };

  // 모바일용 드래그 시작
  const startDragMobile = (element: HTMLDivElement, event: React.MouseEvent | React.TouchEvent, photoId: number) => {
    event.preventDefault();
    event.stopPropagation();

    // 모바일에서 스크롤 방지
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const newZIndex = highestZIndex + 1;
    element.style.zIndex = `${Math.min(newZIndex, 49)}`;
    setHighestZIndex(newZIndex);
    setDraggedPhoto(photoId);

    let clientX: number, clientY: number;

    if ('touches' in event.nativeEvent) {
      const touch = event.nativeEvent.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;
    }

    touchStartRef.current = { x: clientX, y: clientY, time: Date.now() };
    lastTouchRef.current = { x: clientX, y: clientY };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      let moveX: number, moveY: number;

      if ('touches' in e) {
        const touch = e.touches[0];
        moveX = touch.clientX;
        moveY = touch.clientY;
      } else {
        moveX = e.clientX;
        moveY = e.clientY;
      }

      updateElementPositionMobile(element, moveX, moveY);
    };

    const handleEnd = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      // 스크롤 복원
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      setDraggedPhoto(null);
      touchStartRef.current = null;
      lastTouchRef.current = null;

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchcancel', handleEnd);
    };

    document.addEventListener('mousemove', handleMove, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleEnd, { passive: false });
    document.addEventListener('touchend', handleEnd, { passive: false });
    document.addEventListener('touchcancel', handleEnd, { passive: false });
  };

  // 상황에 맞는 드래그 함수 선택
  const startDrag = (element: HTMLDivElement, event: React.MouseEvent | React.TouchEvent, photoId: number) => {
    if (isMobile) {
      startDragMobile(element, event, photoId);
    } else {
      startDragDesktop(element, event, photoId);
    }
  };

  return (
    <div className="absolute w-full h-full" style={isMobile ? { touchAction: 'none' } : {}}>
      {/* 배경 텍스처 */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      {photos.map((photo, index) => (
        <div
          key={photo.id}
          ref={(el) => {
            photoRefs.current[index] = el;
          }}
          className={`absolute ${isMobile ? 'w-32 h-40' : 'w-120 h-70'} cursor-grab active:cursor-grabbing select-none transition-transform hover:scale-105 ${
            draggedPhoto === photo.id ? 'scale-110' : ''
          }`}
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: 'center center',
            willChange: isMobile ? 'transform' : undefined,
          }}
          onMouseDown={(e) => startDrag(photoRefs.current[index]!, e, photo.id)}
          onTouchStart={(e) => startDrag(photoRefs.current[index]!, e, photo.id)}>
          {/* 사진 프레임 */}
          <div
            className={`w-full h-full bg-white ${isMobile ? 'p-2' : 'p-3'} rounded-lg shadow-xl border border-gray-200`}>
            <img
              src={photo.src}
              alt={photo.alt}
              className={`w-full ${isMobile ? 'h-3/4' : 'h-full'} object-cover rounded`}
              draggable={false}
            />

            {/* 사진 아래 여백 (폴라로이드 스타일) */}
            <div
              className={`absolute ${isMobile ? 'bottom-2 left-2 right-2 h-6' : 'bottom-3 left-3 right-3 h-8'} bg-white flex items-center justify-center`}>
              <span className={`text-gray-600 ${isMobile ? 'text-[10px] leading-tight' : 'text-xs font-handwriting'}`}>
                {photo.alt}
              </span>
            </div>
          </div>

          {/* 그림자 효과 */}
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg transform translate-x-1 translate-y-1 -z-10"></div>

          {/* 모바일에서만 터치 피드백 링 표시 */}
          {isMobile && draggedPhoto === photo.id && (
            <div className="absolute inset-0 rounded-lg border-2 border-blue-400 animate-pulse -z-5"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoStack;
