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
    console.log("this post from home : ", post)

  return (
    <div className="w-full py-8">
          <Container>
              {post.map(post => (
                  <div key={post.$id}>
                      <PostCard post={post} />
                  </div>
              ))}
      </Container>
    </div>
  );
}

export default Home;
