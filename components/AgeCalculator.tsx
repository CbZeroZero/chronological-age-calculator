'use client';

import React, { useState, useRef, useEffect } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


export default function AgeCalculator() {
    const resultDivRef = useRef<HTMLDivElement>(null);
    const [birthMonth, setBirthMonth] = useState<number>(1);
    const [birthDay, setBirthDay] = useState<number>(1);
    const [birthYear, setBirthYear] = useState<number>(2000);
    const [ageMonth, setAgeMonth] = useState<number>(new Date().getMonth() + 1);
    const [ageDay, setAgeDay] = useState<number>(new Date().getDate());
    const [ageYear, setAgeYear] = useState<number>(new Date().getFullYear());
    const [showResult, setShowResult] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [age, setAge] = useState<{
        years: number;
        months: number;
        days: number;
        totalMonths: number,
        remainingDaysAfterMonths: number,
        totalWeeks: number;
        remainingDaysAfterWeeks: number;
        totalDays: number;
        daysToNextBirthday: number;
    } | null>(null);
    const [ageString, setAgeString] = useState<string>('');

    const onBirthMonthChange = (value: string) => {
        setBirthMonth(parseInt(value));
        handleDateChange(undefined, parseInt(value));
    }

    const onBirthDayChange = (value: string) => {
        setBirthDay(parseInt(value));
        handleDateChange(parseInt(value));
    }

    const onBirthYearChange = (value: string) => {
        const year = parseInt(value);
        setBirthYear(year);
        if (value === '') {
            setHasError(true);
        } else {
            handleDateChange(undefined, undefined, year);
        }
    }

    const onAgeDayChange = (value: string) => {
        setAgeDay(parseInt(value));
        handleDateChange(undefined, undefined, undefined, parseInt(value));
    }

    const onAgeMonthChange = (value: string) => {
        setAgeMonth(parseInt(value));
        handleDateChange(undefined, undefined, undefined, undefined, parseInt(value));
    }

    const onSetBirthToday = () => {
        const today = new Date();
        setBirthMonth(today.getMonth() + 1);
        setBirthDay(today.getDate());
        setBirthYear(today.getFullYear());
        handleDateChange(today.getDate(), today.getMonth() + 1, today.getFullYear());
    }

    const onSetAgeToday = () => {
        const today = new Date();
        setAgeMonth(today.getMonth() + 1);
        setAgeDay(today.getDate());
        setAgeYear(today.getFullYear());
        handleDateChange(undefined, undefined, undefined, today.getDate(), today.getMonth() + 1, today.getFullYear());
    }

    const onAgeYearChange = (value: string) => {
        const year = parseInt(value);
        setAgeYear(year);
        if (value === '') {
            setHasError(true);
        } else {
            handleDateChange(undefined, undefined, undefined, undefined, undefined, year);
        }
    }

    const handleDateChange = (
        inputBirthDay?: number,
        inputBirthMonth?: number,
        inputBirthYear?: number,
        inputAgeDay?: number,
        inputAgeMonth?: number,
        inputAgeYear?: number) => {

        const usedBirthDay = inputBirthDay || birthDay;
        const usedBirthMonth = inputBirthMonth || birthMonth;
        const usedBirthYear = inputBirthYear || birthYear;
        const usedAgeDay = inputAgeDay || ageDay;
        const usedAgeMonth = inputAgeMonth || ageMonth;
        const usedAgeYear = inputAgeYear || ageYear;
        if (usedBirthYear > usedAgeYear) {
            setHasError(true);
        } else if (usedBirthYear === usedAgeYear && usedBirthMonth > usedAgeMonth) {
            setHasError(true);
        } else if (usedBirthYear === usedAgeYear && usedBirthMonth === usedAgeMonth && usedBirthDay > usedAgeDay) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    };

    const calculateAge = () => {
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
        const ageDate = new Date(ageYear, ageMonth - 1, ageDay);
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        let years = ageDate.getFullYear() - birthDate.getFullYear();
        let months = ageDate.getMonth() - birthDate.getMonth();
        let days = ageDate.getDate() - birthDate.getDate();

        // Adjust months and years if necessary
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        // Adjust days and months if necessary
        if (days < 0) {
            const lastMonth = new Date(ageDate.getFullYear(), ageDate.getMonth(), 0);
            days += lastMonth.getDate();
            months--;
        }

        // Calculate total days between birthDate and ageDate
        const totalDays = Math.floor((ageDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

        // Calculate weeks and remaining days
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDaysAfterWeeks = totalDays % 7;

        // Calculate days to next birthday
        let nextBirthdayYear = ageDate.getFullYear();
        if (ageDate >= new Date(ageDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
            nextBirthdayYear += 1;
        }
        const nextBirthday = new Date(nextBirthdayYear, birthDate.getMonth(), birthDate.getDate());
        const daysToNextBirthday = Math.floor((nextBirthday.getTime() - ageDate.getTime()) / (1000 * 60 * 60 * 24));

        // Calculate total months and remaining days
        const totalMonths = years * 12 + months;
        const remainingDaysAfterMonths = days;

        // Set state or handle results
        setAge({
            years,
            months,
            days,
            totalMonths,
            remainingDaysAfterMonths,
            totalWeeks,
            remainingDaysAfterWeeks,
            totalDays,
            daysToNextBirthday,
        });

        setAgeString(getAgeString(years, months, days, ageDate < startOfToday));
        setShowResult(true);
    };

    useEffect(() => {
        if (showResult && age && resultDivRef.current) {
            resultDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [showResult, age]);

    const getDaysInMonth = (year: number, month: number) => {
        if (year === undefined) {
            year = new Date().getFullYear();
        }
        return new Date(year, month, 0).getDate();
    };

    const getAgeString = (years: number, months: number, days: number, isAgeInPast: boolean) => {
        const yearsSuffix = years > 1 ? 'years' : 'year';
        const monthsSuffix = months > 1 ? 'months' : 'month';
        const daysSuffix = days > 1 ? 'days' : 'day';

        const prefix = isAgeInPast ? 'You were' : 'You are';

        let result = prefix;

        if (years > 0) {
            result += ` ${years} ${yearsSuffix}`;
        }

        if (months > 0) {
            if (years > 0) {
                result += ',';
            }
            result += ` ${months} ${monthsSuffix}`;
        }

        if (days > 0) {
            if (years > 0 && months > 0) {
                result += ` and ${days} ${daysSuffix}`;
            } else if (years > 0 || months > 0) {
                result += `, ${days} ${daysSuffix}`;
            } else {
                result += ` ${days} ${daysSuffix}`;
            }
        }

        if (result === prefix) {
            return `${prefix} 0 year old`;
        } else {
            return result + ' old';
        }
    };

    const formatMonths = (months: number) => {
        return months <= 1 ? 'month' : 'months';
    };

    const formatDays = (days: number) => {
        return days <= 1 ? 'day' : 'days';
    };

    const formatWeeks = (weeks: number) => {
        return weeks <= 1 ? 'week' : 'weeks';
    };

    return (
        /**
         * 西班牙语：Calculadora de Edad Cronológica
         * 葡萄牙语：Calculadora de Idade Cronológica
         * 日语：年齢計算機 
         * 德语：Chronologischer Altersrechner
         * 法语
         * 意大利
         * 旁遮普语：ਕ੍ਰਮਿਕ ਉਮਰ ਕੈਲਕੁਲੇਟਰ
         * 韩语：연령 계산기
         * 
         * 年龄计算器也可以有页面，多语言竞争低
         * 
         * What is chronological age?
         * How to calculate chronological age
         * biological age vs chronological age
         * bone age vs chronological age
         * mental age and chronological age
         * chronological age meaning
         */

        <>
            <div className="bg-emerald-100 flex flex-col items-center w-full flex-1 pt-10 text-center rounded-lg">
                <div className="bg-emerald-200 rounded-lg shadow-lg max-w-md w-full mb-8">
                    <label htmlFor="birthMonth" className="block text-emerald-900 font-bold mb-2 text-left px-8 pt-8">
                        Date Of Birth
                    </label>

                    <div className="flex justify-between px-8">
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
                                    <div className='grid grid-cols-3'>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <SelectItem key={i + 1} value={(i + 1).toString()}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</SelectItem>
                                        ))}
                                    </div>
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
                                    <div className='grid grid-cols-5'>
                                        {Array.from({ length: getDaysInMonth(birthYear, birthMonth) }, (_, i) => (
                                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                {i + 1}
                                            </SelectItem>
                                        ))}
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/3">
                            <Input
                                type="number"
                                id="birthYear"
                                value={birthYear}
                                onChange={(e) => {
                                    onBirthYearChange(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-end pr-4'>
                        <Button variant="link" className='text-emerald-600 pt-0 m-0'
                            onClick={onSetBirthToday}
                        >
                            Today
                        </Button>
                    </div>

                    <div className='bg-emerald-300 pt-2 pb-2'>
                        <label htmlFor="birthMonth" className="block text-emerald-900 font-bold mb-2 text-left px-8">
                            Age on This Date
                        </label>
                        <div className="flex justify-between px-8">
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
                                        <div className='grid grid-cols-3'>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                                </SelectItem>
                                            ))}
                                        </div>
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
                                        <div className='grid grid-cols-5'>
                                            {Array.from({ length: getDaysInMonth(ageYear, ageMonth) }, (_, i) => (
                                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                    {i + 1}
                                                </SelectItem>
                                            ))}
                                        </div>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-1/3">
                                <Input
                                    type="number"
                                    id="ageYear"
                                    min={1}
                                    max={9999}
                                    value={ageYear}
                                    onChange={(e) => {
                                        onAgeYearChange(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='w-full flex justify-end pr-4'>
                            <Button variant="link" className='text-emerald-600 pt-0 m-0'
                                onClick={onSetAgeToday}>
                                Today
                            </Button>
                        </div>

                    </div>
                    {
                        hasError &&
                        <p className='text-xs text-red-600 text-right mr-8 mt-1'>Date of Birth cannot be after the Age on This Date</p>
                    }
                    <div className='flex justify-end w-full'>
                        <Button
                            onClick={calculateAge}
                            className='my-4 mr-8'
                            variant="emerald"
                            disabled={hasError}
                        >
                            Calculate
                        </Button>
                    </div>
                </div>
            </div>
            {showResult && age && (
                <>
                    <h2 className="text-emerald-900	text-2xl font-bold mb-2 mt-12">Your Age</h2>
                    <div className="bg-emerald-100 flex flex-col items-center w-full flex-1 py-8 text-center rounded-lg"
                        ref={resultDivRef}
                    >
                        <div className="bg-emerald-200 rounded-lg shadow-lg p-8 max-w-md w-full">
                            <div className="bg-emerald-300 p-2 rounded-xl border border-stone-50">
                                <p className='text-emerald-900 font-bold text-base text-left font-bold'>
                                    {ageString}
                                </p>
                            </div>

                            <div className="grid grid-cols-2">
                                <div className="flex items-center text-emerald-900 text-sm text-left font-bold bg-emerald-300 p-2 rounded-l-xl border border-stone-50">Months & Days:</div>
                                <div className="text-emerald-900 text-sm text-right bg-emerald-100 p-2 rounded-r-xl border border-stone-50">
                                    {age.totalMonths} {formatMonths(age.totalMonths)} and {age.remainingDaysAfterMonths} {formatDays(age.remainingDaysAfterMonths)}
                                </div>
                                <div className="flex items-center text-emerald-900 text-sm text-left font-bold bg-emerald-300 p-2 rounded-l-xl border border-stone-50">Weeks & Days:</div>
                                <div className="text-emerald-900 text-sm text-right bg-emerald-100 p-2 rounded-r-xl border border-stone-50">
                                    {age.totalWeeks} {formatWeeks(age.totalWeeks)} and {age.remainingDaysAfterWeeks} {formatDays(age.remainingDaysAfterWeeks)}
                                </div>
                                <div className="flex items-center text-emerald-900 text-sm text-left font-bold bg-emerald-300 p-2 rounded-l-xl border border-stone-50">Total Days:</div>
                                <div className="text-emerald-900 text-sm text-right bg-emerald-100 p-2 rounded-r-xl border border-stone-50">{age.totalDays} {formatDays(age.totalDays)}</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
