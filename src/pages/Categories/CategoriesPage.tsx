import BudgetCategoryTable from "../../components/BudgetCategoryTable/BudgetCategoryTable";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./CategoriesPage.css";

function CategoriesPage() {
  const { month, category } = useParams();

  return (
    <div className="main">
      <div className="title">
        <div className="category-space">
          <Link to={`/${month}`} id="category-return-btn">
            Return
          </Link>
        </div>
        <text className="title-text">
          {category!.charAt(0).toUpperCase() +
            category!.substring(1).replace("-", " ")}
        </text>
        <div className="category-space"></div>
      </div>
      <div id="category-table">
        <BudgetCategoryTable month={month!} category={category!} />
      </div>
    </div>
  );
  0;
}

export default CategoriesPage;
