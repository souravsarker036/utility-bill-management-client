import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";

const MyBills = () => {
  const api = import.meta.env.VITE_API_URL;
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBill, setEditingBill] = useState(null);
  const [editData, setEditData] = useState({});
  const token = localStorage.getItem("token");

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/myBills`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBills(res.data || []);
    } catch {
      toast.error("Failed to fetch bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete this payment?")) return;
    try {
      await axios.delete(`${api}/myBills/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted");
      fetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  const startEdit = (bill) => {
    setEditingBill(bill._id);
    setEditData({ amount: bill.amount, phone: bill.phone, date: bill.date });
  };

  const submitEdit = async () => {
    try {
      await axios.put(`${api}/myBills/${editingBill}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Updated successfully");
      setEditingBill(null);
      fetch();
    } catch {
      toast.error("Update failed");
    }
  };

 const downloadPDF = (bill) => {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(16);
  doc.text("Bill Details", 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Title: ${bill.title}`, 10, y);
  y += 8;
  doc.text(`Category: ${bill.category}`, 10, y);
  y += 8;
  doc.text(`Location: ${bill.location}`, 10, y);
  y += 8;
  doc.text(`Description: ${bill.description}`, 10, y);
  y += 8;
  doc.text(`Amount: ৳${bill.amount}`, 10, y);
  y += 8;
  doc.text(`Date: ${new Date(bill.date).toLocaleDateString()}`, 10, y);
  y += 8;
  if (bill.phone) {
    doc.text(`Phone: ${bill.phone}`, 10, y);
    y += 8;
  }
  if (bill.email) {
    doc.text(`Email: ${bill.email}`, 10, y);
    y += 8;
  }

  // Add bill image
  if (bill.image) {
    const img = new Image();
    img.crossOrigin = "anonymous"; // prevent CORS issues
    img.src = bill.image;
    img.onload = () => {
      doc.addImage(img, "JPEG", 10, y, 80, 60); // adjust size as needed
      doc.save(`${bill.title}_bill.pdf`);
    };
    img.onerror = () => {
      doc.save(`${bill.title}_bill.pdf`);
    };
  } else {
    doc.save(`${bill.title}_bill.pdf`);
  }
};


  const totalAmount = bills.reduce((s, b) => s + (Number(b.amount) || 0), 0);

  if (loading)
    return (
      <div className="py-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Paid Bills</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <div>Total records: {bills.length}</div>
          <div className="font-semibold">Total Amount: ৳{totalAmount}</div>
        </div>

        {bills.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No payments yet.
          </div>
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
                {bills.map((b) => (
                  <tr key={b._id}>
                    <td>{b.username}</td>
                    <td>{b.email}</td>
                    <td>
                      {editingBill === b._id ? (
                        <input
                          type="number"
                          value={editData.amount}
                          onChange={(e) =>
                            setEditData({ ...editData, amount: e.target.value })
                          }
                          className="input input-xs"
                        />
                      ) : (
                        `৳${b.amount}`
                      )}
                    </td>
                    <td>
                      {editingBill === b._id ? (
                        <input
                          type="text"
                          value={editData.phone}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                          className="input input-xs"
                        />
                      ) : (
                        b.phone
                      )}
                    </td>
                    <td>
                      {editingBill === b._id ? (
                        <input
                          type="date"
                          value={editData.date}
                          onChange={(e) =>
                            setEditData({ ...editData, date: e.target.value })
                          }
                          className="input input-xs"
                        />
                      ) : (
                        new Date(b.date).toLocaleDateString()
                      )}
                    </td>
                    <td className="space-x-2">
                      {editingBill === b._id ? (
                        <>
                          <button
                            onClick={submitEdit}
                            className="btn btn-xs btn-success"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingBill(null)}
                            className="btn btn-xs btn-outline"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(b)}
                            className="btn btn-xs btn-primary"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => remove(b._id)}
                            className="btn btn-xs btn-error"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => downloadPDF(b)}
                            className="btn btn-xs btn-secondary"
                          >
                            Download PDF
                          </button>
                        </>
                      )}
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
