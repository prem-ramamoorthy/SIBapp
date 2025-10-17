import * as Icons from "lucide-react";
import { NavLink } from 'react-router-dom';

function SidebarList({
  onclick, 
  name,
  icon,
  path = '/'
}) {
  const Icon = Icons[(icon || "").charAt(0).toUpperCase() + (icon || "").slice(1)] || Icons.Code;

  return (
    <li>
      <NavLink
        to={path}
        role="menuitem"
        onClick={onclick}
        className="
          flex w-full items-center gap-2 px-3 py-2 text-sm
          rounded-2xl
          text-gray-700 dark:text-gray-200
          hover:bg-amber-400 dark:hover:bg-amber-500/40
          transition-colors duration-200
        "
      >
        <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        <span>{name}</span>
      </NavLink>
    </li>
  );
}

export default SidebarList;
