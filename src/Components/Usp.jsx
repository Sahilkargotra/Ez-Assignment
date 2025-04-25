import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function USPSection() {
  // USP data
  const usps = [
    {
      title: "Consistently High Quality",
      description: "Technology has brought us to the threshold of a variety of high-quality services. However, as a team of ex-consultants from top consulting firms, we have constantly found ways to exceed expectations through our commitment to excellence.",
      icon: "🏆"
    },
    {
      title: "Round the Clock Availability",
      description: "Oftentimes our new clients ask us how it is that our service experts are always available, no matter the time of day, day of the week, or season of the year. How do we fulfill our promise of 24/7 support for all your business needs.",
      icon: "🕒"
    },
    {
      title: "Faster than the Fastest",
      description: "Rome may not have been built in a day, but what about your presentation? What about the audio-visual content you promised your client for the next meeting? In a competitive market, speed is often the difference between success and failure.",
      icon: "⚡"
    },
    {
      title: "Information Security",
      description: "ISO 27001:2022 comes within the ISO 27000 family, which is dedicated to the standardization of Information Security Management Systems (ISMS). We implement these standards to ensure your data is always protected.",
      icon: "🔒"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Why Choose EZ Works</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - 10-20-30 Rule */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">The 10-20-30 Rule</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">10</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Ten Slides</h3>
                  <p className="text-gray-600">We believe in concise communication. Whether it's presentations or reports, we keep it focused and impactful. No unnecessary information - just what you need to make decisions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">20</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Twenty Minutes</h3>
                  <p className="text-gray-600">We respect your time. Our solutions are designed to be understood quickly and implemented effectively. Our process ensures you get maximum value in minimal time.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">30</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Thirty-Point Font</h3>
                  <p className="text-gray-600">Clarity is key. We ensure that our communication is always clear, visible, and easy to understand. No small print or hidden details - everything is transparent.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - USP Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {usps.map((usp, index) => (
              <USPCard key={index} usp={usp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// USP Card Component with Flip Animation
function USPCard({ usp }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="h-64 perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped(true)}
      onTouchEnd={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-all duration-500 ${isFlipped ? 'rotate-y-180' : ''}`} style={{transformStyle: 'preserve-3d'}}>
        {/* Front of Card */}
        <div 
          className="absolute w-full h-full bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center" 
          style={{backfaceVisibility: 'hidden'}}
        >
          <div className="text-5xl mb-4">{usp.icon}</div>
          <h3 className="text-xl font-bold text-gray-800">{usp.title}</h3>
        </div>
        
        {/* Back of Card */}
        <div 
          className="absolute w-full h-full bg-blue-600 text-white rounded-lg shadow-md p-6 flex flex-col" 
          style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}
        >
          <p className="text-sm mb-4 flex-grow overflow-y-auto">{usp.description}</p>
          <a href="#" className="text-white font-bold flex items-center justify-center mt-auto hover:underline">
            Read More <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}