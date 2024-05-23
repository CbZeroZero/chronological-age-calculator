import TableOfContents from '@/components/TableOfContents';
import JumpCalculatePageButton from '@/components/JumpToCalculatePage';
import { siteUrl, generateLanguagesJson } from '@/config';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('navbar');
    const tHome = await getTranslations('howToCalculateChronoAge');
    const currentLanguage = t('languageAbbr');
    const languageJson = generateLanguagesJson(currentLanguage);

    var canonicalUrl;
    if (currentLanguage === '') {
        canonicalUrl = siteUrl + "/blog/how-to-calculate-chronological-age";
    } else {
        canonicalUrl = siteUrl + '/' + currentLanguage + "/blog/how-to-calculate-chronological-age";
    }

    return {
        title: tHome('howTo'),
        description: tHome('description'),
        alternates: {
            canonical: canonicalUrl,
            languages: languageJson.languages
        }
    }
}

const Home = () => {
    const t = useTranslations('howToCalculateChronoAge');

    return (
        <div className='w-full flex justify-center bg-emerald-50 min-h-screen'>
            <div className='w-[90%] md:w-[80] lg:w-[75%] xl:w-[70%] 2xl:w-[60%]'>
                <h1 id="title" className='text-4xl text-emerald-800 font-bold p-4 pl-8'>
                    {t('howTo')}
                </h1>
                <div className="mx-auto p-4 flex flex-col xl:flex-row">
                    <TableOfContents />
                    <main id="blog-content" className="w-full xl:flex-grow p-4 text-emerald-800 overflow-y-auto">
                        <div className="prose prose-lg max-w-none">
                            <h2 id="section-1" className='text-xl font-bold'>{t('whatIsAge')}</h2>
                            <p className="pt-3 font-serif">{t('whatIsAgeDes')}</p>
                            <p className="pt-3 font-serif">{t('whatIsAgeDes1')}</p>
                            <div className='pt-2'>
                                <JumpCalculatePageButton text={t('calculateAge')} />
                            </div>
                            <h2 id="section-2" className='text-xl font-bold pt-3'>{t('expressInYears')}</h2>
                            <p className="pt-3 font-serif">{t('expressInYearsDes')}</p>
                            <ul className="pl-8 list-decimal">
                                <li className="pt-3 font-serif">{t('expressInYearsDesStep1')}</li>
                                <li className="pt-3 font-serif">{t('expressInYearsDesStep2')}</li>
                                <li className="pt-3 font-serif">{t('expressInYearsDesStep3')}</li>
                            </ul>
                            <p className="pt-3 font-serif">{t('expressInYearsDes2')}</p>
                            <p className="pt-3 font-serif">{t('expressInYearsDes3')}</p>
                            <ul className="pl-8 list-disc">
                                <li className="pt-3 font-serif">{t('expressInYearsDes3Step1')}</li>
                                <li className="pt-3 font-serif">{t('expressInYearsDes3Step2')}</li>
                                <li className="pt-3 font-serif">{t('expressInYearsDes3Step3')}</li>
                            </ul>
                            <p className="pt-3 font-serif">{t('expressInYearsDes4')}</p>
                            <h2 id="section-3" className='text-xl font-bold pt-8'>{t('expressInDays')}</h2>
                            <p className="pt-3 font-serif">{t('expressInDaysDes')}</p>
                            <ul className="pl-8 list-decimal">
                                <li className="pt-3 font-serif">{t('expressInDaysDesStep1')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDesStep2')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDesStep3')}</li>
                                <ul className="pl-8 list-disc">
                                    <li className="pt-3 font-serif">{t('expressInDaysDesStep3_1')}</li>
                                    <li className="pt-3 font-serif">{t('expressInDaysDesStep3_2')}</li>
                                    <li className="pt-3 font-serif">{t('expressInDaysDesStep3_3')}</li>
                                </ul>
                                <li className="pt-3 font-serif">{t('expressInDaysDesStep4')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDesStep5')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDesStep6')}</li>
                            </ul>
                            <p className="pt-3 font-serif">{t('expressInDaysDes2')}</p>
                            <ul className="pl-8 list-decimal">
                                <li className="pt-3 font-serif">{t('expressInDaysDes2Step1')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDes2Step2')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDes2Step3')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDes2Step4')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDes2Step5')}</li>
                                <li className="pt-3 font-serif">{t('expressInDaysDes2Step6')}</li>
                            </ul>
                            <p className="pt-3 font-serif">{t('expressInDaysDes3')}</p>
                            <h2 id="section-4" className='text-xl font-bold pt-8'>{t('tryOurCalculator')}</h2>
                            <p className="pt-3 font-serif">{t('tryOurCalculatorDes')}</p>
                            <p className="pt-3 font-serif">{t('tryOurCalculatorDes1')}</p>
                            <JumpCalculatePageButton text={t('calculateMyAge')} />
                        </div >
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Home;

