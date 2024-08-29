import { ListGroup, Button, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";

import { BsFillPencilFill, BsFillTrash3Fill, BsBookHalf } from "react-icons/bs";

import BudgetCategoriesAddModal from "../BudgetModals/BudgetCategoriesAddModal";
import BudgetCategoriesEditModal from "../BudgetModals/BudgetCategoriesEditModal";

import "./BudgetCategoriesList.css";

//Local: http://192.168.100.8:3050
//Remote: budget-manager-server-tau.vercel.app

interface BudgetCategoriesListElementProps {
  title: string;
  _id: string;
  onEditModalShow: (title: string, _id: string) => void;
  onDelete: (_id: string) => void;
}

interface categoryList {
  _id: string;
  name: string;
  month: string;
}

function BudgetCategoriesList() {
  const [categoriesEditModalShow, setCategoriesEditModalShow] = useState(false);
  const [categoriesAddModalShow, setCategoriesAddModalShow] = useState(false);
  const [categoriesEditModalTitle, setCategoriesEditModalTitle] = useState("");
  const [categoriesEditModalId, setCategoriesEditModalId] = useState("");

  const [list, setList] = useState<categoryList[]>([]);

  const url = "https://budget-manager-server-tau.vercel.app";

  useEffect(() => {
    retrieveList();
  }, []);

  function retrieveList() {
    fetch(`${url}/api/v1/categories`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList((list) => {
          console.log(list);
          return data.categories;
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function handleCategoriesAddSave(categoryName: string) {
    const data = {
      name: categoryName,
      month: "Next",
    };
    fetch(`${url}/api/v1/categories/add`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => retrieveList())
      .catch((err) => console.log(err));
    setCategoriesAddModalShow(false);
  }

  const handleCategoriesEditSave = (categoryName: string) => {
    const data = {
      name: categoryName,
      month: "Next",
      _id: categoriesEditModalId,
    };
    fetch(`${url}/api/v1/categories/edit`, {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => retrieveList())
      .catch((err) => console.log(err));
    setCategoriesEditModalShow(false);
  };

  function handleCategoryDelete(_id: string) {
    const data = {
      _id: _id,
    };
    fetch(`${url}/api/v1/categories/delete`, {
      method: "delete",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => retrieveList())
      .catch((err) => console.log(err));
  }

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
                  onDelete={(_id) => handleCategoryDelete(_id)}
                  title={element.name}
                  _id={element._id}
                  onEditModalShow={(title, _id) => {
                    setCategoriesEditModalTitle(title);
                    setCategoriesEditModalId(_id);
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
  const { title, _id, onDelete, onEditModalShow } = props;

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
          href={`/categories/${title.toLowerCase().replace(" ", "-")}`}
        >
          <BsBookHalf size="20px" />
        </Button>
        <Button variant="custom-green" id="categories-list-element-button">
          <BsFillPencilFill
            size="20px"
            onClick={() => onEditModalShow(title, _id)}
          />
        </Button>
        <Button variant="custom-green" id="categories-list-element-button">
          <BsFillTrash3Fill size="20px" onClick={() => onDelete(_id)} />
        </Button>
      </div>
    </div>
  );
}
