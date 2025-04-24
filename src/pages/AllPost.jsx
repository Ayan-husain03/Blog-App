import React, { useState, useEffect } from "react";
import { Button, Container, PostCard } from "../component";
import service from "../Appwrite/conf";
import { Link } from "react-router";

function AllPost() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  return (
    <div className="px-5 py-3">
      {post.length === 0 ? (
        <div className="w-full h-[60vh] flex justify-center flex-col gap-5 items-center">
          <p className="text-gray-200 text-lg animate-pulse">
            No post to show please add new Post
          </p>
          <Button>
            <Link to="/add-post">Add New Post</Link>
          </Button>
        </div>
      ) : (
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {post.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default AllPost;
