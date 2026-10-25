import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { usePost } from "../Context/PostContext";

const BG_IMAGE ="/bg.png"


function PostView() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { user, authFetch } = useAuth();
    const { deletePost } = usePost();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function viewPost() {
            try {
                setLoading(true);
                setError(null);

                const res = await authFetch("get", `/api/post/viewPost/${postId}`);


                setPost(res.data.post);
            } catch (err) {
                setError(err.response?.data?.message || "Could not load this post");
            } finally {
                setLoading(false);
            }
        }

        viewPost();
    }, [postId]);

    async function handleDelete() {
        const confirmed = window.confirm("Delete this post? This can't be undone.");
        if (!confirmed) return;

        try {
            await deletePost(post.id);
            navigate("/feed");
        } catch (err) {
            alert(err.response?.data?.message || "Could not delete post");
        }
    }

    if (loading) {
        return <p className="text-sm text-gray-500 text-center py-20">Loading...</p>;
    }

    if (error || !post) {
        return <p className="text-sm text-red-500 text-center py-20">{error || "Post not found"}</p>;
    }

    const isOwnPost = user?.id === post.designer?.id;

    return (
                <div
            className="relative min-h-[calc(100vh-64px)] px-4 py-8 font-ui text-burgundy selection:bg-burgundy selection:text-latte sm:px-6 sm:py-14"
            style={{
                backgroundColor: "#F7EFE7",
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="mx-auto max-w-5xl">
                
                <div className="mb-4 sm:mb-6">
                    <Link
                        to="/feed"
                        className="inline-flex items-center gap-2 rounded-full border border-burgundy/20 bg-[#FAF6F0]/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-burgundy backdrop-blur-sm transition-colors hover:bg-[#FAF6F0]"
                    >
                        <span>←</span>
                        <span>Back to feed</span>
                    </Link>
                </div>
                
                <div className="overflow-hidden rounded-3xl border border-[#EBDCD0] bg-[#FAF6F0]/95 p-4 shadow-[0_8px_30px_rgba(78,20,34,0.04)] backdrop-blur-md sm:p-7 lg:p-8">
                
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
                    
                        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-burgundy/10 bg-[#EFE5DB] sm:rounded-3xl">
                            <img
                                src={post.imageUrl}
                                alt={post.caption || "Design"}
                                className="max-h-[55vh] w-full object-cover object-center sm:max-h-[70vh] sm:object-contain"
                            />
                        </div>
                        
                        <div className="flex flex-col justify-between py-1">
                            <div className="flex flex-col gap-5">
                        
                                {post.designer && (
                                    <div className="flex items-center justify-between border-b border-burgundy/10 pb-4">
                                        <Link
                                            to={`/profile/${post.designer.id}`}
                                            className="group flex items-center gap-3 transition-opacity hover:opacity-85"
                                        >
                                            {post.designer.avatarUrl ? (
                                                <img
                                                    src={post.designer.avatarUrl}
                                                    alt={post.designer.name}
                                                    className="h-10 w-10 rounded-full border border-burgundy/20 object-cover shadow-sm sm:h-11 sm:w-11"
                                                />
                                            ) : (
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5D7CA] text-sm font-semibold text-burgundy sm:h-11 sm:w-11">
                                                    {post.designer.name?.[0]?.toUpperCase()}
                                                </span>
                                            )}
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-burgundy/60">
                                                    Designer
                                                </p>
                                                <p className="text-sm font-semibold text-burgundy transition-colors group-hover:text-[#4E1422] sm:text-base">
                                                    {post.designer.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                        
                                {post.caption && (
                                    <div>
                                        <p className="font-editorial text-lg leading-relaxed text-burgundy sm:text-xl">
                                            "{post.caption}"
                                        </p>
                                    </div>
                                )}
                                
                                {post.taggedBrand && (
                                    <div className="flex flex-col gap-1.5 rounded-2xl border border-burgundy/15 bg-[#FAF4ED] p-3.5 sm:p-4">
                                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-burgundy/60">
                                            Inspiration Brand
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/profile/${post.taggedBrand.id}`}
                                                className="font-editorial text-sm font-medium uppercase tracking-[0.16em] text-burgundy hover:underline"
                                            >
                                                {post.taggedBrand.name}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {/* AI Tags */}
                                {(post.colors || post.fabricType || post.silhouette || post.workType) && (
                                    <div>
                                        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-burgundy/60">
                                            AI Analysis Tags
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {post.colors && (
                                                <span className="rounded-full bg-[#EFE5DB] px-3.5 py-1 text-xs font-medium text-burgundy/85">
                                                    {post.colors}
                                                </span>
                                            )}
                                            {post.fabricType && (
                                                <span className="rounded-full bg-[#EFE5DB] px-3.5 py-1 text-xs font-medium text-burgundy/85">
                                                    {post.fabricType}
                                                </span>
                                            )}
                                            {post.silhouette && (
                                                <span className="rounded-full bg-[#EFE5DB] px-3.5 py-1 text-xs font-medium text-burgundy/85">
                                                    {post.silhouette}
                                                </span>
                                            )}
                                            {post.workType && (
                                                <span className="rounded-full bg-[#EFE5DB] px-3.5 py-1 text-xs font-medium text-burgundy/85">
                                                    {post.workType}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Delete Action (Only for own post) */}
                            {isOwnPost && (
                                <div className="mt-8 border-t border-burgundy/10 pt-5">
                                    <button
                                        onClick={handleDelete}
                                        className="w-full rounded-full border border-red-300 bg-red-50/70 py-2.5 text-xs font-medium uppercase tracking-wider text-red-700 transition-colors hover:bg-red-100 sm:w-auto sm:px-6"
                                    >
                                        Delete Post
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PostView;

  
       