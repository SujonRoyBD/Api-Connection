"use client";
import { error } from "console";
import React, { useEffect, useState } from "react";
import { clearScreenDown } from "readline";

interface Category {
  id: number;
  name: string;
  description: string;
  contentCount: number;
  status: string;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // GET API: ডাটা ফেচিং
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // DELETE API: একটি ক্যাটেগরি ডিলিট করা
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      // UI থেকে সরানো
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

 if (loading) return <p>Loading...</p>;
  


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category List</h1>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Description</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Content Count</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Status</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="odd:bg-gray-100 even:bg-white hover:bg-gray-200"
              >
                <td className="py-2 px-4 border-b border-gray-300">{category.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{category.description}</td>
                <td className="py-2 px-4 border-b border-gray-300">{category.contentCount}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {category.status === "Active" ? (
                    <span className="text-green-600 font-semibold">{category.status}</span>
                  ) : (
                    <span className="text-red-600">{category.status}</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
