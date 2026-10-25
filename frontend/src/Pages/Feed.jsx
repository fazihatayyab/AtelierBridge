import { usePost } from "../Context/PostContext";
import PostGrid from "../Components/PostGrid";

const FEED_BG = "/bg.png";

function Feed() {
    const { feed, loading, error } = usePost();

    if (loading) {
        return (
            <p className="mt-4 font-editorial text-lg text-burgundy/80">Loading feed...</p>
        );
    }

    if (error) {
        return (
            <p className="rounded-2xl border border-red-200 bg-red-50/80 p-6 text-center text-sm text-red-700">{error}</p>
        );
    }

    return (
            <div
            className="relative min-h-screen font-ui text-burgundy selection:bg-burgundy selection:text-latte"
            style={{
                backgroundColor: "#F7EFE7", 
                backgroundImage: `url(${FEED_BG})`,
                backgroundAttachment: "fixed", 
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
        <div className="flex">
            <h1 className=" text-transparent mt-3 font-editorial text-5xl font-normal tracking-tight text-burgundy sm:text-6xl">Feed</h1>
            <PostGrid
                posts={feed}
                emptyMessage="No designs yet — be the first to upload!"
            />
        </div>
        </div>
    );
}

export default Feed;
