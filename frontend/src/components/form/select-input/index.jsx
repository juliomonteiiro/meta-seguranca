import React from "react";
import Select from 'react-select';
import "./main.css";

export function SelectInput({
  className,
  options = [], // Garantir que `options` seja um array, se não for passado
  showError,
  errorMessage,
  handleChange,
  placeholder,
  optionSelected
}) {
  // Garantir que o valor selecionado seja válido
  const selectedOption = options.find(option => option.value === optionSelected);

  return (
    <>
      <Select
        className={`select-container ${className} select ${showError ? "error" : ""}`}
        classNamePrefix="react-select"
        options={options}
        value={selectedOption || null} // Se `selectedOption` for `undefined`, será passado `null` para o Select
        onChange={(selectedOption) => handleChange({ target: { name: "tipo_servico", value: selectedOption.value } })}
        placeholder={placeholder}
      />
      {showError && <p className="error-message">{errorMessage}</p>}
    </>
  );
}

