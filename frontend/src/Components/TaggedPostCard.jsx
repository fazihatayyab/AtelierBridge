import { Link } from "react-router-dom";
function TaggedPostCard({ post }) {
    return (
        <article className="group flex flex-col justify-between rounded-2xl border border-[#EBDCD0] bg-[#FAF6F0] p-2.5 shadow-[0_2px_10px_rgba(78,20,34,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:rounded-[1.35rem] sm:p-3">
            <div>
                
                <Link
                    to={`/post/${post.id}`}
                    className="block aspect-1.25/1 w-full overflow-hidden rounded-xl bg-[#EFE5DB] sm:rounded-2xl"
                >
                    <img
                        src={post.imageUrl}
                        alt={post.caption || "Design"}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
                
                {post.designer && (
                    <div className="mt-2.5">
                        <Link
                            to={`/profile/${post.designer.id}`}
                            className="flex items-center gap-2.5 transition-opacity hover:opacity-85"
                        >
                            {post.designer.avatarUrl ? (
                                <img
                                    src={post.designer.avatarUrl}
                                    alt={post.designer.name}
                                    className="h-7 w-7 rounded-full border border-burgundy/20 object-cover"
                                />
                            ) : (
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5D7CA] text-[10px] font-semibold text-burgundy">
                                    {post.designer.name?.[0]?.toUpperCase()}
                                </span>
                            )}
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-burgundy sm:text-sm">
                                    {post.designer.name}
                                </span>
                                {post.designer.bio && (
                                    <span className="line-clamp-1 text-[10px] text-burgundy/60 sm:text-[11px]">
                                        {post.designer.bio}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                )}
            
                {post.caption && (
                    <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-burgundy/80 sm:text-xs">
                        {post.caption}
                    </p>
                )}
            </div>
            {/* 4. AI Tags */}
            {(post.colors || post.fabricType || post.silhouette || post.workType) && (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-burgundy/10 pt-2">
                    {post.colors && (
                        <span className="rounded-full bg-[#EFE5DB] px-2.5 py-0.5 text-[10px] font-medium text-burgundy/80 transition-colors hover:bg-[#E5D7CA]">
                            {post.colors}
                        </span>
                    )}
                    {post.fabricType && (
                        <span className="rounded-full bg-[#EFE5DB] px-2.5 py-0.5 text-[10px] font-medium text-burgundy/80 transition-colors hover:bg-[#E5D7CA]">
                            {post.fabricType}
                        </span>
                    )}
                    {post.silhouette && (
                        <span className="rounded-full bg-[#EFE5DB] px-2.5 py-0.5 text-[10px] font-medium text-burgundy/80 transition-colors hover:bg-[#E5D7CA]">
                            {post.silhouette}
                        </span>
                    )}
                    {post.workType && (
                        <span className="rounded-full bg-[#EFE5DB] px-2.5 py-0.5 text-[10px] font-medium text-burgundy/80 transition-colors hover:bg-[#E5D7CA]">
                            {post.workType}
                        </span>
                    )}
                </div>
            )}
        </article>
    );
}
export default TaggedPostCard;

  