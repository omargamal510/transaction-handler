import React, { useEffect, useMemo, useState } from "react";
import getApi from "../../apis/getter";
import GraphComponent from "../graphComponent/GraphComponent";


let originalData = [];
let originalTransactions = [];

let amounts = [];
let dates = [];


export default function CustomersTable() {
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
  const [loading, setLoading] = useState(true);

  const [sentAmounts, setSentAmounts] = useState();
  const [sentDates, setSentDates] = useState([]);
  const [selectedName , setSelectedName] = useState();

  const [graphShow , setGraphShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, transactionsRes] = await Promise.all([
          getApi("http://localhost:3001/customers"),
          getApi("http://localhost:3001/transactions"),
        ]);
        if (customersRes && transactionsRes) {
          originalData = customersRes;
          originalTransactions = transactionsRes;
          setData(originalData);
          setTransactions(originalTransactions);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calcAmount = (customerId) => {
    if (!transactions) return 0;
    return transactions
      .filter((t) => t.customer_id === Number(customerId))
      .reduce((acc, t) => acc + t.amount, 0);
  };

  const filteredData = useMemo(() => {
    return data.filter((el) =>
      el.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [data, transactions, searchName, searchAmount]);

  function handleNameChange(e) {
    setSearchName(e.target.value);
    console.log(filteredData);
  }

  function handleAmountChange(e) {
    setSearchAmount(e.target.value);
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">Customers Table</h1> */}

      <form onSubmit={(e) => {e.preventDefault()}} className="filter flex gap-x-3 justify-center text-black min-w-100">
        <input
          value={searchName}
          onChange={handleNameChange}
          type="text"
          placeholder="filter by name"
          className="w-full p-2 rounded-3xl text-lg outline-teal-500"
        />
        <input
          value={searchAmount}
          onChange={handleAmountChange}
          type="text"
          placeholder="filter by amount"
          className="w-full p-2 rounded-3xl text-lg outline-teal-500"
        />
      </form>


      {/* <div className="mb-4">
        <h2>Total Customers: {data.length}</h2>
        <h2>Total Transactions: {transactions ? transactions.length : 0}</h2>
      </div> */}

      {!filteredData || filteredData.length === 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <table className={`min-w-full my-10 bg-white rounded-3xl shadow-dark-grey overflow-hidden  ${graphShow && 'hidden'}`}>
          <thead className="bg-teal-500 rounded-xl  text-black">
            <tr className="text-black">
              <th className="py-3 px-4 text-left">#ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Transactions Date</th>
              <th className="py-3 px-4 text-left">Transactions Amount</th>
                            <th className="py-3 px-4 text-left">More Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((customer) => (
              <tr
                onClick={() => {
                  {
                    amounts = transactions
                      .filter((t) => t.customer_id === Number(customer.id))
                      .map((t) => t.amount);
                    dates = transactions
                      .filter((t) => t.customer_id === Number(customer.id))
                      .map((t) => t.date);
                  }
                  setSentAmounts(amounts);
                  setSentDates(dates);
                  setGraphShow(true);
                  setSelectedName(customer.name);
                }}
                key={customer.id}
                className="hover:bg-gray-100 cursor-pointer text-black"
              >
                <td className="font-bold py-3 px-4 border-b border-gray-300">
                  {customer.id}
                </td>
                <td className="font-bold py-3 px-4 border-b border-gray-300">
                <i className="fas fa-user text-teal-500"></i> {customer.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {transactions
                    .filter((t) => t.customer_id === Number(customer.id))
                    .map((t) => (
                      <p key={t.id}><i className="fas fa-calendar text-teal-500"></i>  {t.date}</p>
                    ))}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {transactions
                    .filter((t) => t.customer_id === Number(customer.id))
                    .map((t) => (
                      <p key={t.id}>{t.amount}</p>
                    ))}
                    <div className="bg-teal-500 inline p-1 rounded text-white">Total: {calcAmount(customer.id)}</div>
                </td> 
                <td className="underline font-bold py-3 px-4 border-b border-gray-300">
                  Click for more <i className="fa fa-angle-right text-teal-500"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {graphShow && <GraphComponent amounts={sentAmounts} selectedName={selectedName} setGraphShow={setGraphShow} dates={sentDates} />}



      
    </div>
  );
}
