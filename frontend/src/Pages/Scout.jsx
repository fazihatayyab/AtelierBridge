import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import TaggedPostCard from "../Components/TaggedPostCard";

const BG_IMAGE ="/bg.png"



function Scout() {
    const { authFetch } = useAuth();

    const [taggedPosts, setTaggedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTaggedPosts() {
            try {
                setLoading(true);
                setError(null);
            const res = await authFetch("get", "/api/post/taggedPosts");

                setTaggedPosts(res.data.posts);
            } catch (err) {
                setError(err.response?.data?.message || "Could not load scout dashboard");
            } finally {
                setLoading(false);
            }
        }
         fetchTaggedPosts();
    }, []);

    if (loading) {
        return <p className="text-sm text-gray-500 text-center py-20">Loading...</p>;
    }

    if (error) {
        return <p className="text-sm text-red-500 text-center py-20">{error}</p>;
    }

    return (
        <div
            className="relative min-h-[calc(100vh-64px)] font-ui text-burgundy selection:bg-burgundy selection:text-latte"
            style={{
                backgroundColor: "#F7EFE7",
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
        
                <div className="mb-8 sm:mb-12">
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-burgundy/80">
                        Brand Discovery
                    </p>
                    <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-burgundy sm:text-5xl">
                        Scout Dashboard
                    </h1>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-burgundy/80 sm:text-base">
                        Designers who've tagged your brand in their work.
                    </p>
                    <div className="mt-4 h-[1.5px] w-12 bg-burgundy/40" />
                </div>
                
                {taggedPosts.length === 0 ? (
                    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-burgundy/25 bg-[#FAF6F0]/80 p-12 text-center text-burgundy backdrop-blur-sm">
                        <p className="font-editorial text-2xl font-normal text-burgundy">
                            No designers have tagged you yet
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-widest text-burgundy/60">
                            Tagged looks will appear here automatically
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
                        {taggedPosts.map((post) => (
                            <TaggedPostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
export default Scout;
