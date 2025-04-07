  import React from 'react'

function Button_b({ action, children, openLinkInNewTab, className }) {
  if (!className) {
    className = "action-button"
  }
  return (
    <button className={className} target={openLinkInNewTab ? "_blank" : "_self"} onClick={action}>
      {children}
    </button>
  )
}

export default Button_b
