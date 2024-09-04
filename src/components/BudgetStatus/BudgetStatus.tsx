import { Accordion, Table } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useState, useEffect } from "react";

import MoneyFormat from "../MoneyFormat/MoneyFormat";

import { BsFillPencilFill, BsFloppyFill } from "react-icons/bs";

import "./BudgetStatus.css";

interface BudgetStatusProps {
  month: string;
}

function BudgetStatus(props: BudgetStatusProps) {
  const { month } = props;

  const [editBalance, setEditBalance] = useState(false);
  const [editBudget, setEditBudget] = useState(false);

  const [values, setValues] = useState({
    budget: 0,
    planned: 0,
    currentBalance: 0,
    paid: 0,
  });

  const left = values.budget - values.planned;
  const offBalance = values.budget - values.paid - values.currentBalance;

  const url = "budget-manager-server-tau.vercel.app";

  useEffect(() => {
    retrieveValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function retrieveValues() {
    fetch(`${url}/api/v1/balance/total?month=${month}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setValues({
          ...values,
          planned: data.balance[0].total,
          paid: data.balance[0].paid,
        });
      })
      .catch((err) => console.log(err));
  }

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
            Off-balance: <MoneyFormat value={offBalance} />
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
                    <BsFloppyFill
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
                  <MoneyFormat value={left} />
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
                    <BsFloppyFill
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
