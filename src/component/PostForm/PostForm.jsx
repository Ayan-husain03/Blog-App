import React from "react";
import service from "../../Appwrite/conf";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useEffect } from "react";
import { Input, Button, RTE, Select } from "../index";
import Swal from "sweetalert2";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  async function submit(data) {
    try {
      if (post) {
        console.log("from line 26 postform : ", post);
        const file = data.image?.[0]
          ? await service.uploadFile(data.image[0])
          : null;

        if (file) {
          await service.deleteFile(post.featuredImage);
        }
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          Swal.fire({
            icon: "success",
            title: "Post Updated Successfully",
            text: "Your post has been updated successfully.",
            confirmButtonText: "Continue",
            timer: 2000,
          });
        }
      } else {
        const file = await service.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await service.createPost({
            ...data,
            userId: userData.$id,
          });
          Swal.fire({
            icon: "success",
            title: "Post Created Successfully",
            text: "Your post has been created successfully.",
            confirmButtonText: "Continue",
            timer: 2000,
          });
          console.log("49 from post form", data);
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error(
        "error in line 59 PostForm : error for creating post",
        error.message
      );
    }
  }

  // slug tranform function
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "-")
        .replace(/\s+/g, "-");
    } else return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-wrap sm:flex-col md:flex-row">
        {/* first div left side */}
        <div className="md:w-2/3 w-full p-2">
          <Input
            label="Title"
            placeholder="Enter title"
            {...register("title", {
              required: true,
            })}
          />
          {/* this input for slug */}
          <Input
            label="Slug"
            placeholder="Enter Slug"
            {...register("slug", {
              required: true,
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value));
            }}
          />
          {/* this is editior */}
          <RTE
            name="content"
            control={control}
            label="Content"
            defaultValue={getValues("content")}
          />
        </div>
        {/* second div right side */}
        <div className="md:w-1/3 w-full p-2">
          {/* this input for images */}
          <Input
            label="Select Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full my-2">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="status"
            className="mb-4 bg-gray-600"
            {...register("status", { required: true })}
          />
          <Button
            className="w-full"
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
