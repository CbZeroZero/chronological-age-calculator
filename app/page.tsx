'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [ageMonth, setAgeMonth] = useState<number>(new Date().getMonth() + 1);
  const [ageDay, setAgeDay] = useState<number>(new Date().getDate());
  const [ageYear, setAgeYear] = useState<number>(new Date().getFullYear());
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

  const handleBirthDateChange = () => {
    setAge(null);
    setShowResult(false);
  };

  const handleAgeDateChange = () => {
    setAge(null);
    setShowResult(false);
  };

  const calculateAge = () => {
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const ageDate = new Date(ageYear, ageMonth - 1, ageDay);

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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
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
          <div className="mb-4 flex justify-between">
            <div className="w-1/3 mr-2">
              <label htmlFor="birthMonth" className="block text-gray-700 font-bold mb-2">
                Month
              </label>
              <select
                id="birthMonth"
                value={birthMonth}
                onChange={(e) => {
                  setBirthMonth(parseInt(e.target.value));
                  handleBirthDateChange();
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3 mr-2">
              <label htmlFor="birthDay" className="block text-gray-700 font-bold mb-2">
                Day
              </label>
              <select
                id="birthDay"
                value={birthDay}
                onChange={(e) => {
                  setBirthDay(parseInt(e.target.value));
                  handleBirthDateChange();
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {Array.from({ length: getDaysInMonth(birthYear, birthMonth) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <label htmlFor="birthYear" className="block text-gray-700 font-bold mb-2">
                Year
              </label>
              <input
                type="number"
                id="birthYear"
                value={birthYear}
                onChange={(e) => {
                  setBirthYear(parseInt(e.target.value));
                  handleBirthDateChange();
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-6 flex justify-between">
            <div className="w-1/3 mr-2">
              <label htmlFor="ageMonth" className="block text-gray-700 font-bold mb-2">
                Month
              </label>
              <select
                id="ageMonth"
                value={ageMonth}
                onChange={(e) => {
                  setAgeMonth(parseInt(e.target.value));
                  handleAgeDateChange();
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3 mr-2">
              <label htmlFor="ageDay" className="block text-gray-700 font-bold mb-2">
                Day
              </label>
              <select
                id="ageDay"
                value={ageDay}
                onChange={(e) => {
                  setAgeDay(parseInt(e.target.value));
                  handleAgeDateChange();
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {Array.from({ length: getDaysInMonth(ageYear, ageMonth) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <label htmlFor="ageYear" className="block text-gray-700 font-bold mb-2">
                Year
              </label>
              <input
                type="number"
                id="ageYear"
                value={ageYear}
                onChange={(e) => {
                  setAgeYear(parseInt(e.target.value));
                  handleAgeDateChange();
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
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
              <div className="text-left font-bold">Months & Days:</div>
              <div className="text-right">
                {age.months} months, {age.days} days
              </div>
              <div className="text-left font-bold">Weeks & Days:</div>
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
