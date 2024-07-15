import { useEffect, useState } from "react";
import CustomersTable from "./components/customersTable/CustomersTable";
import Header from "./components/header/Header";
import GraphComponent from "./components/graphComponent/GraphComponent";

function App() {
  return (
    <>
      <Header />
      <CustomersTable />
      <GraphComponent />
    </>
  );
}

export default App;
