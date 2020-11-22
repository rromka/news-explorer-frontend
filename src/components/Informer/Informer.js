import './Informer.css'
import React from "react";

function Informer({text, isTooltip}) {

  return (
    <span className={`informer ${isTooltip ? 'informer_type_tooltip' : ''}`}>{text}</span>
  )
}

export default Informer
