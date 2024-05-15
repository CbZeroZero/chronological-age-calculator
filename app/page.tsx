'use client';

import React, { useState } from 'react';
import Head from 'next/head';


export default function Home() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [ageDate, setAgeDate] = useState<Date>(new Date());
  const [showResult, setShowResult] = useState<boolean>(false);
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    weeks: number;
    totalDays: number;
    seconds: number;
    daysToNextBirthday: number;
  } | null>(null);

  const handleBirthDateChange = (date: Date | null) => {
    setBirthDate(date);
    setAge(null);
    setShowResult(false);
  };

  const handleAgeDateChange = (date: Date) => {
    setAgeDate(date);
    setAge(null);
    setShowResult(false);
  };

  const calculateAge = () => {
    if (!birthDate) return;

    const today = ageDate;
    const birthDateCopy = new Date(birthDate.getTime());

    let years = today.getFullYear() - birthDateCopy.getFullYear();
    let months = today.getMonth() - birthDateCopy.getMonth();
    let days = today.getDate() - birthDateCopy.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    const weeks = Math.floor((years * 365.25 + months * 30.44 + days) / 7);
    const totalDays = years * 365 + months * 30 + days;
    const seconds = totalDays * 24 * 60 * 60;

    const nextBirthday = new Date(
      today.getFullYear(),
      birthDateCopy.getMonth(),
      birthDateCopy.getDate() + 1
    );
    const daysToNextBirthday =
      Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) || 365;

    setAge({
      years,
      months,
      days,
      weeks,
      totalDays,
      seconds,
      daysToNextBirthday,
    });
    setShowResult(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>Chronological Age Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mb-8">
          <h1 className="text-3xl font-bold mb-6">Chronological Age Calculator</h1>
          <div className="mb-4">
            <label htmlFor="birthDate" className="block text-gray-700 font-bold mb-2">
              Date of Birth:
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate ? birthDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleBirthDateChange(e.target.value ? new Date(e.target.value) : null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="ageDate" className="block text-gray-700 font-bold mb-2">
              Age on This Date:
            </label>
            <input
              type="date"
              id="ageDate"
              value={ageDate.toISOString().split('T')[0]}
              onChange={(e) => handleAgeDateChange(new Date(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={calculateAge}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Calculate
          </button>
        </div>
        {showResult && age && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Result</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left font-bold">Years, Months, Days:</div>
              <div className="text-right">
                {age.years} years, {age.months} months, {age.days} days
              </div>
              <div className="text-left font-bold">Months &amp; Days:</div>
              <div className="text-right">
                {age.months} months, {age.days} days
              </div>
              <div className="text-left font-bold">Weeks &amp; Days:</div>
              <div className="text-right">
                {age.weeks} weeks, {age.days % 7} days
              </div>
              <div className="text-left font-bold">Total Days:</div>
              <div className="text-right">{age.totalDays} days</div>
              <div className="text-left font-bold">Total Seconds:</div>
              <div className="text-right">{age.seconds} seconds</div>
              <div className="text-left font-bold">Days to Next Birthday:</div>
              <div className="text-right">{age.daysToNextBirthday} days</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
