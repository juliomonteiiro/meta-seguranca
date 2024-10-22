import  React  from "react";
import "./main.css"

export function Button({children, className, ...props}) {

  return (
    <button
      className={className + ' button'}
      {...props}
    >
      {children}
    </button>
  )
}