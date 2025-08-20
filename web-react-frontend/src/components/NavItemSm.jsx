function NavItemSm({ href, children, className = "" }) {
  return (
    <li>
      <a
        href={href}
        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
      >
        {children}
      </a>
    </li>
  );
}
export default NavItemSm;
