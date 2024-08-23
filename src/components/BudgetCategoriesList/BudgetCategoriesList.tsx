import { ListGroup, Button, Badge } from "react-bootstrap";
import { useState } from "react";

import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

import BudgetCategoriesEditModal from "../Modals/BudgetCategoriesEditModal";

import "./BudgetCategoriesList.css";

interface BudgetCategoriesListElementProps {
  title: string;
}

function BudgetCategoriesList() {
  const [list, setList] = useState(["Miscellaneous", "Online Shopping"]);
  const [categoriesEditModalShow, setCategoriesEditModalShow] = useState(false);

  return (
    <>
      <div id="categories-list">
        {list.length > 0 ? (
          <ListGroup>
            {list.map((element) => (
              <ListGroup.Item
                className="d-flex align-items-start"
                style={{ padding: "10px" }}
              >
                <BudgetCategoriesListElement title={element} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <text id="categories-text">There's no categories yet</text>
        )}
      </div>
      <div id="categories-button">
        <Button
          id="categories-button-btn"
          variant="custom"
          //onClick={() => setList((list) => [...list, "Test"])}
          onClick={() => setCategoriesEditModalShow(true)}
        >
          Add
        </Button>
      </div>
      <BudgetCategoriesEditModal
        show={categoriesEditModalShow}
        onHide={() => {
          setCategoriesEditModalShow(false);
          setList((list) => [...list, "Test"]);
        }}
      />
    </>
  );
}

export default BudgetCategoriesList;

export function BudgetCategoriesListElement(
  props: BudgetCategoriesListElementProps
) {
  const { title } = props;

  return (
    <div id="categories-list-element">
      <div className="categories-list-element-row" id="primary">
        <text id="categories-list-element-title">{title}</text>
        <text id="categories-list-element-text">Planned: $3.000.000</text>
        <text id="categories-list-element-text">Paid: $5.000.000</text>
        <Badge bg="custom-dark" id="categories-list-element-badge">
          10
        </Badge>
      </div>
      <div className="categories-list-element-row" id="secondary">
        <Button variant="custom-green" id="categories-list-element-button">
          <BsFillPencilFill size="20px" />
        </Button>
        <Button variant="custom-green" id="categories-list-element-button">
          <BsFillTrash3Fill size="20px" />
        </Button>
      </div>
    </div>
  );
}
