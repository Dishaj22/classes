
import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
  const res = await fetch("http://localhost:3000/todos");

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
};

export default function TodoList() {
  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

 if (isError) {
  return <p>Error loading todos. Please check the API.</p>;
}

  return (
    <div>
      <h2>Todo List</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? "Completed" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
