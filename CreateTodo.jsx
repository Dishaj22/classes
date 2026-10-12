
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateTodo() {
  const queryClient = useQueryClient();

  const createTodo = async (newTodo) => {
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!res.ok) {
      throw new Error("Failed to create todo");
    }

    return res.json();
  };

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          title: "New Item",
          completed: false,
        })
      }
    >
      {mutation.isPending ? "Adding..." : "Add Todo"}
    </button>
  );
}
