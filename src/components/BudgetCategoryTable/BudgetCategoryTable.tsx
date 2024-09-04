import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import { BsFillTrash3Fill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";

import MoneyFormat from "../MoneyFormat/MoneyFormat";
import BudgetProductsAddModal, {
  productsInterface,
} from "../BudgetModals/BudgetProductsAddModal";

import "./BudgetCategoryTable.css";

interface productsList {
  _id: string;
  name: string;
  value: number;
  paid: number;
  payment_date: string;
  vendor: string;
  category: string;
  month: string;
}

interface BudgetCategoryTableProps {
  month: string;
  category: string;
}

function BudgetCategoryTable(props: BudgetCategoryTableProps) {
  const { month, category } = props;

  const url = "budget-manager-server-tau.vercel.app";

  const [productsAddModalShow, setProductsAddModalShow] = useState(false);

  const [products, setProducts] = useState<productsList[]>([]);

  useEffect(() => {
    retrieveProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function retrieveProducts() {
    fetch(`${url}/api/v1/products?month=${month}&category=${category}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((products) => {
          console.log(products);
          return data.products;
        });
      })
      .catch((err) => console.log(err));
  }

  function handleDelete(productName: string) {
    setProducts((products) =>
      products.filter((product) => product.name !== productName)
    );
  }

  function handleProductsSave(product: productsInterface) {
    console.log(product);
    const data = {
      name: product.name,
      value: parseInt(product.value!.replace(/[$,]/g, "")),
      vendor: product.vendor,
      category: category,
      month: month,
    };
    console.log(JSON.stringify(data));
    fetch(`${url}/api/v1/products/add`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => retrieveProducts())
      .catch((err) => console.log(err));
    setProductsAddModalShow(false);
  }

  return (
    <>
      <div id="category-button">
        <Button
          variant="custom-green"
          id="category-button-btn"
          onClick={() => {
            setProductsAddModalShow(true);
          }}
        >
          Add product
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table hover variant="dark" id="category-table">
          <thead>
            <tr>
              <th className="category-table-header">Product Name</th>
              <th className="category-table-header">Vendor</th>
              <th className="category-table-header">Value</th>
              <th className="category-table-header">Paid from Product</th>
              <th className="category-table-header">Payment Date</th>
              <th className="category-table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <BudgetCategoryTableElement
                  product={product}
                  handlePay={() => console.log("Test")}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <text id="categories-text">
                There's no products in this category
              </text>
            )}
          </tbody>
        </Table>
        <BudgetProductsAddModal
          showProductsAddModal={productsAddModalShow}
          onProductsAddHide={() => {
            setProductsAddModalShow(false);
          }}
          onProductsAddSave={(product: productsInterface) =>
            handleProductsSave(product)
          }
        />
      </div>
    </>
  );
}

export default BudgetCategoryTable;

interface BudgetCategoryTableElementProps {
  product: productsList;
  handlePay: () => void;
  handleDelete: (productName: string) => void;
}

export function BudgetCategoryTableElement(
  props: BudgetCategoryTableElementProps
) {
  const { product, handlePay, handleDelete } = props;

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.vendor}</td>
      <td>
        <MoneyFormat value={product.value} />
      </td>
      <td>
        <MoneyFormat value={product.paid} />
      </td>
      <td>{product.payment_date}</td>
      <td id="category-table-actions">
        <FaMoneyBillWave
          size="25px"
          style={{ margin: "0 10px 0 10px" }}
          onClick={handlePay}
        />
        <BsFillTrash3Fill
          size="25px"
          style={{ margin: "0 10px 0 10px" }}
          onClick={() => handleDelete(product.name)}
        />
      </td>
    </tr>
  );
}
