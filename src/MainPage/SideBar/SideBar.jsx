import { LogOut, User, Settings, SidebarOpen } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function HeaderAvatar({
    onProfile,
    onSettings,
    onLogout,
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
                    <SidebarOpen height={"30"} width={"30"}/>
                </span>
            </button>

            {open && (
                <div
                    ref={menuRef}
                    role="menu"
                    tabIndex={-1}
                    className="
            absolute left-0 mt-2 w-56
            rounded-lg border border-neutral-200 bg-white shadow-lg
            overflow-hidden
            max-h-[70vh] overflow-y-auto
          "
                >
                    <div className="px-3 py-2 border-b border-neutral-100">
                        <p className="text-sm font-semibold text-neutral-900">Account</p>
                        <p className="text-xs text-neutral-500 truncate">user@example.com</p>
                    </div>

                    <ul className="py-1">
                        <li>
                            <button
                                role="menuitem"
                                onClick={onProfile}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-50"
                            >
                                <User className="h-4 w-4 text-neutral-600" />
                                <span>Profile</span>
                            </button>
                        </li>
                        <li>
                            <button
                                role="menuitem"
                                onClick={onSettings}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-50"
                            >
                                <Settings className="h-4 w-4 text-neutral-600" />
                                <span>Settings</span>
                            </button>
                        </li>
                    </ul>

                    <div className="border-t border-neutral-100">
                        <button
                            role="menuitem"
                            onClick={onLogout}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
