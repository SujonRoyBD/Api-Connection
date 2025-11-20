"use client"
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  img: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

 return (
  <div>
    <h1>User List</h1>

    {users.length > 0 ? (
      users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.img}</p>
        </div>
      ))
    ) : (
      <p>No users found</p>
    )}
  </div>
);

}
