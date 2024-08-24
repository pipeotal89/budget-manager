import { ReactNode } from "react";
import Card from "react-bootstrap/Card";

import "./BudgetCard.css";

interface CardProps {
  children?: ReactNode;
  title: string;
}

function BudgetCard(props: CardProps) {
  const { children, title } = props;

  return (
    <Card id="card">
      <Card.Title id="card-title">
        <text id="card-title-text">{title}</text>
      </Card.Title>
      <Card.Body id="card-content">{children}</Card.Body>
    </Card>
  );
}

export default BudgetCard;
