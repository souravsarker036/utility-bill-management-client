import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const BillDetails = () => {
  const { id } = useParams();
  const api = import.meta.env.VITE_API_URL;
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [payLoading, setPayLoading] = useState(false);
  const [form, setForm] = useState({ username: "", phone: "", address: "", additionalInfo: "" });

  useEffect(() => {
    let mounted = true;
    axios.get(`${api}/bills/${id}`)
      .then(res => mounted && setBill(res.data))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => mounted = false;
  }, [api, id]);

  const canPay = bill ? (() => {
    const billDate = new Date(bill.date);
    const now = new Date();
    return billDate.getMonth() === now.getMonth() && billDate.getFullYear() === now.getFullYear();
  })() : false;

  const submitPayment = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to pay");
    setPayLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        billId: bill._id,
        username: form.username || user.name || "",
        phone: form.phone,
        address: form.address,
        additionalInfo: form.additionalInfo
      };
      await axios.post(`${api}/myBills`, payload, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Payment recorded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) return <div className="py-8 flex justify-center"><LoadingSpinner /></div>;
  if (!bill) return <div className="py-8 text-center">Bill not found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded p-4 shadow">
        <img src={bill.image} alt={bill.title} className="w-full h-64 object-cover rounded" />
        <h2 className="text-2xl font-semibold mt-4">{bill.title}</h2>
        <div className="text-sm text-gray-500 mt-2">Category: {bill.category} — Location: {bill.location}</div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{bill.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="font-bold text-xl">৳{bill.amount}</div>
            <div className="text-xs text-gray-500">{new Date(bill.date).toLocaleDateString()}</div>
          </div>
          <div>
            {canPay ? (
              <div className="text-sm text-green-600 font-semibold">Payable (current month)</div>
            ) : (
              <div className="text-sm text-red-500 font-semibold">Not payable (only current month allowed)</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        <h3 className="font-semibold mb-2">Pay Bill</h3>
        <form onSubmit={submitPayment} className="space-y-3">
          <input className="input input-bordered w-full" value={user?.email || ""} readOnly />
          <input value={bill._id} className="input input-bordered w-full" readOnly />
          <input className="input input-bordered w-full" value={bill.amount} readOnly />
          <input placeholder="Your name" className="input input-bordered w-full"
                 value={form.username} onChange={e=>setForm({...form,username:e.target.value})} />
          <input placeholder="Phone" className="input input-bordered w-full" required
                 value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <input placeholder="Address" className="input input-bordered w-full" required
                 value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
          <textarea placeholder="Additional info" className="textarea textarea-bordered w-full"
                    value={form.additionalInfo} onChange={e=>setForm({...form,additionalInfo:e.target.value})}></textarea>

          <button type="submit" className={`btn w-full ${!canPay ? "btn-disabled" : "btn-primary"} ${payLoading ? "loading" : ""}`} disabled={!canPay || payLoading}>
            {payLoading ? "Processing..." : "Pay Bill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillDetails;
