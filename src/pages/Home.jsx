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

    return <div>
      
  </div>;
}

export default Home;
