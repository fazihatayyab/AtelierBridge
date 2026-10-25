import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const BG_IMAGE = "/bg.png";
function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const data = await login({ email, password });
            navigate(data.user.role === "BRAND" ? "/scout" : "/feed");
        } catch (err) {
            console.log(err.message);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <div
            className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 font-ui text-burgundy selection:bg-burgundy selection:text-latte sm:px-6 sm:py-16"
            style={{
                backgroundColor: "#F7EFE7",
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="w-full max-w-md">
        
                <div className="rounded-2rem border border-[#EBDCD0] bg-[#FAF6F0]/90 p-7 shadow-[0_8px_30px_rgba(78,20,34,0.04)] backdrop-blur-md sm:p-10">
                    <div className="mb-8 text-center">
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-burgundy/80">
                            Welcome Back
                        </p>
                        <h1 className="mt-2 font-editorial text-3xl font-medium tracking-tight text-burgundy sm:text-4xl">
                            Log in to AtelierBridge
                        </h1>
                        <div className="mx-auto mt-3 h-1px w-12 bg-burgundy/30" />
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                    
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-burgundy/90">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="atelier@example.com"
                                className="w-full rounded-2xl border border-burgundy/20 bg-[#FAF6F0] px-4 py-2.5 text-xs text-burgundy placeholder:text-burgundy/40 focus:border-burgundy focus:outline-none focus:ring-1 focus:ring-burgundy/30 sm:text-sm"
                            />
                        </div>
                        
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-burgundy/90">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Your password"
                                className="w-full rounded-2xl border border-burgundy/20 bg-[#FAF6F0] px-4 py-2.5 text-xs text-burgundy placeholder:text-burgundy/40 focus:border-burgundy focus:outline-none focus:ring-1 focus:ring-burgundy/30 sm:text-sm"
                            />
                        </div>
                    
                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50/80 p-3 text-center text-xs font-medium text-red-700">
                                {error}
                            </div>
                        )}
                    
                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4E1422] py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#FAF6F0] shadow-md transition-all hover:bg-[#380B16] hover:shadow-lg disabled:opacity-50"
                        >
                            {submitting ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#FAF6F0]/30 border-t-[#FAF6F0]" />
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <span>Log in</span>
                            )}
                        </button>
                    </form>
            
                    <p className="mt-6 text-center text-xs text-burgundy/75 sm:text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-burgundy underline underline-offset-4 transition-colors hover:text-[#380B16]"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
