import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
// Shared button styles matching the landing page luxury theme
const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-[#4E1422] px-6 py-2 text-xs sm:text-sm font-medium tracking-[0.1em] uppercase text-[#FAF6F0] shadow-sm transition-all hover:bg-[#380B16] hover:shadow";
const outlineBtn =
    "inline-flex items-center justify-center rounded-full border border-burgundy px-6 py-2 text-xs sm:text-sm font-medium tracking-[0.1em] uppercase text-burgundy transition-colors hover:bg-burgundy hover:text-latte";
/* ---------------- Interlocking AB Monogram ---------------- */
function ABMonogram({ className = "w-6 h-7" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 40 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
        >
            {/* Serif A */}
            <path d="M6 42 L18 6 L30 42" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 30 H25" />
            {/* Serif B interlocking */}
            <path
                d="M20 6 H30 C35 6 38 12 34 19 C38 24 36 32 28 32 H18"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M20 19 H31" />
        </svg>
    );
}
function Avatar({ user, size = "size-8" }) {
    return user.avatarUrl ? (
        <img
            src={user.avatarUrl}
            alt={user.name || "User"}
            className={`${size} rounded-full border border-burgundy/25 object-cover shadow-sm`}
        />
    ) : (
        <span
            className={`${size} grid place-items-center rounded-full border border-burgundy/20 bg-[#E8DDD4] text-xs font-semibold text-burgundy`}
        >
            {user.name?.[0]?.toUpperCase() || "U"}
        </span>
    );
}
function Navbar() {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const links =
        user?.role === "DESIGNER"
            ? [
                  { to: "/feed", label: "Feed" },
                  { to: "/upload", label: "Upload" },
              ]
            : user?.role === "BRAND"
            ? [{ to: "/scout", label: "Scout" }]
            : [];
    async function handleLogout() {
        setOpen(false);
        await logout();
        navigate("/login");
    }
    const pillClass = ({ isActive }) =>
        `rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium uppercase tracking-[0.12em] transition-colors ${
            isActive
                ? "bg-[#4E1422] text-[#FAF6F0]"
                : "text-burgundy/80 hover:text-burgundy hover:bg-burgundy/5"
        }`;
    return (
        <header className="relative top-0 z-50 border-b border-burgundy/10  bg-[#EBDCD0]/95  font-ui text-burgundy backdrop-blur-md transition-colors">
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 sm:px-10">
                {/* Brand Logo with AB Monogram (Star icon removed) */}
                <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
                >
                    <ABMonogram className="h-7 w-6 text-burgundy transition-transform group-hover:scale-105" />
                    <span className="font-editorial text-2xl font-medium tracking-tight text-burgundy sm:text-3xl">
                        AtelierBridge
                    </span>
                </Link>
                {/* Desktop Nav Items */}
                {!loading && (
                    <>
                        <div className="hidden items-center gap-6 md:flex">
                            {isAuthenticated && user ? (
                                <>
                                    {links.map((link) => (
                                        <NavLink key={link.to} to={link.to} className={pillClass}>
                                            {link.label}
                                        </NavLink>
                                    ))}
                                    {/* User Profile Pill */}
                                    <Link
                                        to={`/profile/${user.id}`}
                                        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-xs sm:text-sm font-medium text-burgundy transition-colors hover:bg-burgundy/5"
                                    >
                                        <Avatar user={user} size="size-7" />
                                        <span>{user.name}</span>
                                        <svg
                                            className="h-3 w-3 opacity-60"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                    {/* Clean Text Logout button matching screenshot */}
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="text-xs sm:text-sm font-medium uppercase tracking-[0.12em] text-burgundy/75 transition-colors hover:text-burgundy"
                                    >
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-xs sm:text-sm font-medium uppercase tracking-[0.12em] text-burgundy/80 transition-colors hover:text-burgundy"
                                    >
                                        Log in
                                    </Link>
                                    <Link to="/register" className={primaryBtn}>
                                        Join
                                    </Link>
                                </>
                            )}
                        </div>
                        {/* Mobile hamburger menu button */}
                        <button
                            type="button"
                            onClick={() => setOpen((o) => !o)}
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            className="grid size-9 place-items-center rounded-full border border-burgundy/20 bg-[#FAF6F0] text-sm text-burgundy transition-colors hover:bg-[#F2E5DC] md:hidden"
                        >
                            {open ? "✕" : "☰"}
                        </button>
                    </>
                )}
            </nav>
            {/* Mobile dropdown panel */}
            {open && !loading && (
                <div className="border-t border-burgundy/10 bg-[#FBF7F2] px-6 py-5 md:hidden">
                    <div className="flex flex-col gap-3.5">
                        {isAuthenticated && user ? (
                            <>
                                {links.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setOpen(false)}
                                        className={({ isActive }) =>
                                            `${pillClass({ isActive })} text-center`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                                <Link
                                    to={`/profile/${user.id}`}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-center gap-2.5 rounded-full border border-burgundy/15 bg-[#FAF6F0] py-2 text-sm font-medium text-burgundy"
                                >
                                    <Avatar user={user} size="size-7" />
                                    <span>{user.name}</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="mt-1 text-center text-xs font-medium uppercase tracking-[0.12em] text-burgundy/75 hover:text-burgundy"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setOpen(false)}
                                    className={`${outlineBtn} text-center`}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setOpen(false)}
                                    className={`${primaryBtn} text-center`}
                                >
                                    Join
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
export default Navbar;

  