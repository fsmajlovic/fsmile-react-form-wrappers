import logo from './logo.svg';
import './App.css';
import Form from './controls/Form';
function App() {
  const submitHandler = (event, data) => {
    event.preventDefault();
    console.log(data);
  }
  return (
    <div className="App" style={{backgroundColor: "teal", padding: "50px"}}>

        <Form/>
    </div>
  );
}

export default App;
