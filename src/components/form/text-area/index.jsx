import  React  from "react";
import { useEffect, useState } from "react";
import "./main.css"


export function TextArea({ className, errorMessage, showError, ...props }) {

  const [error, setError] = useState(showError);
  const [message, setMessage] = useState(errorMessage);
  
  useEffect(() => {
    setError(showError);
    setMessage(errorMessage);
  }, [showError, errorMessage]);

  return (
    <>
      <textarea 
        className={className + " div-input " + (error ? "error" : "")} 
        {...props}
      >
      </textarea>
      {error ? <p className="error-message">{message}</p> : <></>}
    </>
  )
}