import React from 'react';
import type { Metadata } from 'next'
import Link from 'next/link';
import { siteUrl, generateLanguagesJson } from '@/config';
import AgeCalculator from '@/components/AgeCalculator';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('navbar');
  const tHome = await getTranslations('home');
  const currentLanguage = t('languageAbbr');
  const languageJson = generateLanguagesJson(currentLanguage);

  var canonicalUrl;
  if (currentLanguage === '') {
    canonicalUrl = siteUrl;
  } else {
    canonicalUrl = siteUrl + '/' + currentLanguage;
  }

  return {
    title: tHome('title'),
    description: tHome('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: languageJson.languages
    }
  }
}

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col items-center min-h-screen py-2 bg-emerald-50">
      <div className='w-[90%] sm:w-[70%] md:w-[65%] xl:w-[50%]'>
        <h1 className="text-emerald-900	text-3xl font-bold mb-6 text-left mt-20">{t('h1')}</h1>
        <AgeCalculator />
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>{t('h2')}</h2>
        <p className='text-emerald-900 mt-2'>{t('h2Des1')}</p>
        <p className='text-emerald-900 mt-2'>{t('h2Des2')}</p>
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>{t('h2-2')}</h2>
        <p className='text-emerald-900 mt-2'>{t('h2-2Des1')}&nbsp;
          <Link href="/blog/how-to-calculate-chronological-age" className="text-emerald-900 hover:text-emerald-950 underline">
            {t('seeMore')}&#62;&#62;
          </Link>
        </p>
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>{t('h2-3')}</h2>
        <p className='text-emerald-900 mt-2'>
          {t('h2-3Des1')}
        </p>
        <p className='text-emerald-900 mt-2'>
          {t('h2-3Des2')}
        </p>
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>{t('h2-4')}</h2>
        <p className='text-emerald-900 mt-2'>
          {t('h2-4Des1')}
        </p>
        <h2 className='text-emerald-900	text-2xl font-bold text-left mt-12'>{t('h2-5')}</h2>
        <p className='text-emerald-900 mt-2'>{t('h2-5Des1')}</p>
      </div>

    </div>
  );
};
