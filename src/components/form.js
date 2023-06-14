import React, { useState } from "react";

//useState hook'u kullanarak, bileşenin içinde name adında bir state tanımlanıyor.
// setName fonksiyonu, bu state'in değerini değiştirir.
//handleChange fonksiyonu, input alanına girilen değeri takip eden bir onChange olayı tetikler
//ve name state'inin değerini değiştirir.
// handleSubmit fonksiyonu, formun submit edilmesi durumunda tetiklenir
// ve addTask fonksiyonunu çağırarak, yeni bir görev ekler.
const Form = ({ addTask }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    addTask(name);
    setName("");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
};

export default Form;
