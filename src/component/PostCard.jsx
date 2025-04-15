import React from "react";
import service from "../Appwrite/conf";
import { Link } from "react-router";

function PostCard({ post }) {
  const { $id, title, content, featuredImage } = post
  const imageUrl = service.getFilePreview(featuredImage)
  return (
    <Link to={`/post/${$id}`} className="">
      <div className="w-full h-48 bg-gray-200">
        <div>
          <img
            src={imageUrl}
            alt={title}
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
