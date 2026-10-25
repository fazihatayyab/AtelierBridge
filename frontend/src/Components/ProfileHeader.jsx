import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
// this {profile} comes from profile page (profileView.jsx) when we setProfile[res.data.user] to phr user ka sara data profile me chala gaya now you can use profile.role , profile.bio , profile.name etc
function ProfileHeader({ profile }) {
    const { user } = useAuth();
    // agr to user he or uski id = profile.id ke to phr const isOwnProfile
    const isOwnProfile = user?.id === profile.id;
    return (
         <div className="flex flex-col items-center justify-center text-center py-6 sm:py-8">
    
            <div className="relative mb-2">
                {profile.avatarUrl ? (
                    <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="h-24 w-24 rounded-full border-2 border-burgundy/20 object-cover shadow-md sm:h-28 sm:w-28"
                    />
                ) : (
                    <span className="flex h-24 w-24 items-center justify-center rounded-full border border-burgundy/20 bg-[#E8DDD4] text-2xl font-semibold text-burgundy shadow-sm sm:h-28 sm:w-28 sm:text-3xl">
                        {profile.name?.[0]?.toUpperCase()}
                    </span>
                )}
            </div>
        
            <h1 className="font-editorial text-2xl font-medium tracking-tight text-burgundy sm:text-3xl">
                {profile.name}
            </h1>
            
            <span className="rounded-full border border-burgundy/20 bg-burgundy/5 px-3.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.25em] text-burgundy/75 sm:text-xs">
                {profile.role}
            </span>
            
            {profile.bio && (
                <p className="mt-1 max-w-md text-xs leading-relaxed text-burgundy/80 sm:text-sm">
                    {profile.bio}
                </p>
            )}
            
            {profile.contactNumber && !isOwnProfile && (
                <p className="flex items-center gap-2 text-xs font-medium text-burgundy/80 sm:text-sm">
                    <span>📞</span>
                    <span>{profile.contactNumber}</span>
                </p>
            )}
            
            {profile.role === "BRAND" && profile.aestheticDescription && (
                <p className="mt-1 max-w-lg font-editorial text-sm italic leading-relaxed text-burgundy/85 sm:text-base">
                    "{profile.aestheticDescription}"
                </p>
            )}
            {isOwnProfile && (
                <Link
                    to="/profile/setup"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-burgundy/30 bg-[#FAF4ED] px-6 py-2 text-xs font-medium uppercase tracking-[0.12em] text-burgundy shadow-sm transition-all hover:border-[#4E1422] hover:bg-[#4E1422] hover:text-[#FAF6F0] hover:shadow"
                >
                    Edit Profile
                </Link>
            )}
        </div> 
    );
}
export default ProfileHeader;

  