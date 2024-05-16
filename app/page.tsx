'use client';

import React, { useState } from 'react';
import Head from 'next/head';
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
    seconds: number;
    daysToNextBirthday: number;
  } | null>(null);

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
    <div className="flex flex-col items-center min-h-screen py-2 bg-emerald-50">
      <div className='w-[90%] sm:w-[70%] md:w-[65%] xl:w-[50%]'>
        <h1 className="text-3xl font-bold mb-6 text-left mt-20">Chronological Age Calculator</h1>
        <main className="bg-emerald-100 flex flex-col items-center w-full flex-1 pt-10 text-center rounded-lg">
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
            <Button
              onClick={calculateAge}
              className='my-4'
            >
              Calculate
            </Button>
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
    </div>
  );
};
