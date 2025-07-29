import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface CareerItem {
  period: string;
  title: string;
  company?: string;
  type: 'work' | 'activity';
}

const CareerTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const careerData: CareerItem[] = [
    {
      period: '2024.02 ~ 2024.08',
      title: '구름톤 유니브 2기',
      company: '가천대 대표',
      type: 'activity',
    },
    {
      period: '2024.02 ~ 2024.05',
      title: '만화카페 도서 검색대',
      company: '브릭툰 외주',
      type: 'work',
    },
    {
      period: '2022.04 ~ 2022.10',
      title: '굿샷 골프 잔여티 예약 서비스',
      company: 'KS C&C 김프로',
      type: 'work',
    },
    {
      period: '2024',
      title: 'SOPT 33rd Web 파트',
      company: '수료',
      type: 'activity',
    },
    {
      period: '2023',
      title: 'UMC 4th Web 파트',
      company: '수료',
      type: 'activity',
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Timeline line grows from top to bottom
      tl.fromTo('.timeline-line', { height: 0 }, { height: '100%', duration: 1.2, ease: 'power2.out' });

      // Items appear with stagger
      tl.fromTo(
        '.timeline-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.8',
      );

      // Dots pop in
      tl.fromTo(
        '.timeline-dot',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.3,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=1',
      );
    },
    { scope: containerRef },
  );

  return (
    <div className="max-w-2xl mx-auto p-6" ref={containerRef}>
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="timeline-line absolute left-6 top-0 w-0.5 bg-gray-300"></div>

        {careerData.map((item, index) => (
          <div key={index} className="timeline-item relative flex items-start mb-8 last:mb-0">
            {/* Dot */}
            <div
              className={`timeline-dot relative z-10 w-3 h-3 rounded-full border-2 bg-white flex-shrink-0 ${
                item.type === 'work' ? 'border-blue-500' : 'border-green-500'
              }`}></div>

            {/* Content */}
            <div className="ml-6 pb-2">
              <div className={`text-sm font-medium mb-1 ${item.type === 'work' ? 'text-blue-600' : 'text-green-600'}`}>
                {item.period}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>

              {item.company && <p className="text-gray-600 text-sm">{item.company}</p>}

              <div
                className={`inline-block text-xs font-medium mt-2 px-2 py-1 rounded-full ${
                  item.type === 'work' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                }`}>
                {item.type === 'work' ? '경력' : '활동'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerTimeline;
