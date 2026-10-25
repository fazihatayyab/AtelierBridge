import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const HERO_BG = "/hero.png";
const FABRIC_IMAGE = "/fabric.png";
const TAG_IMAGE = "/tag.png";
/* ---------------- AB Monogram ---------------- */
function ABMonogram({ className = "w-8 h-10" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 40 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
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
function Landing() {
    const { user, isAuthenticated, loading } = useAuth();
    const isBrand = user?.role === "BRAND";
    const home = isBrand ? "/scout" : "/feed";
    const homeLabel = isBrand ? "Open scout dashboard" : "Open feed";
    return (
        <div className="min-h-screen bg-[#FBF7F2] font-ui text-burgundy antialiased selection:bg-burgundy selection:text-latte">
            {/* ---------------- Hero Section ---------------- */}
            <section
                className="relative flex min-h-580px items-center overflow-hidden bg-cover bg-75%_center bg-no-repeat py-20 sm:min-h-660px sm:bg-70%_center sm:py-28 lg:min-h-760px lg:bg-center lg:py-36"
                style={{
                    backgroundImage: `url(${HERO_BG})`,
                    backgroundColor: "#EBDCD0", // Warm wall fallback tone
                }}
            >
                {/* Subtle soft gradient fade on mobile screens for effortless text legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to- from-[#FAF6F0]/90 via-[#FAF6F0]/50 to-transparent sm:via-transparent lg:hidden" />
                <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center px-6 lg:grid-cols-[1.15fr_0.85fr]">
                    {/* Left Column: Heading, Subtitle & Action */}
                    <div className="z-10 max-w-xl">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium uppercase tracking-[0.2em] text-burgundy/85">
                                Where creativity meets discovery
                            </span>
                            <span className="h-1px w-12 bg-burgundy/40" />
                        </div>
                        <h1 className="mt-6 font-editorial text-[clamp(2.75rem,6.2vw,5.25rem)] font-normal leading-[1.02] tracking-tight text-burgundy">
                            Your vision
                            <br />
                            finds the right
                            <br />
                            <span className="font-normal italic">audience.</span>
                        </h1>
                        <p className="mt-6 max-w-md text-sm leading-relaxed text-burgundy/80 sm:text-base">
                            AtelierBridge connects emerging designers with fashion brands. Designers post their work and tag the brands.
                        </p>
                        <div className="mt-8 flex items-center">
                            <Link
                                to={!loading && isAuthenticated ? home : "/register"}
                                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#4E1422] px-8 py-3.5 text-sm font-medium text-[#FAF6F0] shadow-md transition-all hover:bg-[#380B16] hover:shadow-lg"
                            >
                                <span>Get Started</span>
                                <svg
                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                   
                </div>
            </section>
           
            
            {/* ---------------- Features Section ("From a photo to a shortlist") ---------------- */}
            <section className="relative border-t border-burgundy/10 bg-[#FAF6F0] py-16 sm:py-24">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
                    {/* Left Decorative Side Arch (Burgundy draped silk) */}
                    <div className="hidden h-340px w-24 shrink-0 overflow-hidden rounded-t-full border border-burgundy/10 shadow-sm md:block lg:w-32">
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${FABRIC_IMAGE})`,
                                backgroundColor: "#4E1422",
                            }}
                        >
                            <div className="h-full w-full bg-gradient-to from-[#4E1422]/40 via-transparent to-[#380B16]/80" />
                        </div>
                    </div>
                    {/* Central 3 Columns */}
                    <div className="grid flex-1 grid-cols-1 items-start gap-10 md:grid-cols-3 lg:gap-12">
                        {/* Column 1: Post your look */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-burgundy/80">
                                    From a photo to a shortlist
                                </span>
                                <span className="h-1px w-8 bg-burgundy/40" />
                            </div>
                            <h2 className="mt-3 font-editorial text-3xl font-medium tracking-tight text-burgundy sm:text-4xl">
                                Post your look
                            </h2>
                            <p className="mt-3 max-w-xs text-sm leading-relaxed text-burgundy/80 sm:text-base">
                                Upload a photo and write one line about it. That is the whole form.
                            </p>
                            {/* Dropzone container */}
                            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-burgundy/35 bg-[#FAF4ED] px-6 py-9 text-center transition-colors hover:border-burgundy/60">
                                <svg
                                    className="h-8 w-8 text-burgundy/75"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v8m0-8l-3 3m3-3l3 3"
                                    />
                                </svg>
                                <p className="mt-3 text-xs font-medium text-burgundy/80 sm:text-sm">
                                    Drop a photo, add one line
                                </p>
                            </div>
                        </div>
                        {/* Column 2: AI reads the details */}
                        <div className="flex flex-col">
                            <h2 className="font-editorial text-2xl font-medium tracking-tight text-burgundy sm:text-3xl">
                                AI reads the details
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-burgundy/80 sm:text-base">
                                The photo is analysed when you upload it, so nobody fills in a tagging form.
                            </p>
                            {/* Tag badges */}
                            <div className="mt-6 flex flex-wrap gap-2">
                                {["colour", "fabric", "silhouette", "work type"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-burgundy/25 bg-[#F4ECE5] px-3.5 py-1 text-xs font-medium text-burgundy/85"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {/* Monogram Brand Lockup */}
                            <div className="mt-12 flex items-center gap-4 pt-2">
                                <ABMonogram className="h-10 w-9 text-burgundy" />
                                <div className="h-8 w-1px bg-burgundy/30" />
                                <div>
                                    <p className="font-editorial text-xl font-medium tracking-tight text-burgundy">
                                        AtelierBridge
                                    </p>
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-burgundy/65">
                                        Tag · Connect · Grow
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Column 3: Brands get a shortlist */}
                        <div className="flex flex-col">
                            <h2 className="font-editorial text-2xl font-medium tracking-tight text-burgundy sm:text-3xl">
                                Brands get a shortlist
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-burgundy/80 sm:text-base">
                                Every design tagged to a brand appears on its scout dashboard.
                            </p>
                            {/* Two Feature Cards */}
                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {/* Card 1: Tag the inspiration */}
                                <div className="rounded-2xl border border-burgundy/10 bg-[#F5ECE5] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                                    <div className="mb-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#E8DDD4] text-burgundy">
                                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-editorial text-base font-medium text-burgundy">
                                        Tag the inspiration
                                    </h3>
                                    <p className="mt-1.5 text-xs leading-relaxed text-burgundy/75">
                                        Search for a brand and tag it. The tag links to the brand's real profile.
                                    </p>
                                </div>
                                {/* Card 2: Brands get a shortlist */}
                                <div className="rounded-2xl border border-burgundy/10 bg-[#F5ECE5] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                                    <div className="mb-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#E8DDD4] text-burgundy">
                                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="4" y="14" width="3.5" height="7" rx="1" />
                                            <rect x="10.25" y="9" width="3.5" height="12" rx="1" />
                                            <rect x="16.5" y="4" width="3.5" height="17" rx="1" />
                                        </svg>
                                    </div>
                                    <h3 className="font-editorial text-base font-medium text-burgundy">
                                        Brands get a shortlist
                                    </h3>
                                    <p className="mt-1.5 text-xs leading-relaxed text-burgundy/75">
                                        Every design tagged to a brand appears on its scout dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Decorative Card (Luxury AtelierBridge hangtag on silk) */}
                    <div className="relative hidden h-340px w-24 shrink-0 overflow-hidden rounded-2xl border border-burgundy/10 shadow-sm md:block lg:w-32">
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${TAG_IMAGE})`,
                                backgroundColor: "#380B16",
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to from-[#380B16]/80 via-transparent to-[#4E1422]/50 p-2">
                                <div className="flex h-36 w-20 flex-col items-center justify-between rounded-lg bg-[#FAF6F0] p-3 shadow-xl">
                                    <div className="h-2 w-2 rounded-full border border-burgundy/40 bg-burgundy/20" />
                                    <ABMonogram className="h-12 w-10 text-burgundy" />
                                    <span className="text-[8px] uppercase tracking-widest text-burgundy/60">AB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ---------------- Bottom Banner & Footer ---------------- */}
            <footer className="relative overflow-hidden bg-[#380B16] text-[#FAF6F0]">
                {/* Silk wave background subtle glow */}
                <div className="pointer-events-none absolute inset-0 opacity-20">
                    <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#7A283C] blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#7A283C] blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
                    {/* Top CTA Row */}
                    <div className="flex flex-col items-start justify-between gap-8 border-b border-latte/15 pb-14 sm:flex-row sm:items-center">
                        <h2 className="font-editorial text-2xl font-normal leading-tight text-latte sm:text-3xl lg:text-4xl">
                            Make an account and post your first
                            <br />
                            look in <span className="font-normal italic">a minute.</span>
                        </h2>
                        <Link
                            to={!loading && isAuthenticated ? home : "/register"}
                            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-latte/60 px-7 py-3 text-xs font-medium uppercase tracking-0.1em text-latte transition-all duration-200 hover:border-latte hover:bg-latte hover:text-burgundy"
                        >
                            <span>{!loading && isAuthenticated ? homeLabel : "Open feed"}</span>
                            <span>→</span>
                        </Link>
                    </div>
                    {/* Centered Brand & Tagline */}
                    <div className="mt-12 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-3">
                            <ABMonogram className="h-8 w-7 text-latte/90" />
                            <span className="font-editorial text-2xl tracking-tight text-latte">AtelierBridge</span>
                        </div>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-latte/65 sm:text-xs">
                            A scouting space for fashion designers.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default Landing;
