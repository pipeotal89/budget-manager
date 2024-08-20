import { Accordion, Table } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";

import MoneyFormat from "../MoneyFormat/MoneyFormat";

import { BsFillPencilFill, BsHandThumbsUpFill } from "react-icons/bs";

import "./BudgetStatus.css";

function BudgetStatus() {
  const [editBalance, setEditBalance] = useState(false);
  const [editBudget, setEditBudget] = useState(false);

  const [values, setValues] = useState({
    offBalance: 3000000,
    budget: 1200000,
    planned: 1500000,
    left: 2200000,
    currentBalance: 500000,
    paid: 1200000,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: parseInt(e.target.value.replace(/[$,]/g, "")),
    });
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header id="status-header">
          <text id="status-header-text">
            Off-balance: <MoneyFormat value={values.offBalance} />
          </text>
        </Accordion.Header>
        <Accordion.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th style={{ width: "45%" }}>Name</th>
                <th style={{ width: "45%" }}>Value</th>
                <th style={{ width: "10%" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Budget</td>
                <td>
                  {editBudget ? (
                    <CurrencyInput
                      id="status-input"
                      prefix="$"
                      name="budget"
                      onChange={onInputChange}
                      defaultValue={values.budget}
                    />
                  ) : (
                    <MoneyFormat value={values.budget} />
                  )}
                </td>
                <td>
                  {editBudget ? (
                    <BsHandThumbsUpFill
                      className="button"
                      onClick={() => setEditBudget(false)}
                    />
                  ) : (
                    <BsFillPencilFill
                      className="button"
                      onClick={() => setEditBudget(true)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Planned</td>
                <td>
                  <MoneyFormat value={values.planned} />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Left</td>
                <td>
                  <MoneyFormat value={values.left} />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Current Balance</td>
                <td>
                  {editBalance ? (
                    <CurrencyInput
                      id="status-input"
                      prefix="$"
                      name="currentBalance"
                      onChange={onInputChange}
                      defaultValue={values.currentBalance}
                    />
                  ) : (
                    <MoneyFormat value={values.currentBalance} />
                  )}
                </td>
                <td>
                  {editBalance ? (
                    <BsHandThumbsUpFill
                      className="button"
                      onClick={() => setEditBalance(false)}
                    />
                  ) : (
                    <BsFillPencilFill
                      className="button"
                      onClick={() => setEditBalance(true)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Paid from Planned</td>
                <td>
                  <MoneyFormat value={values.paid} />
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BudgetStatus;
