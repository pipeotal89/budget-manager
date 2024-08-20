import { ListGroup } from "react-bootstrap";
import { useState } from "react";

function BudgetCategoriesList() {
  const [list, setList] = useState(["One", "Two", "Three"]);

  return (
    <>
      <ListGroup>
        {list.map((element) => (
          <ListGroup.Item
            className="d-flex align-items-start"
            style={{ padding: "10px" }}
          >
            {element}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <button onClick={() => setList((list) => [...list, "Test"])} />
    </>
  );
}

export default BudgetCategoriesList;
