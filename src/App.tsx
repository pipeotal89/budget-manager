import Card, { CardBody } from './components/Card'
import Button from './components/Button'
import List from './components/List'
import { useState } from 'react';

function App() {

  const list = ["Goku", "Naruto", "Eren"];

  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setIsLoading(!isLoading)
;
  const handleSelect = (element: string) => {
    console.log("Imprimiendo " + element)
  };

  const content = list.length ? <List data={list} onSelect={handleSelect} /> : "Sin elementos para mostrar"

  return(

    <Card>
      <CardBody title={"Hola mundo"} text={"Test"} />
      {content}
      <Button isLoading={isLoading} onClick={handleClick}>Hola Mundo</Button>
    </Card>

  )
}

export default App;