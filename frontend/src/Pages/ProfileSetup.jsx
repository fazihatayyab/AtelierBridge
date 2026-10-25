import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const BG_IMAGE = "/bg.png";
function ProfileSetup() {
    const { user, authFetch, updateUser, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [bio, setBio] = useState(user?.bio || "");
    const [contactNumber, setContactNumber] = useState(user?.contactNumber || "");
    const [aestheticDescription, setAestheticDescription] = useState(
        user?.aestheticDescription || ""
    );
    const [avatarFile, setAvatarFile] = useState(null);
    const [preview, setPreview] = useState(user?.avatarUrl || null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        setPreview(URL.createObjectURL(file));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const formData = new FormData();
            // (key,value)
            formData.append("bio", bio);
            if (user?.role === "DESIGNER") {
                formData.append("contactNumber", contactNumber);
            }
            if (user?.role === "BRAND") {
                formData.append("aestheticDescription", aestheticDescription);
            }
            if (avatarFile) {
                formData.append("avatarUrl", avatarFile);
            }
            if (authLoading) return;
            const res = await authFetch("patch", "/api/profile/profileSetup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            updateUser(res.data.user);
            navigate(`/profile/${user.id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Could not update profile");
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <div
            className="relative min-h-[calc(100vh-64px)] px-4 py-12 font-ui text-burgundy selection:bg-burgundy selection:text-latte sm:px-6 sm:py-16"
            style={{
                backgroundColor: "#F7EFE7",
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="relative mx-auto max-w-lg">
                {/* Back to Profile Link */}
                <div className="mb-4">
                    <Link
                        to={`/profile/${user?.id}`}
                        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-burgundy/80 transition-colors hover:text-burgundy"
                    >
                        <span>←</span>
                        <span>Back to profile</span>
                    </Link>
                </div>
        
                <div className="rounded-2rem border border-[#EBDCD0] bg-[#FAF6F0]/90 p-6 shadow-[0_8px_30px_rgba(78,20,34,0.04)] backdrop-blur-md sm:p-10">
                    <div className="mb-8 text-center">
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-burgundy/80">
                            Account Settings
                        </p>
                        <h1 className="mt-2 font-editorial text-3xl font-medium tracking-tight text-burgundy sm:text-4xl">
                            Edit Profile
                        </h1>
                        <div className="mx-auto mt-3 h-1px w-12 bg-burgundy/30" />
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                        <div className="flex flex-col items-center gap-2.5">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Avatar preview"
                                    className="h-24 w-24 rounded-full border-2 border-burgundy/20 object-cover shadow-md sm:h-28 sm:w-28"
                                />
                            ) : (
                                <span className="flex h-24 w-24 items-center justify-center rounded-full border border-burgundy/20 bg-[#E8DDD4] text-2xl font-semibold text-burgundy shadow-sm sm:h-28 sm:w-28 sm:text-3xl">
                                    {user?.name?.[0]?.toUpperCase()}
                                </span>
                            )}
                            <label className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-burgundy transition-colors hover:text-burgundy/70">
                                <span>Change photo</span>
                                <input
                                    type="file"
                                    // without this, their file browser will show all file types
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    // this hides the native file input button
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {/* Bio Field */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-burgundy/90">
                                Bio
                            </label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={3}
                                placeholder="Tell us about yourself and your design journey..."
                                className="w-full rounded-2xl border border-burgundy/20 bg-[#FAF6F0] p-3.5 text-xs text-burgundy placeholder:text-burgundy/40 focus:border-burgundy focus:outline-none focus:ring-1 focus:ring-burgundy/30 sm:text-sm"
                            />
                        </div>
                        {/* Contact Number (for Designers) */}
                        {user?.role === "DESIGNER" && (
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-burgundy/90">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    placeholder="+92 300 1234567"
                                    className="w-full rounded-2xl border border-burgundy/20 bg-[#FAF6F0] px-4 py-2.5 text-xs text-burgundy placeholder:text-burgundy/40 focus:border-burgundy focus:outline-none focus:ring-1 focus:ring-burgundy/30 sm:text-sm"
                                    required
                                />
                            </div>
                        )}
                        {/* Aesthetic Description (for Brands) */}
                        {user?.role === "BRAND" && (
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-burgundy/90">
                                    Aesthetic Description
                                </label>
                                <textarea
                                    value={aestheticDescription}
                                    onChange={(e) => setAestheticDescription(e.target.value)}
                                    rows={3}
                                    placeholder="Describe your brand's style, colors, fabrics..."
                                    className="w-full rounded-2xl border border-burgundy/20 bg-[#FAF6F0] p-3.5 text-xs text-burgundy placeholder:text-burgundy/40 focus:border-burgundy focus:outline-none focus:ring-1 focus:ring-burgundy/30 sm:text-sm"
                                />
                            </div>
                        )}
                        
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
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <span>Save Profile</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ProfileSetup;

  