import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import axios from "../api/axiosInstance";
import toast from "react-hot-toast";

const UserSuggestion = ({ users, onFollowToggle }) => {
  const handleFollow = async (id) => {
    try {
      const response = await axios.post(`/user/${id}/follow`);
      toast.success(response.data.message);
      onFollowToggle(); // Notify parent to refresh data
    } catch {
      toast.error("Follow/unfollow failed");
    }
  };

  return (
    <Card className="bg-white dark:bg-black shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Who to follow</h2>
        {users?.length === 0 ? (
          <p className="text-sm text-muted-foreground">No suggestions.</p>
        ) : (
          users?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button size="sm" onClick={() => handleFollow(user.id)}>
                {user?.isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default UserSuggestion;
