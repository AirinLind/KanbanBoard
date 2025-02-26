import "../styles/App.scss";

interface AddProps {
  addTodo: (title: string) => void;
}

function Add({ addTodo }: AddProps) {
  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter" && target.value.trim() !== "") {
      addTodo(target.value);
      target.value = "";
    }
  }

  return (
    <div className="input_elem">
      <input onKeyUp={handleKeyUp} placeholder="Добавить задачу..." />
    </div>
  );
}

export default Add;
