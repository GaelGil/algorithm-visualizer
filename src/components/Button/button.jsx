import React from "react";
import ReactPropTypes from 'prop-types'
import './button.css'

const Button = ({ text }) => {
    return (
        <button className="btn"> {text} </button>
    )
}

Button.ReactPropTypes = {
    text: ReactPropTypes.string,
}

export default Button;