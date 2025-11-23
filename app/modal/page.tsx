"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    > 
      <div
        className="bg-white w-full max-w-3xl p-6 rounded shadow-lg relative mx-4"
        onClick={(e) => e.stopPropagation()}
      
      >
        <button
          className="absolute top-4 right-4 text-2xl font-bold hover:text-red-500"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
