import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Feed from "./Pages/Feed";
import PostView from "./Pages/PostView";
import UploadPost from "./Pages/UploadPost";
import ProfileSetup from "./Pages/ProfileSetup";
import ProfileView from "./Pages/ProfileView";
import Scout from "./Pages/Scout";
import NotFound from "./Pages/NotFound";
import Landing from "./Pages/Landing"

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path ="/" element={<Landing/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                
                <Route
                    path="/feed"
                    element={
                        <ProtectedRoute allowedRoles={["DESIGNER"]} >
                            <Feed />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/post/:postId"
                    element={
                        <ProtectedRoute>
                            <PostView />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile/setup"
                    element={
                        <ProtectedRoute>
                            <ProfileSetup />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile/:userId"
                    element={
                        <ProtectedRoute>
                            <ProfileView />
                        </ProtectedRoute>
                    }
                />

                {/* Designer only */}
                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute allowedRoles={["DESIGNER"]}>
                            <UploadPost />
                        </ProtectedRoute>
                    }
                />

                {/* Brand only */}
                <Route
                    path="/scout"
                    element={
                        <ProtectedRoute allowedRoles={["BRAND"]}>
                            <Scout />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </>
    );
}

export default App;
