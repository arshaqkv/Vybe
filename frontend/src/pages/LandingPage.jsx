import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "../api/axiosInstance";
import { Heart, UserMinus } from "lucide-react";
import toast from "react-hot-toast";
import UserSuggestion from "../components/UserSuggestion";

export default function LandingPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [users, setUsers] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get("/user/suggestions");
      setUsers(response.data.users);
    } catch (err) {
      toast.error("Failed to load suggestions");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/post");
      setPosts(response.data.data);
    } catch (error) {
      toast.error("Error fetching posts");
      setPosts([]);
    }
  };

  // 🔁 Fetch both users and posts (reused after follow/unfollow)
  const fetchAll = async () => {
    await Promise.all([fetchSuggestions(), fetchPosts()]);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  console.log(posts)

  const handleCreatePost = async () => {
    if (!newPost.trim()) return toast.error("Post cannot be empty");
    try {
      await axios.post("/post", { content: newPost });
      setNewPost("");
      toast.success("Posted");
      fetchPosts();
    } catch {
      toast.error("Post failed");
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`/post/${postId}/like`);
      fetchPosts();
    } catch {
      toast.error("Like failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-4 md:px-20 flex flex-col md:flex-row gap-6">
      {/* Feed Section */}
      <div className="flex-1">
        <h1 className="text-3xl dark:text-gray-100 font-bold mb-6">
          🔥 Latest Feeds
        </h1>

        {/* Create Post */}
        <Card className="mb-6">
          <CardContent className="p-4  flex items-center gap-4">
            <Input
              className="h-20"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
            />
            <Button variant={"outline"} onClick={handleCreatePost}>
              Post
            </Button>
          </CardContent>
        </Card>

        {/* Posts */}
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-white dark:bg-black shadow-sm">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.name}`}
                    />
                    <AvatarFallback>{post.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-base font-semibold">
                    {post.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-2xl dark:text-gray-100 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{new Date(post.created_at).toLocaleString()}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={
                          post.isLikedByCurrentUser ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {post.isLikedByCurrentUser ? "Liked" : "Like"}
                      </Button>
                      {post.isFollowingUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleUnfollow(post.user_id)}
                        >
                          <UserMinus className="w-4 h-4 mr-1" />
                          Unfollow
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar: Who to follow */}
      <div className="w-full md:w-1/3">
        <UserSuggestion users={users} onFollowToggle={fetchAll} />
      </div>
    </div>
  );
}
