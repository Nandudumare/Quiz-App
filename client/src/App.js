import "./App.css";
import Home from "./components/Home";
import { Progress } from "@chakra-ui/react";
import { ProContext } from "./context/ProContext";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  const { loading, setLoading } = useContext(ProContext);
  return (
    <div className="App">
      <div>{loading ? <Progress size="xs" isIndeterminate /> : ""}</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
