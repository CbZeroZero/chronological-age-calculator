'use client';

import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/button';

interface ButtonProps {
    text: string;
}

export default function JumpCalculatePageButton({ text }: ButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    };

    return <div className='flex justify-center w-full'>
        <Button
            onClick={handleClick}
            className='my-4'
            variant="emerald"
        >
            {text}
        </Button>
    </div>
};

