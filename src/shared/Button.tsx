import "./Button.css";

type ButtonProps = {
    onClick?: () => void;
    filled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    const classNames = "huddle-button" + (props.filled ? " huddle-button-filled" : " huddle-button-unfilled");
    return <button className={classNames} onClick={props.onClick}>{props.children}</button>
}
export default Button