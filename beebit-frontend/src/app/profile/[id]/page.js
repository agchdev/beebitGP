"use client"; // Necesario porque usamos useState y useRouter
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function ProfilePage({ params }) {
  const [respuesta, setRespuesta] = useState([]);
  const [projects, setProjects] = useState([]);
  const [errorU, setErrorU] = useState(false);
  const [errorP, setErrorP] = useState("");

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await useParams(); // Esperamos a que `useParams()` se resuelva
      setParams(resolvedParams);
    }

    fetchParams();
  }, []);



  useEffect(() => {
    console.log(params.id)
    if (!params?.id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/${params.id}`)
      .then((res) => res.json())
      .then((data) => setRespuesta(data.data))
      .catch((err) => {
        console.error("Error conectando al backend:", err);
        setErrorU(true);
      });

    if (errorU) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignments/user/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProjects(data.data)
          console.log(projects)
        })
        .catch((err) => {
          console.error("Error conectando al backend:", err);

          setErrorP("Error de conexión");
        });
    }
  }, [params]);

  if (!params) return <p>Cargando perfil...</p>;
  if (!respuesta) return <p>Cargando datos del usuario...</p>;

  return (
    <div>
      <div className=" flex items-center gap-4 m-4">
        <div className="rounded-full overflow-hidden w-[150px]">
          <img className="m-auto" src="https://picsum.photos/200" alt="Imagen de perfil" />
        </div>
        <div>
          <h1 className="font-bold uppercase">{respuesta.name}</h1>
          <p className="font-light">{respuesta.email}</p>
        </div>
      </div>
      <div>
        {projects.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
