import React from "react";
import ReactPropTypes from 'prop-types'
import './button.css'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className="btn"> {text} </button>
    )
}

Button.ReactPropTypes = {
    text: ReactPropTypes.string,
    onClick: ReactPropTypes.object,
}

export default Button;