import "./Input.css";

type InputProps = {
    onChange?: (newValue: string) => void
    multiline?: boolean
    description?: string
    type?: string
    autoComplete?: string
}
const Input: React.FC<InputProps> = (props) => {
    return (<input className="huddle-input" placeholder={props.description} type={props.type}
        onChange={e => props.onChange?.(e.target.value)}
        autoComplete={props.autoComplete}
    />)
}
export default Input