import React from "react";
import { Link } from "react-router";
import service from "../Appwrite/conf";
import UserData from "./UserData";

function PostCard({ post }) {
  const { $id, title, featuredImage } = post;

  // Use getFileView instead of getFilePreview (to fix the error on free plan)
  const imageUrl = service.getFilePreview(featuredImage);

  return (
    <Link
      to={`/post/${$id}`}
      className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
    >
      <div className="w-full h-48 overflow-hidden">
      <UserData />
        <img
          src={imageUrl.href}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
