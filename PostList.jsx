
import { useQuery } from "@tanstack/react-query";

function PostList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <h3>Loading posts...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <div>
      <h2>Post List</h2>

      {data.slice(0, 10).map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;