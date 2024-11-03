import React from "react";
import Select from 'react-select';
import "./main.css";

export function SelectInput({ className, options, showError, errorMessage, handleChange, placeholder, optionSelected }) {
  return (
    <>
      <Select 
        className={`select-container ${className} select ${showError ? "error" : ""}`}
        classNamePrefix="react-select"
        options={options}
        value={options.find(option => option.value === optionSelected)} // Encontra o objeto correto com base no value
        onChange={(selectedOption) => handleChange({ target: { name: "tipo_servico", value: selectedOption.value } })}
        placeholder={placeholder}
      />
      {showError && <p className="error-message">{errorMessage}</p>}
    </>
  );
}
