import React, { useEffect, useState } from "react";
import getApi from "../../apis/getter";
import { data } from "../../apis/getter";


export default function CustomersTable() {
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi("http://localhost:3001/customers");
      console.log(res); // Log immediately after fetching
      if (res) {
        setData(res); // Update state if response is valid
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi("http://localhost:3001/transactions");
      console.log(res); // Log immediately after fetching
      if (res) {
        setTransactions(res); // Update state if response is valid
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

  //

  return (
    <div className="container mx-auto p-4">
      {amount}
      <h1 className="text-2xl font-bold mb-4" onClick={calcAmount}>
        Customers Table
      </h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : data && data.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-teal-500 text-black">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Transactions Date</th>
              <th className="py-3 px-4 text-left">Transactions Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer, index) => (
              <tr key={customer.id} className="hover:bg-gray-100 text-black">
                <td className="py-3 px-4 border-b border-gray-300">
                  {customer.id}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {customer.name}
                </td>
                <td id="amount" className="py-3 px-4 border-b border-gray-300">
                  {transactions.map((t, i) => (
                      <p key={t.id}>
                        {t.customer_id === Number(customer.id) ? t.date : ""}
                      </p>
                  ))}
                </td>

                <td id="amount" className="py-3 px-4 border-b border-gray-300">
                  {transactions.map((t, i) => (
                      <p key={t.id}>
                        {t.customer_id === Number(customer.id) ? t.amount : ""}
                      </p>
                  ))}
                  Total: {calcAmount(customer.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No customers found.</p>
      )}
    </div>
  );
}
