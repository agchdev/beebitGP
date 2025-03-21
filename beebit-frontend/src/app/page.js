"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff`)
      .then((res) => res.json())
      .then((data) => setMessage(data.data[0].name || "Respuesta recibida"))
      .catch((err) => {
        console.error("Error conectando al backend:", err);
        setMessage("Error de conexión");
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-bold">{message} Hola</h1>
    </div>
  );
}
