import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { usePost } from "../Context/PostContext";
import BrandTagInput from "../Components/BrandTagInput";


const UPLOAD_BG = "/bg.png";
function UploadPost() {
    const { authFetch, loading: authLoading } = useAuth();
    const { fetchFeed } = usePost();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState("");
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        if (!imageFile) {
            setError("Please select an image");
            return;
        }
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("post", imageFile);
            formData.append("caption", caption);
            // since it is optional that someone tag brand or not so if yes then
            if (selectedBrand) {
                formData.append("taggedBrandId", selectedBrand.id);
            }
            if (authLoading) return;
            const res = await authFetch("post", "/api/post/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // we need this function and call it because when Upload a post the this function should call again so that in feed uploaded post must be shown otherwise it holds old data
            await fetchFeed();
            // the response of post which comes from backend is already store in setPost(res.data.post) so after uploading we have navigate the user to PostView so that it can view post
            navigate(`/post/${res.data.post.id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Could not upload post");
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <div
            className="relative min-h-[calc(100vh-64px)] px-4 py-12 font-ui text-burgundy sm:px-6 sm:py-16 selection:bg-burgundy selection:text-latte"
            style={{
                backgroundColor: "#F7EFE7",
                backgroundImage: `url(${UPLOAD_BG})`,
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="relative mx-auto max-w-lg">
            
                <div className="rounded-2rem border border-[#EBDCD0] bg-[#FAF6F0]/90 p-6 shadow-[0_8px_30px_rgba(78,20,34,0.04)] backdrop-blur-md sm:p-10">
                    <div className="mb-8 text-center">
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-burgundy/80">
                            Share Your Vision
                        </p>
                        <h1 className="mt-2 font-editorial text-3xl font-medium tracking-tight text-burgundy sm:text-4xl">
                            Upload a Design
                        </h1>
                        <div className="mx-auto mt-3 h-1px w-12 bg-burgundy/30" />
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-burgundy/90">
                                Look Photo
                            </label>
                            {preview ? (
                                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-burgundy/15 bg-[#EFE5DB] shadow-inner">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            ) : (
                                <label
                                    htmlFor="look-image-upload"
                                    className="flex aspect-4/3 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-burgundy/30 bg-[#FAF4ED]/60 p-6 text-center transition-all hover:border-burgundy/60 hover:bg-[#FAF4ED]"
                                >
                                    {/* that uplaoding cloud  */}
                                    <svg
                                        className="h-9 w-9 text-burgundy/60 transition-transform duration-200 group-hover:scale-105"
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
                                        Click to select a photo of your look
                                    </p>
                                    <p className="mt-1 text-[10px] uppercase tracking-wider text-burgundy/50">
                                        PNG, JPG, or WEBP
                                    </p>
                                </label>
                            )}
                            <input
                                id="look-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-3 block w-full text-xs text-burgundy/70 file:mr-4 file:rounded-full file:border-0 file:bg-[#4E1422] file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-[#FAF6F0] file:transition-colors hover:file:bg-[#380B16]"
                            />
                        </div>
                    
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-burgundy/90">
                                Caption
                            </label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                rows={3}
                                placeholder="Casual linen summer dress with puff sleeves..."
                                className="w-full rounded-2xl border border-burgundy/20 bg-[#FAF6F0] p-3.5 text-xs text-burgundy placeholder:text-burgundy/40 focus:border-burgundy focus:outline-none focus:ring-1 focus:ring-burgundy/30 sm:text-sm"
                            />
                        </div>
            
                        <div>
                            <BrandTagInput
                                selectedBrand={selectedBrand}
                                onSelect={setSelectedBrand}
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
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                <span>Upload Look</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UploadPost;

  

