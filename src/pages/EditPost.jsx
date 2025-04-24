import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../component";
import service from "../Appwrite/conf";
import { useNavigate, useParams } from "react-router";

function EditPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      service.getPost(id).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  return post ? (
    <div className="py-5">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
