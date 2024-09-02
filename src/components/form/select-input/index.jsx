import  React  from "react";
import Select from 'react-select';
import "./main.css"


export function SelectInput({ className, options, showError, errorMessage, handleChange, placeholder, optionSelected }) {
  return (
    <>
      <Select 
        className={className + " select " + (showError ? "error" : "")}
        options={options}
        value={optionSelected}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {showError ? <p className="error-message">{errorMessage}</p> : <></>}
    </>
  )
}