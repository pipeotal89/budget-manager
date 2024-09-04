import BudgetCard from "../../components/BudgetCard/BudgetCard";
import BudgetStatus from "../../components/BudgetStatus/BudgetStatus";
import BudgetCategoriesList from "../../components/BudgetCategoriesList/BudgetCategoriesList";
import NavBar from "../../components/NavBar/NavBar";

import { useParams } from "react-router-dom";

import "./HomePage.css";

/*
#048A81 - Dark Blue
#06D6A0 - Light Green
#06070E - Black
#F7F0F5 - Magnolia
#C8BFC7 - French Gray
*/

function HomePage() {
  const { month } = useParams();

  return (
    <div className="main">
      <div className="title">
        <NavBar month={month!} />
      </div>
      <div className="row">
        <BudgetCard title="Status">
          <BudgetStatus month={month!} />
        </BudgetCard>
        <BudgetCard title="Categories">
          <BudgetCategoriesList month={month!} />
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
