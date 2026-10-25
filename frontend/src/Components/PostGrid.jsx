import PostCard from "./PostCard";
// posts is a prop which comes from Feed.jsx when posts={feed}
function PostGrid({
    posts,
    showDesigner = true,
    showTaggedBrand = true,
    emptyMessage = "No posts yet.",
}) {
    if (!posts || posts.length === 0) {
        return (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-burgundy/25 bg-[#FAF6F0]/80 p-10 text-center text-burgundy backdrop-blur-sm">
                <p className="font-editorial text-2xl font-normal text-burgundy">
                    {emptyMessage}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-burgundy/60">
                    AtelierBridge Feed
                </p>
            </div>
        );
    }
    return (

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
         {/* .map is mapping a single Post at a time and send it via prop to PostCard which then  renders it  */}
            {posts.map((post, i) => (
                <PostCard
                    key={post.id || i}
                    post={post}
                    showDesigner={showDesigner}
                    showTaggedBrand={showTaggedBrand}
                />
            ))}
        </div>
    );
}
export default PostGrid;







  




