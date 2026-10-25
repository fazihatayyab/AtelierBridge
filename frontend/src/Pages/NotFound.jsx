import { useLocation, Link } from "react-router-dom";

const BG_IMAGE = "/bg.png";
function NotFound() {
    const { pathname } = useLocation();
    return (
        <div
            className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16 font-ui text-burgundy selection:bg-burgundy selection:text-latte sm:px-6"
            style={{
                backgroundColor: "#F7EFE7",
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="w-full max-w-md text-center">
            
                <div className="rounded-2rem border border-[#EBDCD0] bg-[#FAF6F0]/90 p-8 shadow-[0_8px_30px_rgba(78,20,34,0.04)] backdrop-blur-md sm:p-12">
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-burgundy/80">
                        404 · Page Not Found
                    </p>
                    <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-burgundy sm:text-5xl">
                        Lost in the Atelier
                    </h1>
                    <div className="mx-auto my-4 h-1px w-12 bg-burgundy/30" />
                    <p className="text-xs leading-relaxed text-burgundy/75 sm:text-sm">
                        No page found at <span className="font-mono text-burgundy font-medium">"{pathname}"</span>
                    </p>
                    <div className="mt-7">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center rounded-full bg-[#4E1422] px-7 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[#FAF6F0] shadow-sm transition-all hover:bg-[#380B16] hover:shadow"
                        >
                            Return to AtelierBridge
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NotFound;

     