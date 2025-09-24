import * as Icons from "lucide-react";

function SidebarList({
    onclick , 
    name ,
    icon
}) {

    const Icon = Icons[(icon || "").charAt(0).toUpperCase() + (icon || "").slice(1)] || Icons.Code;
    return (
        <>
            <li>
                <button
                    role="menuitem"
                    onClick={onclick}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-50"
                >
                    <Icon className="h-4 w-4 text-neutral-600" />
                    <span>{name}</span>
                </button>
            </li>
        </>
    )
}

export default SidebarList