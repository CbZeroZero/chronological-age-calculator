// components/Sidebar.js
import TableOfContents from './TableOfContents';

const Sidebar = () => {
    return (
        <aside className="xl:w-64 w-full p-4 bg-gray-100">
            <TableOfContents />
        </aside>
    );
};

export default Sidebar;
