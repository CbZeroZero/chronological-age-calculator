import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ButtonProps {
    text: string;
}

export default function JumpCalculatePageButton({ text }: ButtonProps) {

    return <div className='flex justify-center w-full'>
        <Button
            className='my-4'
            variant="emerald"
        >
            <Link href={"/"} >{text}</Link>
        </Button>
    </div>
};

