'use client';

import TableOfContents from '@/components/TableOfContents';
import BlogContent from '@/components/BlogContent';


const Home = () => {
    return (
        <>
            <div className='bg-emerald-50'>
                <h1 className='text-4xl text-emerald-800 font-bold'>This is Title H1</h1>
                <div className="bg-emerald-50 mx-auto p-4 flex flex-col xl:flex-row">
                    <TableOfContents />
                    <main id="blog-content" className="w-full xl:flex-grow p-4 text-emerald-800 pl-12 overflow-y-auto">
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
        </>
    );
};

export default Home;

