import React from 'react';
import AgeCalculator from '@/components/AgeCalculator';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2 bg-emerald-50">
      <div className='w-[90%] sm:w-[70%] md:w-[65%] xl:w-[50%]'>
        <h1 className="text-emerald-900	text-3xl font-bold mb-6 text-left mt-20">Chronological Age Calculator</h1>
        <AgeCalculator />
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>What is Chronological Age</h2>
        <p className='text-emerald-900 mt-2'> Chronological age means the age or time elapsed from the time a person is born until the time they are asked their age. It is the measure of age in years, months, and days that one commonly gives when asked their age.</p>
        <p className='text-emerald-900 mt-2'>While chronological age can’t be reversed, biological/epigenetic age can be.</p>
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>How to Calculate Chronological Age</h2>
        <p className='text-emerald-900 mt-2'>Chronological age is calculated by taking the difference between the day, month, and year of birth and the day, month, and year of when asked. It is calculated on most psychological tests based on the date the test was taken and the date of birth.</p>
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>Biological Age vs Chronological Age</h2>
        <p className='text-emerald-900 mt-2'>
          Chronological age is the number of years you've been alive, while biological age refers to how old your cells and tissues are based on physiological evidence.
        </p>
        <p className='text-emerald-900 mt-2'>
          If you're especially healthy and fit for your age, your biological age may well be lower than your chronological age. But if you're sedentary, chronically ill, or in poor physical condition, your biological age may be higher.
        </p>
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>Bone Age vs Chronological Age</h2>
        <p className='text-emerald-900 mt-2'>
          chronological age differs from bone age, chronological age is defined as the age in years between birth and the evaluation of a subject; bone age is defined by the age expressed in years that corresponds to the level of maturation of bones.
        </p>
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>Mental Age and Chronological Age</h2>
        <p className='text-emerald-900 mt-2'>Mental age is a concept related to intelligence. It looks at how a specific individual, at a specific age, performs intellectually, compared to average intellectual performance for that individual's actual chronological age.</p>
      </div>

    </div>
  );
};
