import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItemMedico = ({ href, children }) => {
    return (
        <li className="relative group">
            <NavLink
                to={href}
                end={href === '/medico/'}
                className={({ isActive}) =>`font-['Outfit'] font-semibold upp block py-2 px-4 text-lg relative transition-all duration-500 ease-in-out
            ${isActive ? 'text-[#62b1b1]' : 'text-black group-hover:text-[#62b1b1]'}
          `
    }
            >
            {({ isActive }) => (
                <>
                {children}
               <span
              className={`
                absolute left-0 bottom-0 w-full h-[3px] bg-[#62b1b1]
                transition-transform duration-300 ease-in-out origin-left
                ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                        `}
                    />
                </>
            )}
        </NavLink>
    </li>
  );
};

export default NavItemMedico;
