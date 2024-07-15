import React, { useEffect, useState } from "react";
import getApi from "../../apis/getter";

export default function CustomersTable() {
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, transactionsRes] = await Promise.all([
          getApi("http://localhost:3001/customers"),
          getApi("http://localhost:3001/transactions")
        ]);
        if (customersRes && transactionsRes) {
          setData(customersRes);
          setTransactions(transactionsRes);
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

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No customers found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers Table</h1>

      <div className="filter">
        <input type="text" placeholder="filter by name"/>

        <input type="text" placeholder="filter by amount"/>
      </div>

      <div className="mb-4">
        <h2>Total Customers: {data.length}</h2>
        <h2>Total Transactions: {transactions ? transactions.length : 0}</h2>
      </div>

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
          {data.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100 text-black">
              <td className="py-3 px-4 border-b border-gray-300">
                {customer.id}
              </td>
              <td className="py-3 px-4 border-b border-gray-300">
                {customer.name}
              </td>
              <td className="py-3 px-4 border-b border-gray-300">
                {transactions
                  .filter((t) => t.customer_id === Number(customer.id))
                  .map((t) => (
                    <p key={t.id}>{t.date}</p>
                  ))}
              </td>
              <td className="py-3 px-4 border-b border-gray-300">
                {transactions
                  .filter((t) => t.customer_id === Number(customer.id))
                  .map((t) => (
                    <p key={t.id}>{t.amount}</p>
                  ))}
                <strong>Total:</strong> {calcAmount(customer.id)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
