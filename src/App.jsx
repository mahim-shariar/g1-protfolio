import Home from "./page/Home";
import "./App.css";
import DarkAnimatedBackground from "./components/DarkAnimatedBackground";

function App() {
  return (
    <>
      <DarkAnimatedBackground>
        <Home />
      </DarkAnimatedBackground>
    </>
  );
}

export default App;
