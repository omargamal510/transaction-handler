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
  const [selectedName, setSelectedName] = useState();

  const [nameFilter, setNameFilter] = useState("name");
  const [amountFilter, setAmountFilter] = useState("amount");
  const [selectFilter, setSelectFilter] = useState("name"); //

  const [graphShow, setGraphShow] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, transactionsRes] = await Promise.all([
          getApi("https://gist.githubusercontent.com/omargamal510/560491b764c9ba5bc3bf5131c9d1ac9a/raw/2d29917a7c6a60d8defb20a26b94f3be46ef7cf8/db.json"),
          getApi("https://gist.githubusercontent.com/omargamal510/6cde20ce329f9dbb3f4c0fd2a57df742/raw/c684ddbac6b059364589b61a78642bd092f92d35/db.json"),
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
    return data.filter((customer) => {
      const matchesName = customer.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      // Check if any transaction amount matches the searchAmount
      const customerAmounts = transactions
        .filter((t) => t.customer_id === Number(customer.id))
        .map((t) => t.amount);

      const matchesPayment = searchAmount
        ? customerAmounts.includes(Number(searchAmount))
        : true;

      // Debugging logs
      return matchesName && matchesPayment;
    });
  }, [data, transactions, searchName, searchAmount]);

  function handleNameChange(e) {
    setSearchName(e.target.value);
  }

  function handleAmountChange(e) {
    setSearchAmount(e.target.value);
    console.log(filteredData);
    console.log(transactions);
  }

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setSelectFilter(selectedFilter);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-svh"><p className="text-white text-3xl">Loading...</p></div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">Customers Table</h1> */}

      {!graphShow && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="filter flex gap-x-3 justify-center text-black min-w-100"
        >
          <input
            value={searchName}
            onChange={handleNameChange}
            type="text"
            placeholder="filter by name"
            className="w-1/2 p-2 rounded-3xl text-lg outline-teal-500"
          />
          <input
            value={searchAmount}
            onChange={handleAmountChange}
            type="text"
            placeholder="filter by amount"
            className="w-1/2 p-2 rounded-3xl text-lg outline-teal-500"
          />{" "}
        </form>
      )}

      {!filteredData || filteredData.length === 0 ? (
        <div>
            <p className="text-white text-center mt-40 text-4xl">{searchName ? `Your search for "${searchName}" is not found ❌` : "No customers found.❌"}</p>
        </div>
      ) : (
        <table
          className={`min-w-full my-10 bg-white rounded-3xl shadow-dark-grey overflow-hidden  ${
            graphShow && "hidden"
          }`}
        >


          
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
                      <p key={t.id}>
                        <i className="fas fa-calendar text-teal-500"></i>{" "}
                        {t.date}
                      </p>
                    ))}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {transactions
                    .filter((t) => t.customer_id === Number(customer.id))
                    .map((t) => (
                      <p key={t.id}>{t.amount}</p>
                    ))}
                  <div className="bg-teal-500 inline p-1 rounded text-white">
                    Total: {calcAmount(customer.id)}
                  </div>
                </td>
                <td className="underline font-bold py-3 px-4 border-b border-gray-300">
                  Click for more{" "}
                  <i className="fa fa-angle-right text-teal-500"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {graphShow && (
        <GraphComponent
          amounts={sentAmounts}
          selectedName={selectedName}
          setGraphShow={setGraphShow}
          dates={sentDates}
        />
      )}
    </div>
  );
}
