import  React  from "react";
import { useEffect, useState } from "react";
import "./main.css"


export function InputText({ className, errorMessage, showError, ...props }) {

  const [error, setError] = useState(showError);
  const [message, setMessage] = useState(errorMessage);

  useEffect(() => {
    setError(showError);
    setMessage(errorMessage);
  }, [showError, errorMessage]);

  return (
    <>
      <div className={className + " div-input " + (error ? "error" : "")}>
        <input
          {...props}
        />
      </div>
      {showError ? <p className="error-message">{message}</p> : <></>}
    </>
  )
}