"use client"; // Necesario porque usamos useState y useRouter
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState("");
    const [res, setRes] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, password }),
            });

            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }
        
            const data = await response.json();
            setRes(data);
            router.push(`/profile/${res.data.id}`);
        } catch (error) {
            console.error("Error conectando al backend:", error);
            setError("Error de conexión");
            console.log(err)
        }

    }

    useEffect(() => {
        console.log(res)
    }, [res]);


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                <form onSubmit={(e) => handleLogin(e)} className="flex flex-col">
                    {err != "" && <p className="text-red-500 mb-2">{err}</p>}
                    <input
                        type="text"
                        placeholder="Usuario"
                        className="border p-2 mb-2 rounded"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="border p-2 mb-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};
