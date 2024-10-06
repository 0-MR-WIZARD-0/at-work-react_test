import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/hooks";
import { fetchUsers } from "./redux/usersSlice";
import Main from "./pages/Main";
import Edit from "./pages/Edit";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </Router>
  );
}

export default App;
