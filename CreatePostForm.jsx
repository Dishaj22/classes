import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreatePostForm() {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      setTitle("");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    mutation.mutate({
      title: title,
      body: "My new post",
      userId: 1,
    });
  }

  return (
    <div>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <button type="submit">
          Create Post
        </button>
      </form>

      {mutation.isPending && <p>Creating post...</p>}

      {mutation.isSuccess && <p>Post created!</p>}

      {mutation.isError && <p>Something went wrong!</p>}
    </div>
  );
}

export default CreatePostForm;
