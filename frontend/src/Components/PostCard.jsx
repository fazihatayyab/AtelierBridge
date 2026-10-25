import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { usePost } from "../Context/PostContext";

                // post( is a single of posts(array)) is a props comes from PostGrid  
function PostCard({ post, showDesigner = true, showTaggedBrand = true }) {
    const { user } = useAuth();
    const { deletePost } = usePost();

    const tags = [post.colors, post.fabricType, post.silhouette, post.workType].filter(Boolean);

    const isOwnPost = user?.id === post.designer?.id;

    async function handleDelete() {
        const confirmed = window.confirm("Delete this post? This can't be undone.");
        if (!confirmed) return;
        try {
            await deletePost(post.id);
        } catch (err) {
            alert(err.response?.data?.message || "Could not delete post");
        }
    }
    return (
        <article className="group flex flex-col justify-between rounded-2xl border border-[#EBDCD0] bg-[#FAF6F0] p-2.5 shadow-[0_2px_10px_rgba(78,20,34,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:rounded-[1.35rem] sm:p-3">
            <div>
                <div className="relative aspect-1.25/1 w-full overflow-hidden rounded-xl bg-[#EFE5DB] sm:rounded-2xl">
                    <Link to={`/post/${post.id}`} className="block h-full w-full">
                        <img
                            src={post.imageUrl}
                            alt={post.caption || "Design"}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                    </Link>
                
                    {isOwnPost && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="absolute right-2 top-2 z-10 rounded-full bg-[#4E1422] px-2.5 py-0.5 text-[10px] font-medium text-[#FAF6F0] shadow transition-colors hover:bg-red-800"
                        >
                            Delete
                        </button>
                    )}
                </div>
        
                {showDesigner && post.designer && (
                    <div className="mt-2.5 flex items-center justify-between">
                        <Link
                            to={`/profile/${post.designer.id}`}
                            className="flex items-center gap-2 transition-opacity hover:opacity-85"
                        >
                            {post.designer.avatarUrl ? (
                                <img
                                    src={post.designer.avatarUrl}
                                    alt={post.designer.name}
                                    className="h-5.5 w-5.5 rounded-full border border-burgundy/20 object-cover sm:h-6 sm:w-6"
                                />
                            ) : (
                                <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[#E5D7CA] text-[10px] font-semibold text-burgundy sm:h-6 sm:w-6">
                                    {post.designer.name?.[0]?.toUpperCase()}
                                </span>
                            )}
                            <span className="text-xs font-semibold text-burgundy">
                                {post.designer.name}
                            </span>
                        </Link>
                    </div>
                )}
                
                {post.caption && (
                    <p className="mt-1.5 line-clamp-1 text-[11px] leading-snug text-burgundy/80 sm:line-clamp-2 sm:text-xs">
                        {post.caption}
                    </p>
                )}

                 {/* if showTaggedBrand true and post.taggedBrand true then render the link */}
                {showTaggedBrand && post.taggedBrand && (
                    <div className="mt-2 flex items-center gap-1.5">
                        <Link
                            to={`/profile/${post.taggedBrand.id}`}
                            className="font-editorial text-[10px] font-medium uppercase tracking-[0.12em] text-burgundy transition-opacity hover:opacity-85 sm:text-[11px]"
                        >
                        inspired By : {post.taggedBrand.name}
                        </Link>
                    </div>
                )}
            </div>
            
            {tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 pt-0.5">
                    {tags.map((tag, i) => (
                        <span
                            key={`${tag}-${i}`}
                            className="rounded-full bg-[#EFE5DB] px-2.5 py-0.5 text-[10px] font-medium text-burgundy/80 transition-colors hover:bg-[#E5D7CA]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}
export default PostCard;

                  































                {/* if showTaggedBrand true and post.taggedBrand true then render the link */}
