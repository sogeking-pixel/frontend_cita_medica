function NavItem({ href, children, className = '' }) {
    return (
      <li>
        <a
          href={href}
          class={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
          aria-current="page"
        >
          {children}
        </a>
      </li>
    );
}
export default NavItem;