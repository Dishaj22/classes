
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createPostFn = async (newPost) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createPostFn,

    onSuccess: () => {
      alert("Post created successfully!");
      setTitle("");
      setBody("");
    },
  });

  const { isPending, isError, error, data } = mutation;

  const handleSubmit = (event) => {
    event.preventDefault();

    mutation.mutate({ title, body });
  };

  return (
    <div>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>

        <br />

        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Enter post body"
            required
          />
        </div>

        <br />

        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Post"}
        </button>
      </form>

      {isError && <p>Error: {error.message}</p>}

      {data && (
        <p>Created post ID: {data.id}</p>
      )}
    </div>
  );
}

export default CreatePostForm;
