import React, { useState, type ReactElement, type ReactNode, useEffect } from "react";
import type { JsxElement } from "typescript";
interface IAlert {
  children: ReactNode;
  color?: string;
  show?: boolean
}
const Alert = ({ color, children, show}: IAlert) => {
  const [showInternal,setShowInternal] = useState(show ?? true)
  let colorClassName = "bg-green-50 text-green-500";

  useEffect(()=> {
    const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setShowInternal(false)
      }, 5000)
  
      return () => {
        clearTimeout(timeId)
      }
  },[])
  return (
    <>
      {showInternal && (
        <div className={`mx-4 rounded-md p-4 text-sm ${colorClassName}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default Alert;
