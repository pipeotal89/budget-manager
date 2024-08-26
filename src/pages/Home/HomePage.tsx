import BudgetCard from "../../components/BudgetCard/BudgetCard";
import BudgetStatus from "../../components/BudgetStatus/BudgetStatus";
import BudgetCategoriesList from "../../components/BudgetCategoriesList/BudgetCategoriesList";

import "./HomePage.css";

/*
#048A81 - Dark Blue
#06D6A0 - Light Green
#06070E - Black
#F7F0F5 - Magnolia
#C8BFC7 - French Gray
*/

function HomePage() {
  return (
    <div className="main">
      <div className="title">
        <text className="title-text">Budget Manager 2.0</text>
      </div>
      <div className="row">
        <BudgetCard title="Status">
          <BudgetStatus />
        </BudgetCard>
        <BudgetCard title="Categories">
          <BudgetCategoriesList />
        </BudgetCard>
      </div>
      <div className="row">
        <BudgetCard title="Inversion/Saved"></BudgetCard>
        <BudgetCard title="Planned"></BudgetCard>
      </div>
    </div>
  );
}

export default HomePage;
