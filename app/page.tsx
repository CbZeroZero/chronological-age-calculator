'use client';

import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


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
    daysToNextBirthday: number;
  } | null>(null);
  const [ageString, setAgeString] = useState<string>('');

  const onBirthMonthChange = (value: string) => {
    setBirthMonth(parseInt(value));
    handleBirthDateChange();
  }

  const onBirthDayChange = (value: string) => {
    setBirthDay(parseInt(value));
    handleBirthDateChange();
  }

  const onAgeDayChange = (value: string) => {
    setAgeDay(parseInt(value));
    handleAgeDateChange();
  }

  const onAgeMonthChange = (value: string) => {
    setAgeMonth(parseInt(value));
    handleAgeDateChange();
  }

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
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const birthDateCopy = new Date(birthDate.getTime());

    let years = ageDate.getFullYear() - birthDateCopy.getFullYear();
    let months = ageDate.getMonth() - birthDateCopy.getMonth();
    let days = ageDate.getDate() - birthDateCopy.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastMonth = new Date(ageDate.getFullYear(), ageDate.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    const weeks = Math.floor((years * 365.25 + months * 30.44 + days) / 7);
    const totalDays = years * 365 + months * 30 + days;

    const nextBirthday = new Date(
      ageDate.getFullYear(),
      birthDateCopy.getMonth(),
      birthDateCopy.getDate() + 1
    );
    if (nextBirthday <= ageDate) {
      nextBirthday.setFullYear(ageDate.getFullYear() + 1);
    }
    const daysToNextBirthday =
      Math.floor((nextBirthday.getTime() - ageDate.getTime()) / (1000 * 60 * 60 * 24)) || 365;

    setAge({
      years,
      months,
      days,
      weeks,
      totalDays,
      daysToNextBirthday,
    });
    setAgeString(getAgeString(years, months, days, ageDate < startOfToday));
    setShowResult(true);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getAgeString = (years: number, months: number, days: number, isAgeInPast: boolean) => {
    const yearsSuffix = years > 1 ? 'years' : 'year';
    const monthsSuffix = months > 1 ? 'months' : 'month';
    const daysSuffix = days > 1 ? 'days' : 'day';

    const prefix = isAgeInPast ? 'You were' : 'You are';

    const ageStringParts = [];

    if (years > 0) {
      ageStringParts.push(`${years} ${yearsSuffix}`);
    }

    if (months > 0) {
      ageStringParts.push(`${months} ${monthsSuffix}`);
    }

    if (days > 0) {
      if (years > 0 && months > 0) {
        ageStringParts.push(`and ${days} ${daysSuffix}`);
      } else {
        ageStringParts.push(`${days} ${daysSuffix}`);
      }
    }

    if (ageStringParts.length === 0) {
      return `${prefix} ${ageStringParts.join(', ')} 0 old`;
    } else {
      return `${prefix} ${ageStringParts.join(', ')} old`;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2 bg-emerald-50">
      <div className='w-[90%] sm:w-[70%] md:w-[65%] xl:w-[50%]'>
        <h1 className="text-emerald-900	text-3xl font-bold mb-6 text-left mt-20">Chronological Age Calculator</h1>
        <div className="bg-emerald-100 flex flex-col items-center w-full flex-1 pt-10 text-center rounded-lg">
          <div className="bg-emerald-200 rounded-lg shadow-lg max-w-md w-full mb-8">
            <label htmlFor="birthMonth" className="block text-gray-700 font-bold mb-2 text-left px-8 pt-8">
              Date Of Birth
            </label>
            <div className="mb-4 flex justify-between px-8">
              <div className="w-1/3 mr-2">
                <Select
                  value={birthMonth.toString()}
                  defaultValue={birthMonth.toString()}
                  onValueChange={onBirthMonthChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={birthMonth.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3 mr-2">
                <Select
                  value={birthDay.toString()}
                  defaultValue={birthDay.toString()}
                  onValueChange={onBirthDayChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={birthDay.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Input
                  type="number"
                  id="birthYear"
                  value={birthYear}
                  onChange={(e) => {
                    setBirthYear(parseInt(e.target.value));
                    handleBirthDateChange();
                  }}
                />
              </div>
            </div>
            <div className='bg-emerald-300 pt-2 pb-2'>
              <label htmlFor="birthMonth" className="block text-gray-700 font-bold mb-2 text-left px-8">
                Age on This Date
              </label>
              <div className="mb-6 flex justify-between px-8">
                <div className="w-1/3 mr-2">
                  <Select
                    value={ageMonth.toString()}
                    defaultValue={ageMonth.toString()}
                    onValueChange={onAgeMonthChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={ageMonth.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </div>
                <div className="w-1/3 mr-2">
                  <Select
                    value={ageDay.toString()}
                    defaultValue={ageDay.toString()}
                    onValueChange={onAgeDayChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={ageDay.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: getDaysInMonth(ageYear, ageMonth) }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/3">
                  <Input
                    type="number"
                    id="ageYear"
                    value={ageYear}
                    onChange={(e) => {
                      setAgeYear(parseInt(e.target.value));
                      handleAgeDateChange();
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-end w-full'>
              <Button
                onClick={calculateAge}
                className='my-4 mr-8'
                variant="emerald"
              >
                Calculate
              </Button>
            </div>
          </div>
        </div>
        {showResult && age && (
          <>
            <h2 className="text-emerald-900	text-2xl font-bold mb-6 mt-12">Your Age</h2>
            <div className="bg-emerald-100 flex flex-col items-center w-full flex-1 pt-10 text-center rounded-lg">
              <div className="bg-emerald-200 rounded-lg shadow-lg p-8 max-w-md w-full">
                <p className='text-emerald-800 text-base text-left pl-2 mb-2 font-medium'>
                  {ageString}
                </p>
                <div className="grid grid-cols-2">
                  <div className="text-gray-700 text-sm text-left font-bold bg-emerald-300 p-2 rounded-l-xl border border-stone-50">Months & Days:</div>
                  <div className="text-gray-700 text-sm text-right bg-emerald-100 p-2 rounded-r-xl border border-stone-50">
                    {age.months} months, {age.days} days
                  </div>
                  <div className="text-gray-700 text-sm text-left font-bold bg-emerald-300 p-2 rounded-l-xl border border-stone-50">Weeks & Days:</div>
                  <div className="text-gray-700 text-sm text-right bg-emerald-100 p-2 rounded-r-xl border border-stone-50">
                    {age.weeks} weeks, {age.days % 7} days
                  </div>
                  <div className="text-gray-700 text-sm text-left font-bold bg-emerald-300 p-2 rounded-l-xl border border-stone-50">Total Days:</div>
                  <div className="text-gray-700 text-sm text-right bg-emerald-100 p-2 rounded-r-xl border border-stone-50">{age.totalDays}</div>
                  <div className="text-gray-700 text-sm text-left font-bold bg-emerald-300 p-2 rounded-l-xl border border-stone-50">Days to Next Birthday:</div>
                  <div className="text-gray-700 text-sm text-right bg-emerald-100 p-2 rounded-r-xl border border-stone-50">{age.daysToNextBirthday}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
