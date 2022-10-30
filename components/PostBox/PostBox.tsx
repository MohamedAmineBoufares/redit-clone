import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Avatar from "../Avatar/Avatar";

import { useForm, SubmitHandler } from "react-hook-form";
import { FormData } from "../../utils/types";
import { useState } from "react";

function PostBox() {
  const { data: session } = useSession();

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
  });

  return (
    <form
      className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
      onSubmit={onSubmit}
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          disabled={!session}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type="text"
          placeholder={
            session ? "Create a post by entering a title" : "Sign in to post..."
          }
          {...register("postTitle", { required: true })}
        />

        <PhotoIcon
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && "text-blue-300"
          }`}
          onClick={() => setImageBoxOpen((prevState) => !prevState)}
        />
        <LinkIcon className="h-6 text-gray-300 cursor-pointer" />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="Text (optional)"
              {...register("postBody")}
            />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="i.e. programming"
              {...register("subreddit", { required: true })}
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="Optional..."
                {...register("postImage")}
              />
            </div>
          )}

          {!!Object.keys(errors).length && (
            <div className="space-x-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- A post title is required!</p>
              )}

              {errors.subreddit?.type === "required" && (
                <p>- A subreddit is required!</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              className="w-full rounded-full bg-blue-400 p-2 text-white"
              type="submit"
            >
              Create post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
