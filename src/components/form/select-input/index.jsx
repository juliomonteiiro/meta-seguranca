import { SelectHTMLAttributes } from "react";
import Select from 'react-select';
import OptionTypeBase from "react-select";
import "./main.css"


  
  export function SelectInput () {
    return (
      <>
        <Select 
         
        />
        {showError ? <p className="error-message">{errorMessage}</p> : <></>}
      </>
    )
  }