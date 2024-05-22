import TableOfContents from '@/components/TableOfContents';
import JumpCalculatePageButton from '@/components/JumpToCalculatePage';

const Home = () => {
    return (
        <div className='w-full flex justify-center bg-emerald-50 min-h-screen'>
            <div className='w-[90%] md:w-[80] lg:w-[75%] xl:w-[70%] 2xl:w-[60%]'>
                <h1 id="title" className='text-4xl text-emerald-800 font-bold p-4 pl-8'>
                    How to Calculate Chronological Age
                </h1>
                <div className="mx-auto p-4 flex flex-col xl:flex-row">
                    <TableOfContents />
                    <main id="blog-content" className="w-full xl:flex-grow p-4 text-emerald-800 overflow-y-auto">
                        <div className="prose prose-lg max-w-none">
                            <h2 id="section-1" className='text-xl font-bold'>What is Chronological Age?</h2>
                            <p className="pt-3 font-serif">Chronological age is simply the number of years, months, and days that have passed since a person&#39;s birth. It is commonly used to determine eligibility for services, developmental assessments, and demographic studies.</p>
                            <h2 id="section-2" className='text-xl font-bold pt-8'>Expressing Chronological Age in Years and Months</h2>
                            <p className="pt-3 font-serif">To accurately calculate chronological age, you need the exact birth date and the current date. The steps are:</p>
                            <p className="pt-3 font-serif pl-4">1. Subtract the birth year from the current year.</p>
                            <p className="pt-3 font-serif pl-4">2. Subtract the birth month from the current month.</p>
                            <p className="pt-3 font-serif pl-4">3. Subtract the birth day from the current day.</p>
                            <p className="pt-3 font-serif">If the current month or day is earlier than the birth month or day, adjustments are made by borrowing months and days, considering the actual number of days in each month.</p>
                            <p className="pt-3 font-serif">For Example, Birth date is May 15, 2000, And current date is June 5, 2024</p>
                            <p className="pt-3 font-serif pl-4">Year difference: 2024 - 2000 = 24 years</p>
                            <p className="pt-3 font-serif pl-4">Month difference: June - May = 1 month</p>
                            <p className="pt-3 font-serif pl-4">Current day is earlier than the birth day, So Day difference: (5 + 31) - 15 = 21 days</p>
                            <p className="pt-3 font-serif">Thus, the chronological age is 24 years, and 21 days.</p>
                            <h2 id="section-3" className='text-xl font-bold pt-8'>Expressing Chronological Age in Days</h2>
                            <p className="pt-3 font-serif">Expressing chronological age in days may seem simple, but to pinpoint the exact number of days requires more meticulous contemplation. Let&#39;s break down this calculation process step by step:</p>
                            <p className="pt-3 font-serif pl-4">1. Identify the birth year and the current year.</p>
                            <p className="pt-3 font-serif pl-4">2. Calculate the number of complete years between the birth year and the current year by subtracting the birth year from the current year.</p>
                            <p className="pt-3 font-serif pl-4">3. Calculate the number of days in the complete years by:</p>
                            <p className="pt-3 font-serif pl-8">a. Counting the number of leap years (366 days) and non-leap years (365 days) in that period.</p>
                            <p className="pt-3 font-serif pl-8">b. Multiplying the number of leap years by 366 and the number of non-leap years by 365.</p>
                            <p className="pt-3 font-serif pl-8">c. Adding the two results together.</p>
                            <p className="pt-3 font-serif pl-4">4. Calculate the number of days elapsed in the current year up to the current date.</p>
                            <p className="pt-3 font-serif pl-4">5. Calculate the number of days remaining in the birth year after the birth date.</p>
                            <p className="pt-3 font-serif pl-4">6. Add the number of days from the three components (complete years, current year, and birth year) to get the total number of days.</p>
                            <p className="pt-3 font-serif">For example, if the birth date is May 15, 2000, and the current date is June 5, 2024, the calculation would be:</p>
                            <p className="pt-3 font-serif pl-4">1. Birth year: 2000, Current year: 2024</p>
                            <p className="pt-3 font-serif pl-4">2. 2024 - 2000 = 24 complete years</p>
                            <p className="pt-3 font-serif pl-4">3. In the 24 years, there were 5 leap years (2004, 2008, 2012, 2016, and 2020) and 19 non-leap years.
                                (5 x 366) + (19 x 365) = 8,400 days in the complete years.</p>
                            <p className="pt-3 font-serif pl-4">4. Days elapsed in 2024 up to June 5th: 156 days</p>
                            <p className="pt-3 font-serif pl-4">5. Days remaining in 2000 after May 15th: 231 days (2000 was a leap year)</p>
                            <p className="pt-3 font-serif pl-4">6. Total number of days: 8,400 + 156 + 231 = 8,787 days</p>
                            <p className="pt-3 font-serif">Therefore, from the day of birth on May 15, 2000, until June 5, 2024, this person has lived through 8,787 days on this earth.</p>
                            <h2 id="section-4" className='text-xl font-bold pt-8'>Try Our Convenient Online Age Calculator</h2>
                            <p className="pt-3 font-serif">While the steps above enable you to calculate your chronological age manually, I recommend trying our user-friendly online age calculator for a more convenient experience. Simply enter your birth date, and our tool will instantly provide your age in years, months, and days.</p>
                            <p className="pt-3 font-serif">Click the button below to give it a try and effortlessly determine your precise chronological age.</p>
                            <JumpCalculatePageButton text='Calculate My Age' />

                        </div >
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Home;

