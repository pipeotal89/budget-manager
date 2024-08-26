import BudgetCategoryTable from "../../components/BudgetCategoryTable/BudgetCategoryTable";

import "./CategoriesPage.css";

function CategoriesPage() {
  return (
    <div className="main">
      <div className="title">
        <text className="title-text">Online Shopping</text>
      </div>
      <BudgetCategoryTable />
    </div>
  );
}

export default CategoriesPage;
