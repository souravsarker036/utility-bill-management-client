import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AuthContext);

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
      className="max-w-lg mx-auto bg-base-100 shadow rounded-lg p-8 space-y-6"
    >
      <div className="flex flex-col items-center space-y-3">
        <img
          src={user.photo || "/default-avatar.png"}
          alt={user.name}
          className="w-28 h-28 rounded-full object-cover shadow"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="divider"></div>

      <div className="space-y-2">
        <p>
          <strong>Member since:</strong>{" "}
          {new Date(user.createdAt || Date.now()).toLocaleDateString()}
        </p>
        <p>
          <strong>User ID:</strong> {user._id || "N/A"}
        </p>
      </div>
    </motion.div>
  );
};

export default Profile;
