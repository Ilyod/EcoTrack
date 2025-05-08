import { useState } from "react";
import "./App.css";
import Message from "./components/message";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Message from Express</h1>
      <Message />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
