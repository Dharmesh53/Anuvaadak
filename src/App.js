import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Form from "./Components/Form";

function App() {
  const background = document.querySelector("body");
  document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  background.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
});
  return (
    <div className="App">
      <Navbar/>
      <Form/>
    </div>
  );
}

export default App;
