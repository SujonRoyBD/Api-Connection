"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Props {
  initialName: string;
  initialEmail: string;
  initialPassword: string;
  isLoading: boolean;
  onSubmit: (name: string, email: string, password: string) => void;
}

export default function EditUserForm({
  initialName,
  initialEmail,
  initialPassword,
  isLoading,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name, email, password);
      }}
      className="space-y-4 border-2 border-red-500"
    >
      <div className="bg-black">
        <Label className="text-blue-400">Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-primary text-white">
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </form>
  );
}
