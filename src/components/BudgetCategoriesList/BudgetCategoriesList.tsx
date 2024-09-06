import { ListGroup, Button, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { BsFillPencilFill, BsFillTrash3Fill, BsBookHalf } from "react-icons/bs";

import BudgetCategoriesAddModal from "../BudgetModals/BudgetCategoriesAddModal";
import BudgetCategoriesEditModal from "../BudgetModals/BudgetCategoriesEditModal";
import MoneyFormat from "../MoneyFormat/MoneyFormat";

import "./BudgetCategoriesList.css";

//Local: http://192.168.100.8:3050
//Remote: https://budget-manager-server-tau.vercel.app

interface categoryList {
  _id: string;
  name: string;
  month: string;
  products: Array<{
    _id?: string | undefined;
    total?: number | undefined;
    paid?: number | undefined;
    count?: number | undefined;
  }>;
}

interface BudgetCategoriesProps {
  month: string;
}

function BudgetCategoriesList(props: BudgetCategoriesProps) {
  const { month } = props;

  const [categoriesEditModalShow, setCategoriesEditModalShow] = useState(false);
  const [categoriesAddModalShow, setCategoriesAddModalShow] = useState(false);
  const [categoriesEditModalTitle, setCategoriesEditModalTitle] = useState("");
  const [categoriesEditModalId, setCategoriesEditModalId] = useState("");
  //const [total, setTotal] = useState(0);
  //const [paid, setPaid] = useState(0);

  const [list, setList] = useState<categoryList[]>([]);

  const url = "https://budget-manager-server-tau.vercel.app";

  useEffect(() => {
    retrieveList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function retrieveList() {
    fetch(`${url}/api/v1/categories/total?month=${month}`, {
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
      })
      .catch((err) => console.log(err));
  }

  function handleCategoriesAddSave(categoryName: string) {
    const data = {
      name: categoryName,
      month: month,
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
                  data={element}
                  onEditModalShow={(title, _id) => {
                    console.log(list);
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

interface BudgetCategoriesListElementProps {
  data: categoryList;
  onEditModalShow: (title: string, _id: string) => void;
  onDelete: (_id: string) => void;
}

export function BudgetCategoriesListElement(
  props: BudgetCategoriesListElementProps
) {
  const { onDelete, onEditModalShow, data } = props;

  return (
    <div id="categories-list-element">
      <div className="categories-list-element-row" id="primary">
        <text id="categories-list-element-title">
          {data.name.charAt(0).toUpperCase() +
            data.name.substring(1).replace("-", " ")}
        </text>
        <text id="categories-list-element-text">
          Planned: <MoneyFormat value={data?.products[0]?.total ?? 0} />
        </text>
        <text id="categories-list-element-text">
          Paid: <MoneyFormat value={data?.products[0]?.paid ?? 0} />
        </text>
        <Badge bg="custom-dark" id="categories-list-element-badge">
          {data?.products[0]?.count ?? 0}
        </Badge>
      </div>
      <div className="categories-list-element-row" id="secondary">
        <Button
          variant="custom-green"
          id="categories-list-element-button"
          href={`${useLocation().pathname}/categories/${data.name
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          <BsBookHalf size="20px" />
        </Button>
        <Button variant="custom-green" id="categories-list-element-button">
          <BsFillPencilFill
            size="20px"
            onClick={() => onEditModalShow(data.name, data._id)}
          />
        </Button>
        <Button variant="custom-green" id="categories-list-element-button">
          <BsFillTrash3Fill size="20px" onClick={() => onDelete(data._id)} />
        </Button>
      </div>
    </div>
  );
}
