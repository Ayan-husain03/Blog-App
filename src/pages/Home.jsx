import React from "react";
import service from "../Appwrite/conf";
import { Container, PostCard } from "../component";
import { useState } from "react";
import { useEffect } from "react";

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
        No posts found or loading...
      </p>
      <p className="text-gray-200 text-lg animate-pulse">
        please Login to see the post
      </p>
    </div>
  ) : (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {post.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
