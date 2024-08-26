import { ListGroup, Button, Badge } from "react-bootstrap";
import { useState } from "react";

import { BsFillPencilFill, BsFillTrash3Fill, BsBookHalf } from "react-icons/bs";

import {
  BudgetCategoriesAddModal,
  BudgetCategoriesEditModal,
} from "../BudgetModals/BudgetModals";

import "./BudgetCategoriesList.css";

interface BudgetCategoriesListElementProps {
  title: string;
  onEditModalShow: (title: string) => void;
  onDelete: () => void;
}

function BudgetCategoriesList() {
  const [list, setList] = useState<string[]>([]);
  const [categoriesEditModalShow, setCategoriesEditModalShow] = useState(false);
  const [categoriesAddModalShow, setCategoriesAddModalShow] = useState(false);
  const [categoriesEditModalTitle, setCategoriesEditModalTitle] = useState("");

  const handleCategoriesAddSave = (value: string) => {
    setCategoriesAddModalShow(false);
    setList([...list, value]);
  };

  const handleCategoriesEditSave = (value: string) => {
    setCategoriesEditModalShow(false);
    const new_arr = [...list];
    new_arr[list.indexOf(categoriesEditModalTitle)] = value;
    setList(new_arr);
  };

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
                <BudgetCategoriesListElement
                  onDelete={() =>
                    setList((list) => list.filter((item) => item !== element))
                  }
                  title={element}
                  onEditModalShow={(title) => {
                    setCategoriesEditModalTitle(title);
                    setCategoriesEditModalShow(true);
                  }}
                />
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
          onClick={() => setCategoriesAddModalShow(true)}
        >
          Add
        </Button>
      </div>
      <BudgetCategoriesAddModal
        showCategoriesAddModal={categoriesAddModalShow}
        onCategoriesAddHide={() => {
          setCategoriesAddModalShow(false);
        }}
        onCategoriesAddSave={handleCategoriesAddSave}
      />
      <BudgetCategoriesEditModal
        categoriesEditTitle={categoriesEditModalTitle}
        showCategoriesEditModal={categoriesEditModalShow}
        onCategoriesEditHide={() => {
          setCategoriesEditModalShow(false);
        }}
        onCategoriesEditSave={handleCategoriesEditSave}
      />
    </>
  );
}

export default BudgetCategoriesList;

export function BudgetCategoriesListElement(
  props: BudgetCategoriesListElementProps
) {
  const { title, onDelete, onEditModalShow } = props;

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
        <Button
          variant="custom-green"
          id="categories-list-element-button"
          href="/categories"
        >
          <BsBookHalf size="20px" />
        </Button>
        <Button variant="custom-green" id="categories-list-element-button">
          <BsFillPencilFill
            size="20px"
            onClick={() => onEditModalShow(title)}
          />
        </Button>
        <Button variant="custom-green" id="categories-list-element-button">
          <BsFillTrash3Fill size="20px" onClick={onDelete} />
        </Button>
      </div>
    </div>
  );
}
