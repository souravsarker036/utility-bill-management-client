import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const api = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/myBills`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBills(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBills();
  }, [user]);

  const totalAmount = bills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);

  const downloadPDF = () => {
    if (!bills.length) return toast.error("No bills to export");
    const doc = new jsPDF();
    doc.text(`Paid Bills Report - ${user.name}`, 14, 20);

    const tableData = bills.map((b, idx) => [
      idx + 1,
      b.title,
      b.category,
      b.amount,
      new Date(b.date).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [["#", "Title", "Category", "Amount (৳)", "Date"]],
      body: tableData,
      startY: 30,
    });

    doc.text(`Total Amount Paid: ৳${totalAmount}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`${user.name}-paid-bills.pdf`);
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-gray-500">
        No profile data found. Please log in again.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-base-100 shadow rounded-lg p-8 space-y-6"
    >
      {/* Profile info */}
      <div className="flex flex-col items-center space-y-3">
        <img
          src={user.photo || "https://via.placeholder.com/150"}
          alt={user.name}
          className="w-28 h-28 rounded-full object-cover shadow"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="divider"></div>

      {/* Total Amount + Download */}
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold">Total Paid Bills: {bills.length}</div>
        <div className="font-semibold">Total Amount: ৳{totalAmount}</div>
        <button
          onClick={downloadPDF}
          className="btn btn-sm btn-outline"
        >
          Download PDF
        </button>
      </div>

      {/* User Bills Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : bills.length === 0 ? (
        <div className="py-8 text-center text-gray-500">No bills paid yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Amount (৳)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, idx) => (
                <tr key={b._id}>
                  <td>{idx + 1}</td>
                  <td>{b.title}</td>
                  <td>{b.category}</td>
                  <td>{b.amount}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
