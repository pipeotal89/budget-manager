import { Accordion, Table } from "react-bootstrap";
import "./BudgetStatus.css";

const values = [
  "$3'000.000",
  "$1'200.000",
  "$1'500.000",
  "$2'200.000",
  "$500.000",
  "$1'200.000",
];

function BudgetStatus() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header id="status-header">
          <text id="status-header-text">Off-balance: {values[0]}</text>
        </Accordion.Header>
        <Accordion.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Budget</td>
                <td>{values[1]}</td>
                <td></td>
              </tr>
              <tr>
                <td>Planned</td>
                <td>{values[2]}</td>
                <td></td>
              </tr>
              <tr>
                <td>Left</td>
                <td>{values[3]}</td>
                <td></td>
              </tr>
              <tr>
                <td>Current Balance</td>
                <td>{values[4]}</td>
                <td></td>
              </tr>
              <tr>
                <td>Paid from Planned</td>
                <td>{values[5]}</td>
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
