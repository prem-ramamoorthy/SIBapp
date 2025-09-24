import { LogOut, User, Settings, Menu } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import SidebarList from './SidebarList';

export default function HeaderAvatar({
    onProfile,
    onSettings,
}) {
    const [open, setOpen] = useState(false)
    const btnRef = useRef(null)
    const menuRef = useRef(null)

    useEffect(() => {
        function onDocClick(e) {
            if (!open) return
            if (
                btnRef.current && !btnRef.current.contains(e.target) &&
                menuRef.current && !menuRef.current.contains(e.target)
            ) setOpen(false)
        }
        function onKey(e) {
            if (!open) return
            if (e.key === "Escape") setOpen(false)
        }
        document.addEventListener("mousedown", onDocClick)
        document.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("mousedown", onDocClick)
            document.removeEventListener("keydown", onKey)
        }
    }, [open])

    return (
        <div className="relative cursor">
            <button
                ref={btnRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setOpen((v) => !v)
                    }
                }}
            >
                <span>
                    <Menu />
                </span>
            </button>

            {open && (
                <div
                    ref={menuRef}
                    role="menu"
                    tabIndex={-1}
                    className="
            absolute left-0 mt-2 w-56
            rounded-lg border border-neutral-300 bg-white shadow-2xl
            overflow-hidden
            max-h-[70vh] overflow-y-auto
          "
                >
                    <ul className="py-1">
                        <SidebarList onclick={onProfile} name={"Dashboard"} icon={"House"} />
                        <SidebarList onclick={onSettings} name={"My Activity"} icon={"TrendingUp"} />
                        <SidebarList onclick={onSettings} name={"Members Directory"} icon={"users"} />
                        <SidebarList onclick={onSettings} name={"Meetings"} icon={"calendar"} />
                        <SidebarList onclick={onSettings} name={"Referral Slips"} icon={"fileText"} />
                        <SidebarList onclick={onSettings} name={"Analytics"} icon={"chartLine"} />
                        <SidebarList onclick={onSettings} name={"Chapter Info"} icon={"building2"} />
                        <SidebarList onclick={onSettings} name={"Visitors"} icon={"userPlus"} />
                        <SidebarList onclick={onSettings} name={"Substitutes"} icon={"clock4"} />
                    </ul>
                </div>
            )}
        </div>
    )
}
