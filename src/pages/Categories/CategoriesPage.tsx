import BudgetCategoryTable from "../../components/BudgetCategoryTable/BudgetCategoryTable";

import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./CategoriesPage.css";

function CategoriesPage() {
  const { category } = useParams();

  return (
    <div className="main">
      <div className="title">
        <text className="title-text">
          {category!.charAt(0).toUpperCase() +
            category!.substring(1).replace("-", " ")}
        </text>
      </div>
      <div id="category-button">
        <Button variant="custom-green" id="category-button-btn">
          Add product
        </Button>
      </div>
      <div id="category-table">
        <BudgetCategoryTable />
      </div>
    </div>
  );
  0;
}

export default CategoriesPage;
