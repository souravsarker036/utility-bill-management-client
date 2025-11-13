import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const MyBills = () => {
  const api = import.meta.env.VITE_API_URL;
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/myBills`, { headers: { Authorization: `Bearer ${token}` } });
      setBills(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this payment?")) return;
    try {
      await axios.delete(`${api}/myBills/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Deleted");
      fetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  const totalAmount = bills.reduce((s, b) => s + (Number(b.amount) || 0), 0);

  if (loading) return <div className="py-8 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Paid Bills</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <div>Total records: {bills.length}</div>
          <div className="font-semibold">Total Amount: ৳{totalAmount}</div>
        </div>

        {bills.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No payments yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map(b => (
                  <tr key={b._id}>
                    <td>{b.username}</td>
                    <td>{b.email}</td>
                    <td>৳{b.amount}</td>
                    <td>{b.phone}</td>
                    <td>{b.date}</td>
                    <td className="space-x-2">
                      <button onClick={()=>remove(b._id)} className="btn btn-xs btn-error">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBills;
