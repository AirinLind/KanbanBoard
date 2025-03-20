import { Input } from "../ui/Input";
import "../styles/App.scss";

type AddProps = {
  addTodo: (title: string) => void;
};

export function Add({ addTodo }: AddProps) {
  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter" && target.value.trim() !== "") {
      addTodo(target.value);
      target.value = "";
    }
  }

  return (
    <div className="input_elem">
      <Input onKeyUp={handleKeyUp} placeholder="Добавить задачу..." />
    </div>
  );
}
