import { useState } from "react";
import CustomersTable from "./components/customersTable/CustomersTable";
import Header from "./components/header/Header";
import GraphComponent from "./components/graphComponent/GraphComponent";

function App() {
  const [table, setTable] = useState(true);

  return (
    <>
      <Header />
      <CustomersTable />
    </>
  );
}

export default App;
