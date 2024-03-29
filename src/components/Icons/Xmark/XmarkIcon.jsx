import * as React from "react"
import "./XmarkIcon.css"

function XmarkIcon(props) {
  return (
    <svg
      className="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
      {...props}
    >
      <circle
        className="path circle"
        fill="none"
        stroke="#D06079"
        strokeWidth={6}
        strokeMiterlimit={10}
        cx={65.1}
        cy={65.1}
        r={62.1}
      />
      <path
        className="path line"
        fill="none"
        stroke="#D06079"
        strokeWidth={6}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M34.4 37.9L95.8 92.3"
      />
      <path
        className="path line"
        fill="none"
        stroke="#D06079"
        strokeWidth={6}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M95.8 38L34.4 92.2"
      />
    </svg>
  )
}

export default XmarkIcon
