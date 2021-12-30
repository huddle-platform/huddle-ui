import React from "react";
import "./Input.css";

type InputProps = {
    onChange?: (newValue: string) => void
    multiline?: boolean
    description?: string
    type?: string
    autoComplete?: string
    valueRef?: { value?: string }
    clearOnEnter?: boolean
    onEnter?: (message: string) => void
    style?: React.CSSProperties
}


const Input: React.FC<InputProps> = (props) => {
    return (<input style={props.style} className="huddle-input" placeholder={props.description} type={props.type}
        onChange={e => {
            const value = e.target.value
            if (props.valueRef) {
                props.valueRef.value = value
            }
            props.onChange?.(value)
        }
        }
        onKeyPress={(e) => {
            if (e.key == "Enter") {
                props.onEnter?.(e.currentTarget.value)
                if (props.clearOnEnter) {
                    e.currentTarget.value = ""
                }
            }
        }}
        autoComplete={props.autoComplete}
    />)
}
export default Input