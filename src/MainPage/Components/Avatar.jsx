import { LogOut, User, Settings } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function classNames(...c) { return c.filter(Boolean).join(" ") }

export function HeaderAvatar({
    src,
    alt = "User avatar",
    initials = "UA",
    status = "online",
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

    const statusColor = {
        online: "bg-emerald-500",
        offline: "bg-neutral-400",
        busy: "bg-rose-500",
        away: "bg-amber-500",
        null: "bg-transparent",
    }[status ?? "null"]

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
                className="
          group inline-flex items-center gap-2 rounded-full
          p-1.5 hover:bg-yellow-100 active:bg-yellow-200
          transition focus:outline-none focus:ring-2 focus:ring-yellow-300
        "
            >
                <span className="relative inline-block h-9 w-9 rounded-full overflow-hidden ring-1 ring-neutral-200">
                    {src ? (
                        <img
                            src={src}
                            alt={alt}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center text-sm font-medium text-black bg-amber-400">
                            {initials}
                        </span>
                    )}
                    {status && (
                        <span
                            className={classNames(
                                "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white",
                                statusColor
                            )}
                            aria-hidden="true"
                        />
                    )}
                </span>
            </button>

            {open && (
                <div
                    ref={menuRef}
                    role="menu"
                    tabIndex={-1}
                    className="
            absolute right-0 mt-2 w-56
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
