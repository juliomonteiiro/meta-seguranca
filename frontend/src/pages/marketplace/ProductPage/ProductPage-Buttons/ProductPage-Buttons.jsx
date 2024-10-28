import React from "react";
import './ProductPage-Buttons.css';

export function ProductButton({children, className, ...props}) {
  return (
    <button
      className={className + ' ProductButton'}
      {...props}
    >
      {children}
    </button>
  )
}