import { useState } from "react";

interface NamePopupProps {
  setUserName: (name: string) => void;
  closePopup: () => void;
}

function NamePopup({ setUserName, closePopup }: NamePopupProps) {
  const [name, setName] = useState("");

  function handleSave() {
    if (name.trim()) {
      setUserName(name.trim());
      closePopup();
    }
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Введите ваше имя</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя..."
        />
        <button onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  );
}

export default NamePopup;
