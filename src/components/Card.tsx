import { ReactNode } from "react";
import { useState } from "react";

interface CardProps {
    children: ReactNode,
}

interface CardBodyProps {
    title: string,
    text?: string,
}

function Card(props: CardProps) {

    const { children } = props;

    return (
        <div className="card" style={{
            width: "350px",
        }}>
            <div className="card-body">
                {children}
            </div>
        </div>
    )

}

export function CardBody(props: CardBodyProps) {

    const { title, text } = props;

    return (
        <>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
        </>
    )

}

export function Button() {

    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setButtonClicked(true)
    }

    const button = buttonClicked ? <button type="button" className="btn btn-secondary" disabled>Cargando...</button> : <button type="button" className="btn btn-primary" onClick={handleClick}>Hola mundo</button>

    return (
        <>
            {button}
        </>
    )

}

export default Card;
