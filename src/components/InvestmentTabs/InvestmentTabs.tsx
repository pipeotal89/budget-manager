import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MoneyFormat from "../MoneyFormat/MoneyFormat";

import { useState } from "react";
import { Button } from "react-bootstrap";

import "./InvestmentTabs.css";

function InvestmentTabs() {
  const [invested, setInvested] = useState({
    value: 0,
    return_rate: 0.15,
  });

  const return_value = invested.value * invested.return_rate;
  const total = invested.value + return_value;

  return (
    <Tabs
      defaultActiveKey="investment"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="investment" title="Investment">
        <div id="investment-tab">
          <div>
            <text className="investment-value">
              Invested: <MoneyFormat value={invested.value} />
              <br />
            </text>
            <text className="investment-value">
              Return Rate: {invested.return_rate * 100}%
              <br />
            </text>
            <text className="investment-value">
              Return Value:{" "}
              <MoneyFormat value={parseFloat(return_value.toFixed(2))} />
              <br />
            </text>
            <text className="investment-value">
              Total: <MoneyFormat value={parseFloat(total.toFixed(2))} />
              <br />
            </text>
            <text className="investment-value">
              Return Date: 25/05/2024
              <br />
            </text>
          </div>
          <div id="investment-button">
            <Button
              id="investment-button-btn"
              variant="custom"
              onClick={() =>
                setInvested({
                  ...invested,
                  value: 700000,
                  return_rate: 0.0072158,
                })
              }
            >
              Edit
            </Button>
          </div>
        </div>
      </Tab>
      <Tab eventKey="planned" title="Planned">
        Tab content for Profile
      </Tab>
    </Tabs>
  );
}

export default InvestmentTabs;
