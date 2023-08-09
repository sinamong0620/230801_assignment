import { Route, Routes } from "react-router";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default App;
