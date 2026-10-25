import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const PostContext = createContext(null);

export function PostProvider({ children }) {
    const { authFetch, loading: authLoading , user } = useAuth();

    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeed = useCallback(async () => {
        
        try {
            setLoading(true);
            setError(null);

           const res = await authFetch("get", "/api/post/feed");

            setFeed(res.data.posts);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load feed");
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
         if (authLoading) return; 
          if (user?.role !== "DESIGNER") {         // Brands don't get a feed
        setLoading(false);
        return;
    }
         fetchFeed();
    }, [ authLoading ,user?.role,fetchFeed]);

    async function deletePost(postId) {
        await authFetch("delete", `/api/post/deletePost/${postId}`);
       

        // feed.filter builds a new array in which all posts kept for which below condition is true like A!==B  and when the condition falls like B !==B then it will be dropped and place this in setFeed
        setFeed((prev) => prev.filter((post) => post.id !== postId));
    }

    const value = {
        feed,
        loading,
        error,
        fetchFeed,
        deletePost,
    };

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export function usePost() {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePost must be used within a PostProvider");
    }
    return context;
}
