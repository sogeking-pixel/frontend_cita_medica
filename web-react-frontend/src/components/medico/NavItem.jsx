import React from 'react';

const NavItemMedico = ({ href, children }) => {
    return (
        <li>
            <a
                href={href}
                className="block py-2 px-4 hover:text-white text-lg hover:bg-gray-800"
            >
                {children}
            </a>
        </li>
    );
};

export default NavItemMedico;
