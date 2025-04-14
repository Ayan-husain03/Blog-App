import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../component";
import service from "../Appwrite/conf";

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
    <div>
      <Container>
        {post.map((post) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </Container>
    </div>
  );
}

export default AllPost;
