'use client';

import React from 'react';
import { ThumbsUp, Lock, Award, Star } from 'lucide-react';

/**
 * Benefits Section Component
 * 
 * Displays key benefits/features of the store:
 * - Positive Feedback
 * - Payment Security
 * - Guaranteed Parts Support
 * - Only Best Brands
 */

const Benefits = () => {
  const benefits = [
    {
      icon: ThumbsUp,
      title: '99% POSITIVE',
      subtitle: 'FEEDBACKS',
    },
    {
      icon: Lock,
      title: 'PAYMENT',
      subtitle: 'SECURE SYSTEM',
    },
    {
      icon: Award,
      title: 'GUARANTEED',
      subtitle: 'PARTS SUPPORT',
    },
    {
      icon: Star,
      title: 'ONLY BEST',
      subtitle: 'BRANDS',
    },
  ];

  return (
    <section className="w-full bg-(--accent-main) py-26 px-4 md:px-6 lg:px-12 border-b border-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-500">We Offer These Benefits</h2>
          <div className="w-60 h-1 mx-auto rounded-full bg-gray-500" />
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-4 p-4 md:p-6"
                
              >
                {/* Icon */}
                <div className="flex-shrink-0 min-w-14">
                  <IconComponent
                    size={48}
                    strokeWidth={1.5}
                    className="text-gray-400"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 text-center">
                  <p className="text-base md:text-lg font-semibold text-gray-500">
                    {benefit.title}
                  </p>
                  <p className="text-base md:text-lg font-semibold text-gray-500">
                    {benefit.subtitle}
                  </p>

                  <div className="w-40 mt-5 h-1 mx-auto rounded-full bg-gray-400"/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
