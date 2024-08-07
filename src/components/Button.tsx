import { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    isLoading: boolean;
    onClick: () => void;
}

function Button({ children, isLoading, onClick }: Props) {
  return (
    <button onClick={onClick} disabled={isLoading} type="button" className={`btn btn-${isLoading ? "secondary" : "primary"}`}>{isLoading ? "Loading..." : children}</button>
  )
}

export default Button