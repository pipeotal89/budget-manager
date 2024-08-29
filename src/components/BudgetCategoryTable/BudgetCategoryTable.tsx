import { Table } from "react-bootstrap";
import { useState } from "react";

import { BsFillTrash3Fill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";

import MoneyFormat from "../MoneyFormat/MoneyFormat";

import "./BudgetCategoryTable.css";

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

  function handlePay() {
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

  function handleDelete(productName: string) {
    setProducts((products) =>
      products.filter((product) => product.productName !== productName)
    );
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
                handlePay={handlePay}
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
    </div>
  );
}

export default BudgetCategoryTable;

interface BudgetCategoryTableElementProps {
  productName: string;
  vendor: string;
  value: number;
  paid: number;
  paymentDate: string;
  handlePay: () => void;
  handleDelete: (productName: string) => void;
}

export function BudgetCategoryTableElement(
  props: BudgetCategoryTableElementProps
) {
  const {
    productName,
    vendor,
    value,
    paid,
    paymentDate,
    handlePay,
    handleDelete,
  } = props;

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
          onClick={handlePay}
        />
        <BsFillTrash3Fill
          size="25px"
          style={{ margin: "0 10px 0 10px" }}
          onClick={() => handleDelete(productName)}
        />
      </td>
    </tr>
  );
}
