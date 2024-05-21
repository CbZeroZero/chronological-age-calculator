// components/TableOfContents.js
import { useEffect, useState } from 'react';

const TableOfContents = () => {
    const [activeId, setActiveId] = useState('');
    const [isBottomAligned, setIsBottomAligned] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
        );

        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const toc = document.getElementById('toc');
            const blogContent = document.getElementById('blog-content');

            if (toc && blogContent) {
                const tocBottom = toc.getBoundingClientRect().bottom;
                const blogBottom = blogContent.getBoundingClientRect().bottom;
                const viewportHeight = window.innerHeight;

                if (tocBottom >= blogBottom) {
                    setIsBottomAligned(true);
                } else if (tocBottom <= viewportHeight) {
                    setIsBottomAligned(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="toc" className={`p-4 bg-white shadow  ${isBottomAligned ? '' : 'xl:sticky xl:top-0 h-auto'}`}>
            <h2 className="text-lg font-bold mb-2">Table of Contents</h2>
            <ul className="space-y-2">
                <li className={activeId === 'section-1' ? 'text-blue-500' : ''}>
                    <a href="#section-1" onClick={(e) => { e.preventDefault(); handleClick('section-1'); }}>Section 1</a>
                </li>
                <li className={activeId === 'section-2' ? 'text-blue-500' : ''}>
                    <a href="#section-2" onClick={(e) => { e.preventDefault(); handleClick('section-2'); }}>Section 2</a>
                </li>
                <li className={activeId === 'section-3' ? 'text-blue-500' : ''}>
                    <a href="#section-3" onClick={(e) => { e.preventDefault(); handleClick('section-3'); }}>Section 3</a>
                    <ul className="ml-4 space-y-1">
                        <li className={activeId === 'subsection-3-1' ? 'text-blue-500' : ''}>
                            <a href="#subsection-3-1" onClick={(e) => { e.preventDefault(); handleClick('subsection-3-1'); }}>Subsection 3.1</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default TableOfContents;
