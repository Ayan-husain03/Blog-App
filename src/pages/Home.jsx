import React from "react";
import service from "../Appwrite/conf";
import { Button, Container, PostCard } from "../component";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";

function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    service.getPosts().then((post) => {
      if (post) {
        setPost(post.documents);
      }
    });
  }, []);
  return post.length === 0 ? (
    <div className="w-full h-[60vh] flex justify-center flex-col gap-5 items-center">
      <p className="text-gray-200 text-lg animate-pulse">
        No post to show please add new Post
      </p>
      <Button>
        <Link to="/add-post">Add New Post</Link>
      </Button>
    </div>
  ) : (
    <Container className="px-5 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {post.map((post) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </div>
    </Container>
  );
}

export default Home;
