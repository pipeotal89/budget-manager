import BudgetCard from "./components/BudgetCard/BudgetCard";
import BudgetStatus from "./components/BudgetStatus/BudgetStatus";
import "./App.css";

/*
#048A81 - Dark Blue
#06D6A0 - Light Green
#06070E - Black
#F7F0F5 - Magnolia
#C8BFC7 - French Gray
*/

function App() {
  /*
  const [list, setList] = useState(["Goku", "Naruto", "Eren"]);

  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setIsLoading(!isLoading);

  const handleSelect = (element: string) => {
    console.log("Imprimiendo " + element);
  };

  const content = list.length ? (
    <List data={list} onSelect={handleSelect} />
  ) : (
    "Sin elementos para mostrar"
  );
  */

  return (
    <div className="main">
      <div className="title">
        <text className="title-text">Budget Manager 2.0</text>
      </div>
      <div className="row">
        <BudgetCard title="Status">
          <BudgetStatus />
        </BudgetCard>
        <BudgetCard title="Categories"></BudgetCard>
      </div>
      <div className="row">
        <BudgetCard title="Inversion/Saved"></BudgetCard>
        <BudgetCard title="Planned"></BudgetCard>
      </div>
    </div>
  );
}

export default App;
