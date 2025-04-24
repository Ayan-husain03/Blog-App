import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import service from "../Appwrite/conf";
import { Button, CardLoader, Container } from "../component";
import { Edit } from "lucide-react";
import parse from "html-react-parser";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (id) {
      service.getPost(id).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [id, navigate]);

  async function deletePost() {
    const status = await service.deletePost(post.$id);
    if (status) {
      service.deleteFile(post.featuredImage);
      Swal.fire({
        icon: "success",
        title: "Post Deleted Successfully",
        text: "Your post has been deleted successfully.",
        confirmButtonText: "Continue",
        timer: 2000,
      })
      setTimeout(() => navigate("/"), 2000);
    }
  }

  const imageUrl = post?.featuredImage
    ? service.getFilePreview(post.featuredImage)
    : null;

  return post ? (
    <div className="py-8 px-4 md:px-20 lg:px-52 bg-gray-800 min-h-screen">
      <ToastContainer />
      <Container>
        <div className="relative">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full rounded-t-xl object-cover max-h-[500px] shadow-sm"
            />
          )}

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                bgColor="bg-red-600 hover:bg-red-700"
                className="text-white shadow-md"
                onClick={deletePost}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        <div className=" bg-white p-6 rounded-b-lg shadow-md">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-800">
            {post.title}
          </h1>
          <hr className="my-2 bg-gray-800" />
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700">
            {typeof post.content === "string" ? parse(post.content) : null}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="py-8 px-4 md:px-20 lg:px-52 min-h-screen">
      <CardLoader />
    </div>
  );
}

export default Post;
