import { Route, Routes, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import Chatbox from "./pages/Chatbox";
import Connections from "./pages/Connections";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Layout from "./pages/Layout";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <Loading />

  return (
    <>
    <Routes>
      {!isSignedIn ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<Chatbox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      )}
    </Routes>
    <Toaster />
    </>
  );
};

export default App;
