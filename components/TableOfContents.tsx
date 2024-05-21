import { useEffect, useState } from 'react';

interface Heading {
    id: string;
    text: string;
    subheadings: Subheading[];
}

interface Subheading {
    id: string;
    text: string;
}

const TableOfContents = () => {
    const [activeId, setActiveId] = useState('');
    const [isBottomAligned, setIsBottomAligned] = useState(false);
    const [headings, setHeadings] = useState<Heading[]>([]);

    useEffect(() => {
        const blogContent = document.getElementById('blog-content');
        if (blogContent) {
            const headingElements = blogContent.querySelectorAll('h1, h2');
            const headingsArray: Heading[] = [];
            let currentH1: Heading | null = null;

            headingElements.forEach((heading) => {
                const id = heading.id;
                const text = heading.textContent ?? '';

                if (heading.tagName === 'H1') {
                    currentH1 = { id, text, subheadings: [] };
                    headingsArray.push(currentH1);
                } else if (heading.tagName === 'H2' && currentH1) {
                    const subheading: Subheading = { id, text };
                    currentH1.subheadings.push(subheading);
                }
            });

            setHeadings(headingsArray);
        }
    }, []);

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
        <div id="toc" className={`xl:w-72 w-full p-4 ${isBottomAligned ? '' : 'xl:sticky xl:top-0 h-auto'}`}>
            <h2 className="text-lg font-bold mb-2">Table of Contents</h2>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id} className="mb-2">
                        <a href={`#${heading.id}`}
                            className="text-blue-500"
                            onClick={(e) => { e.preventDefault(); handleClick(`${heading.id}`); }}
                        >
                            {heading.text}
                        </a>
                        {heading.subheadings.length > 0 && (
                            <ul className="ml-4">
                                {heading.subheadings.map((subheading) => (
                                    <li key={subheading.id} className="mb-2">
                                        <a href={`#${subheading.id}`}
                                            className="text-blue-500"
                                            onClick={(e) => { e.preventDefault(); handleClick(`${subheading.id}`); }}
                                        >
                                            {subheading.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default TableOfContents;
