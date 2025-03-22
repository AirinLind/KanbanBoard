import { Input } from "../../ui";
import "../../styles/App.scss";
import { AddProps } from "./Add.types";

export const Add = ({ addTodo }: AddProps) => {
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
};