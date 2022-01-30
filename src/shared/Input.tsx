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
    initialValue?: string
    enterOnUnfocus?: boolean
}


const Input: React.FC<InputProps> = (props) => {
    const [value, setValue] = React.useState(props.initialValue || "");
    if(props.initialValue&&value==""){
        setValue(props.initialValue);
    }
    return (<input style={props.style} className="huddle-input" placeholder={props.description} type={props.type} value={value}
        onChange={e => {
            const value = e.target.value
            if (props.valueRef) {
                props.valueRef.value = value
            }
            props.onChange?.(value)
            setValue(value)
        }
        }
        onKeyPress={(e) => {
            if (e.key == "Enter") {
                props.onEnter?.(e.currentTarget.value)
                if (props.clearOnEnter) {
                    setValue("")
                }
            }
        }}
        onBlur={e => {
            if (!props.enterOnUnfocus) return
            props.onEnter?.(e.currentTarget.value)
            if (props.clearOnEnter) {
                setValue("")
            }
        }
        }
        autoComplete={props.autoComplete}
    />)
}
export default Input