"use client";

import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

interface EditUserFormProps {
  initialName: string;
  initialEmail: string;
  initialPassword: string;
  isLoading: boolean;
  onSubmit: (name: string, email: string, password: string) => void;
}

function EditUserForm({
  initialName,
  initialEmail,
  initialPassword,
  isLoading,
  onSubmit,
}: EditUserFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name, email, password);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Password</label>
        <input
          type="password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}

export default function UsersList() {
  // dummy data and handlers for demo:
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Sujon", email: "sujon@example.com" },
    { id: 2, name: "Rafi", email: "rafi@example.com" },
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const startEditing = (user: User) => {
    setEditingUser(user);
  };

  const closeModal = () => setEditingUser(null);

  const handleUpdate = (name: string, email: string, password: string) => {
    setIsUpdating(true);
    // simulate API update
    setTimeout(() => {
      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === editingUser.id ? { ...u, name, email } : u
          )
        );
      }
      setIsUpdating(false);
      closeModal();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      {/* Modal area */}
      {editingUser && (
        <div
          className="absolute top-0 left-0 right-0 bg-white shadow-lg rounded p-6 z-50 mx-4"
          style={{ maxWidth: "600px" }}
        >
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-2xl font-bold hover:text-red-600"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <EditUserForm
            initialName={editingUser.name}
            initialEmail={editingUser.email}
            initialPassword=""
            isLoading={isUpdating}
            onSubmit={handleUpdate}
          />
        </div>
      )}

      {/* Users Table / List */}
      <ul className="mt-32 space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <button
              onClick={() => startEditing(user)}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
