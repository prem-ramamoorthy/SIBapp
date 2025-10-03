import { useEffect, useRef, useState } from "react";
import SidebarList from "../SideBar/SidebarList";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import classNames from "../../utils/classname";

export function HeaderAvatar({
    src,
    alt = "User avatar",
    initials = "UA",
    status = "online",
    onProfile,
    onSettings,
}) {
    const [open, setOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const btnRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const logoutUrl = `${import.meta.env.VITE_BACKEND_SERVER}/auth/sessionLogout`;
    const logoutOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    };

    async function onLogout() {
        try {
            setloading(true);
            const response = await fetch(logoutUrl, logoutOptions);
            const data = await response.json();

            if (data.message === "Logged out") {
                navigate("/");
            } else {
                alert(`Logout failed: ${data.message || "Unknown error"}`);
            }
        } catch (error) {
            alert(`Error occurred: ${error.message}`);
        } finally {
            setloading(false);
        }
    }


    useEffect(() => {
        function onDocClick(e) {
            if (!open) return;
            if (
                btnRef.current && !btnRef.current.contains(e.target) &&
                menuRef.current && !menuRef.current.contains(e.target)
            ) setOpen(false);
        }
        function onKey(e) {
            if (!open) return;
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const statusColor = {
        online: "bg-emerald-500",
        offline: "bg-neutral-400",
        busy: "bg-rose-500",
        away: "bg-amber-500",
        null: "bg-transparent",
    }[status ?? "null"];

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
                        e.preventDefault();
                        setOpen((v) => !v);
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
                        <SidebarList onclick={onProfile} name={"Profile"} icon={"User"} path="/profile" />
                        <SidebarList onclick={onSettings} name={"Settings"} icon={"Settings"} path="/settings" />
                    </ul>

                    <div className="border-t border-neutral-100">
                        <button
                            role="menuitem"
                            onClick={onLogout}
                            className={classNames(
                                "flex w-full items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50",
                                loading && "opacity-50 cursor-no-drop"
                            )}
                            tabIndex={-1}
                            aria-disabled={loading}
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
