import React from "react";
import "./Input.css";

type InputProps = {
    onChange?: (newValue: string) => void
    multiline?: boolean
    description?: string
    type?: string
    autoComplete?: string
    valueRef?:{value?:string}
}


const Input: React.FC<InputProps> = (props) => {
    return (<input className="huddle-input" placeholder={props.description} type={props.type}
        onChange={e => {
            const value=e.target.value
            if(props.valueRef){
                props.valueRef.value=value
            }
            props.onChange?.(value)}
        }
        autoComplete={props.autoComplete}
    />)
}
export default Input