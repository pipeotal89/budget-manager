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
    planned: 0,
    paid: 0,
  });

  const [status, setStatus] = useState({
    budget: 0,
    current: 0,
  });

  const [editedStatus, setEditedStatus] = useState({
    budget: 0,
    current: 0,
  });

  const left = status.budget - values.planned;
  const offBalance = status.budget - values.paid - status.current;

  const url = "https://budget-manager-server-tau.vercel.app";

  useEffect(() => {
    retrieveValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    retrieveStatus();
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

  function retrieveStatus() {
    fetch(`${url}/api/v1/balance/status?month=${month}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus({
          ...status,
          budget: data.status[0].budget,
          current: data.status[0].current,
        });
      })
      .catch((err) => console.log(err));
  }

  function handleEditBudget() {
    const data = {
      month: month,
      budget: editedStatus.budget,
    };
    fetch(`${url}/api/v1/balance/status/edit`, {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => retrieveStatus())
      .catch((err) => console.log(err));
    setEditBudget(false);
  }

  function handleEditCurrent() {
    const data = {
      month: month,
      current: editedStatus.current,
    };
    fetch(`${url}/api/v1/balance/status/edit`, {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => retrieveStatus())
      .catch((err) => console.log(err));
    setEditBudget(false);
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedStatus({
      ...editedStatus,
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
                      defaultValue={status.budget}
                    />
                  ) : (
                    <MoneyFormat value={status.budget} />
                  )}
                </td>
                <td>
                  {editBudget ? (
                    <BsFloppyFill
                      className="button"
                      onClick={() => {
                        handleEditBudget();
                        setEditBudget(false);
                      }}
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
                      name="current"
                      onChange={onInputChange}
                      defaultValue={status.current}
                    />
                  ) : (
                    <MoneyFormat value={status.current} />
                  )}
                </td>
                <td>
                  {editBalance ? (
                    <BsFloppyFill
                      className="button"
                      onClick={() => {
                        handleEditCurrent();
                        setEditBalance(false);
                      }}
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
