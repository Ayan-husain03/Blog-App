import React from "react";
import service from "../Appwrite/conf";
import { Link } from "react-router";
import parse from "html-react-parser";

function PostCard({ post }) {
  const { $id, title, content, featuredImage } = post;
  const imageUrl = service.getFilePreview(featuredImage);
  console.log(imageUrl);
  return (
    <Link to={`/post/${$id}`} className="">
      <div className="w-full h-48 bg-gray-200">
        <div>
          <img src={imageUrl} alt={title} className="object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-700">{parse(content)}</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
