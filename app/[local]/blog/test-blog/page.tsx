'use client';

import TableOfContents from '@/components/TableOfContents';
import BlogContent from '@/components/BlogContent';


const Home = () => {
    return (
        <div className='w-full flex justify-center bg-emerald-50'>
            <div className='w-[90%] md:w-[80] lg:w-[75%] xl:w-[70%] 2xl:w-[60%]'>
                <h1 className='text-4xl text-emerald-800 font-bold p-4 pl-8'>This is Title H1</h1>
                <div className="mx-auto p-4 flex flex-col xl:flex-row">
                    <TableOfContents />
                    <main id="blog-content" className="w-full xl:flex-grow p-4 text-emerald-800 overflow-y-auto">
                        <BlogContent />
                    </main>
                </div>
                <div>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                    <p>Other Content</p>
                </div>
            </div>
        </div>
    );
};

export default Home;

