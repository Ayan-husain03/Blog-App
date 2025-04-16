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
    <div className="px-5 py-3">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {post.map((post) => (
            <>
              <PostCard key={post.$id} post={post} />
            </>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
