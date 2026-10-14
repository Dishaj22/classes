
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function LikeButton({ postId, likeCount }) {
  const queryClient = useQueryClient();
  const queryKey = ["posts", postId];

  // Cache mein post ka data rakhenge
  const { data: post } = useQuery({
    queryKey,
    queryFn: async () => {
      return (
        queryClient.getQueryData(queryKey) || {
          id: postId,
          likes: likeCount,
        }
      );
    },
    initialData: {
      id: postId,
      likes: likeCount,
    },
    staleTime: Infinity,
  });

  const mutation = useMutation({
    // Fake POST request: practice ke liye
    mutationFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
            action: "like",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Like request failed");
      }

      return response.json();
    },

    // Request se pehle count turant badhao
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousPost = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldPost) => ({
        ...oldPost,
        likes: oldPost.likes + 1,
      }));

      return { previousPost };
    },

    // Request fail ho toh purana count wapas lao
    onError: (error, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(queryKey, context.previousPost);
      }
    },

    // Request complete hone par query invalidate karo
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <div>
      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        ❤️ Like ({post.likes})
      </button>

      {mutation.isPending && <p>Liking...</p>}
      {mutation.isError && <p>Like failed. Please try again.</p>}
      {mutation.isSuccess && <p>Liked successfully!</p>}
    </div>
  );
}

export default LikeButton;
