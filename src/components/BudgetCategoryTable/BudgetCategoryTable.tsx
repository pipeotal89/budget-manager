import { Table } from "react-bootstrap";
import { useState } from "react";

import { BsFillTrash3Fill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";

import MoneyFormat from "../MoneyFormat/MoneyFormat";

import "./BudgetCategoryTable.css";

interface BudgetCategoryTableElementProps {
  productName: string;
  vendor: string;
  value: number;
  paid: number;
  paymentDate: string;
  handleClick: () => void;
}

function BudgetCategoryTable() {
  const [products, setProducts] = useState([
    {
      productName: "iPhone 13",
      vendor: "Mercado Libre",
      value: 30000005,
      paid: 3000000,
      paymentDate: "25/04/2024",
    },
  ]);

  function handleClick() {
    setProducts([
      ...products,
      {
        productName: "Test",
        vendor: "Test",
        value: 1400000,
        paid: 1200000,
        paymentDate: "25/05/2024",
      },
    ]);
  }

  return (
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
                productName={product.productName}
                vendor={product.vendor}
                value={product.value}
                paid={product.paid}
                paymentDate={product.paymentDate}
                handleClick={handleClick}
              />
            ))
          ) : (
            <text id="categories-text">
              There's no products in this category
            </text>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default BudgetCategoryTable;

export function BudgetCategoryTableElement(
  props: BudgetCategoryTableElementProps
) {
  const { productName, vendor, value, paid, paymentDate, handleClick } = props;

  return (
    <tr>
      <td>{productName}</td>
      <td>{vendor}</td>
      <td>
        <MoneyFormat value={value} />
      </td>
      <td>
        <MoneyFormat value={paid} />
      </td>
      <td>{paymentDate}</td>
      <td id="category-table-actions">
        <FaMoneyBillWave
          size="25px"
          style={{ margin: "0 10px 0 10px" }}
          onClick={handleClick}
        />
        <BsFillTrash3Fill size="25px" style={{ margin: "0 10px 0 10px" }} />
      </td>
    </tr>
  );
}
