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
  const previousTouch = useRef<Touch | undefined>(undefined);

  // 초기 랜덤 위치 설정
  useEffect(() => {
    const baseX = window.innerWidth / 2;
    const baseY = window.innerHeight / 2;

    photoRefs.current.forEach((photo, index) => {
      if (!photo) return;

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
    });
  }, [photos.length]);

  const updateElementPosition = (element: HTMLDivElement, event: MouseEvent | TouchEvent) => {
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
  const startDrag = (element: HTMLDivElement, event: React.MouseEvent | React.TouchEvent, photoId: number) => {
    event.preventDefault();

    // ✅ 여기서 다시 선언하지 말고 위에 있는 previousTouch 사용만 하면 돼요

    const newZIndex = highestZIndex + 1;
    element.style.zIndex = `${Math.min(newZIndex, 49)}`; // zIndex 제한도 반영!
    setHighestZIndex(newZIndex);
    setDraggedPhoto(photoId);

    const updateFunction = (e: MouseEvent | TouchEvent) => updateElementPosition(element, e);
    const stopFunction = () => stopDrag(updateFunction, stopFunction);

    document.addEventListener('mousemove', updateFunction);
    document.addEventListener('touchmove', updateFunction, { passive: false });
    document.addEventListener('mouseup', stopFunction);
    document.addEventListener('touchend', stopFunction);
  };

  const stopDrag = (updateFunction: (e: MouseEvent | TouchEvent) => void, stopFunction: () => void) => {
    previousTouch.current = undefined;
    setDraggedPhoto(null);

    document.removeEventListener('mousemove', updateFunction);
    document.removeEventListener('touchmove', updateFunction);
    document.removeEventListener('mouseup', stopFunction);
    document.removeEventListener('touchend', stopFunction);
  };

  return (
    <div className="absolute w-full h-full">
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
          className={`absolute w-120 h-70 cursor-grab active:cursor-grabbing select-none transition-transform hover:scale-105 ${
            draggedPhoto === photo.id ? 'scale-110' : ''
          }`}
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: 'center center',
          }}
          onMouseDown={(e) => startDrag(photoRefs.current[index]!, e, photo.id)}
          onTouchStart={(e) => startDrag(photoRefs.current[index]!, e, photo.id)}>
          {/* 사진 프레임 */}
          <div className="w-full h-full bg-white p-3 rounded-lg shadow-xl border border-gray-200">
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover rounded" draggable={false} />

            {/* 사진 아래 여백 (폴라로이드 스타일) */}
            <div className="absolute bottom-3 left-3 right-3 h-8 bg-white flex items-center justify-center">
              <span className="text-xs text-gray-600 font-handwriting">{photo.alt}</span>
            </div>
          </div>

          {/* 그림자 효과 */}
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg transform translate-x-1 translate-y-1 -z-10"></div>
        </div>
      ))}
    </div>
  );
};

export default PhotoStack;
