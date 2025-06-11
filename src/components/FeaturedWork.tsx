import React from 'react';

const FeaturedWork: React.FC = () => {
  return (
    <section className="w-full bg-[#E8E9F1] py-24 px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16">
        <h2 className="text-5xl font-extrabold text-black mb-4">Featured Work</h2>
        <p className="text-lg font-semibold text-black leading-relaxed max-w-sm mb-12">
          I usually use React, Next also using Typescript using Typescriptusing Typescrip
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* 첫 번째 줄 */}
        <div className="bg-gray-300 h-96 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">
          Image 1 Placeholder
        </div>
        <div className="bg-gray-300 h-96 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">
          Image 2 Placeholder
        </div>
        {/* 두 번째 줄 */}
        <div className="bg-gray-300 h-96 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">
          Image 3 Placeholder
        </div>
        <div className="bg-gray-300 h-96 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">
          Image 4 Placeholder
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
