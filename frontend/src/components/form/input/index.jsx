import React, { useEffect, useState } from "react";
import "./main.css";

export function InputText({ className, errorMessage, showError, placeholder, ...props }) {
  const [error, setError] = useState(showError);
  const [message, setMessage] = useState(errorMessage);

  useEffect(() => {
    setError(showError);
    setMessage(errorMessage);
  }, [showError, errorMessage]);

  return (
    <>
      <div className={`${className} div-input ${error ? "error" : ""}`}>
        <input className="Input" placeholder={placeholder} {...props} />
      </div>
      {error && <p className="error-message">{message}</p>}
    </>
  );
}
