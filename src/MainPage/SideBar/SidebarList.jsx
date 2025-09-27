import * as Icons from "lucide-react";
import { NavLink } from 'react-router-dom';

function SidebarList({
    onclick , 
    name ,
    icon ,
    path = '/'
}) {

    const Icon = Icons[(icon || "").charAt(0).toUpperCase() + (icon || "").slice(1)] || Icons.Code;
    return (
        <>
            <li>
                <NavLink
                    to={path}
                    role="menuitem"
                    onClick={onclick}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-amber-400 rounded-2xl ml-0.2"
                >
                    <Icon className="h-4 w-4 text-neutral-600" />
                    <span>{name}</span>
                </NavLink>
            </li>
        </>
    )
}

export default SidebarList