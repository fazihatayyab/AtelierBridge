import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import ProfileHeader from "../Components/ProfileHeader";
import PostGrid from "../Components/PostGrid";

const BG_IMAGE="/bg.png"

function ProfileView() {
    const { userId } = useParams();
    const { authFetch} = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true);
                setError(null);
 
             const res = await authFetch("get", `/api/profile/${userId}`);
                
                setProfile(res.data.user);
            } catch (err) {
                console.log(err.message)
                setError(err.response?.data?.message || "Could not load this profile");
            } finally {
                setLoading(false);
            }
        }
    fetchProfile();
    }, [userId]);

    if (loading) {
        return <p className="text-sm text-gray-500 text-center py-20">Loading...</p>;
    }

    if (error || !profile) {
        return (
            <p className="text-sm text-red-500 text-center py-20">
                {error || "Profile not found"}
            </p>
        );
    }

    const isDesigner = profile.role === "DESIGNER";
    const postsToShow = isDesigner ? profile.posts : profile.taggedPosts;
    const emptyMessage = isDesigner
        ? "No designs uploaded yet."
        : "No designers have tagged this brand yet.";

    return (
        <div
            className="relative min-h-[calc(100vh-64px)] font-ui text-burgundy selection:bg-burgundy selection:text-latte"
            style={{
                backgroundColor: "#F7EFE7",
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundAttachment: "fixed", // Keeps the background fixed and extends smoothly when scrolling
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
                <ProfileHeader profile={profile} />
                <div className="py-8 sm:py-10">
                    <PostGrid
                        posts={postsToShow}
                        // isDesigner = true → showDesigner = false → each post card does not show the designer's info which we have mapped in PostCard.jsx otherwise info will repeat in his profile and his posts also
                        showDesigner={!isDesigner}
                        emptyMessage={emptyMessage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProfileView;
