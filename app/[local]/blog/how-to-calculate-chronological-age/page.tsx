import TableOfContents from '@/components/TableOfContents';

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
                            {/* <p className="font-serif">
                                Calculating chronological age is essential in fields like healthcare and education.
                                Chronological age is the time elapsed since a person&#x27;s
                                birth, measured in years, months, and days. we&#x27;ll explains what chronological age is,
                                how to calculate it accurately, and the differences between precise and estimated calculations.
                                Additionally, we&#x27;ll discuss how to express age in months, weeks, and days.
                            </p> */}
                            <h2 id="section-1" className='text-xl font-bold'>What is Chronological Age?</h2>
                            <p className="pt-3 font-serif">Chronological age is simply the number of years, months, and days that have passed since a person’s birth. It is commonly used to determine eligibility for services, developmental assessments, and demographic studies.</p>
                            <h2 id="section-2" className='text-xl font-bold pt-8'>Expressing Chronological Age in Years and months</h2>
                            <p className="pt-3 font-serif">To accurately calculate chronological age, you need the exact birth date and the current date. The steps are:</p>
                            <p className="pt-3 font-serif pl-4">1. Subtract the birth year from the current year.</p>
                            <p className="pt-3 font-serif pl-4">2. Subtract the birth month from the current month.</p>
                            <p className="pt-3 font-serif pl-4">3. Subtract the birth day from the current day.</p>
                            <p className="pt-3 font-serif">If the current month or day is earlier than the birth month or day, adjustments are made by borrowing months and days, considering the actual number of days in each month.</p>
                            <p className="pt-3 font-serif">For Example, Birth date is May 15, 2000, And urrent date is June 5, 2024</p>
                            <p className="pt-3 font-serif pl-4">Year difference: 2024 - 2000 = 24 years</p>
                            <p className="pt-3 font-serif pl-4">Month difference: June - May = 1 month</p>
                            <p className="pt-3 font-serif pl-4">Current day is earlier than the birth day, So Day difference: (5 + 31) - 15 = 21 days</p>
                            <p className="pt-3 font-serif">Thus, the chronological age is 24 years, and 21 days.</p>
                            <h2 id="section-3" className='text-xl font-bold pt-8'>Expressing Chronological Age in Days</h2>
                            <p className="pt-3 font-serif">Calculating one's chronological age in days may seem simple, but to pinpoint the exact number of days requires more meticulous contemplation. Allow me to break down this calculation process step by step:</p>
                            <p className="pt-3 font-serif pl-4">1. Identify the birth year and the current year. In this case, the birth year is 2000, and the current year is 2024.</p>
                            <p className="pt-3 font-serif pl-4">2. Calculate the number of complete years between the birth year and the current year. 2024 minus 2000 yields 23 years.</p>
                            <p className="pt-3 font-serif pl-4">3. Determine the number of days in these 23 years, accounting for leap years and non-leap years. 2004, 2008, 2012, 2016, and 2020 were leap years, each contributing 366 days, totaling 1,830 days. The remaining 18 non-leap years, each with 365 days, amount to 6,570 days. Adding these together, the total number of days in the 23 years is 8,400 days.</p>
                            <p className="pt-3 font-serif pl-4">4. Calculate the number of days that have elapsed in the current year (2024). From January 1st to June 5th, there have been 156 days.</p>
                            <p className="pt-3 font-serif pl-4">5. Calculate the remaining days in the birth year (2000). Since 2000 was a leap year, the period from May 15th (the birth date) to the end of the year accounts for 231 days.</p>
                            <p className="pt-3 font-serif pl-4">6. Add the three components together to obtain the final tally: 8,400 + 156 + 231 = 8,787 days.</p>
                            <p className="pt-3 font-serif">Therefore, from the day of birth on May 15, 2000, until June 5, 2024, this person has lived through 8,787 days on this earth.</p>
                        </div >
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Home;

