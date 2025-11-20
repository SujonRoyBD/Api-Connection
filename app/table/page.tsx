"use client";

import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface FormState {
  name: string;
  price: string;
  quantity: string;
}

export default function DataTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    price: "",
    quantity: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  // Load products from API
  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new product
  const handleAdd = async (): Promise<void> => {
    if (!form.name || !form.price || !form.quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      });
      if (!res.ok) throw new Error("Failed to add product");
      await fetchProducts();
      setForm({ name: "", price: "", quantity: "" });
    } catch (e: any) {
      alert(e.message);
    }
  };

  // Start editing product
  const startEdit = (product: Product): void => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
    });
  };

  // Cancel editing
  const cancelEdit = (): void => {
    setEditingId(null);
    setForm({ name: "", price: "", quantity: "" });
  };

  // Update product
  const handleUpdate = async (): Promise<void> => {
    if (!editingId) return;

    try {
      const res = await fetch(`${baseUrl}/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      await fetchProducts();
      cancelEdit();
    } catch (e: any) {
      alert(e.message);
    }
  };

  // Delete product
  const handleDelete = async (id: number): Promise<void> => {
    if (!confirm("Are you sure to delete?")) return;

    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      await fetchProducts();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "10px" }}>
            <strong>{product.name}</strong> - ${product.price} - Qty: {product.quantity} &nbsp;
            <button onClick={() => startEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)} style={{ marginLeft: "5px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={{ marginRight: "5px" }}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        style={{ marginRight: "5px" }}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        style={{ marginRight: "5px" }}
      />
        <input
        type="text"
        name="fd"
        placeholder="Quandfdtity"
        style={{ marginRight: "5px" }}
      />

      {editingId ? (
        <>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={cancelEdit} style={{ marginLeft: "5px" }}>
            Cancel
          </button>
        </>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}
    </div>
  );
}
