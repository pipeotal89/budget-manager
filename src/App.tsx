import Card, { CardBody } from './components/Card'
import List from './components/List'

function App() {

  const list = ["Goku", "Naruto", "Eren"]

  return(
    <Card>
      <CardBody title={"Hola mundo"} text={"Test"} />
      <List data={ list }/>
    </Card>
  )
}

export default App;