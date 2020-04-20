import React from "react";

const PersonForm = ({
  nameInput,
  onNameChange,
  numberInput,
  onNumberChange,
  onAdd,
}) => (
  <form>
    <div>
      name: <input value={nameInput} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={numberInput} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={onAdd}>
        add
      </button>
    </div>
  </form>
);

export default PersonForm;
