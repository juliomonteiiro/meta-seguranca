import  React  from "react";
import Select from 'react-select';
import OptionTypeBase from "react-select";
import "./main.css"


export function SelectInput({ className, options, showError, errorMessage, handleChange, optionSelected }) {
  return (
    <>
      <Select 
        className={className + " select " + (showError ? "error" : "")}
        options={options}
        value={optionSelected}
        onChange={handleChange}
      />
      {showError ? <p className="error-message">{errorMessage}</p> : <></>}
    </>
  )
}