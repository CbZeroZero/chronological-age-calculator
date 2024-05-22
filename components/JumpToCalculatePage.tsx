'use client';

import { useRouter } from '@/navigation';

interface ButtonProps {
    text: string;
}

export default function JumpCalculatePageButton({ text }: ButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    };

    return <button onClick={handleClick}>{text}</button>;
};

