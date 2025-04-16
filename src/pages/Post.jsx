import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import service from "../Appwrite/conf";
import { Container } from "lucide-react";
import { Button } from "../component";
import { Delete } from "lucide-react";
import { Edit } from "lucide-react";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState([]);
  const { $id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if ($id) {
      service.getPost($id).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [$id, navigate]);

  // delete post function
  async function deletePost() {
    const status = await service.deletePost(post.$id);
    if (status) {
      service.deleteFile(post.featuredImage);
      navigate("/");
    }
  }
  const imageUrl = service.getFilePreview(post.featuredImage);
  return post ? (
    <div className="py-8">
      <Container>
        <div className="flex justify-center relative border p-2">
          <img src={imageUrl} alt={post.title} className="rounded-xl" />
          {isAuthor && (
            <div className="absolute right-5 top-5">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-500 mr-3 text-white">
                  <Edit />
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                <Delete />
              </Button>
            </div>
          )}
        </div>
        <div>
          <h1>{post.title}</h1>
        </div>
        <div>{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
