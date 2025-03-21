"use client"; // Necesario porque usamos useState y useRouter
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
        

export default function ProfilePage() {
  const [respuesta, setRespuesta] = useState(null);
  const [projects, setProjects] = useState([]);
  const [errorU, setErrorU] = useState(false);
  const [errorP, setErrorP] = useState("");
  
  const params = useParams(); // ✅ Se accede directamente a `useParams()`

  // ✅ Obtener información del usuario
  useEffect(() => {
    if (!params?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/${params.id}`)
      .then((res) => res.json())
      .then((data) => setRespuesta(data.data))
      .catch((err) => {
        console.error("Error conectando al backend:", err);
        setErrorU(true);
      });
  }, [params.id]);

  // ✅ Obtener proyectos asignados al usuario
  useEffect(() => {
    if (!params?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignments/user/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data.data) ? data.data : []);
        console.log("Proyectos obtenidos:", data.data);
      })
      .catch((err) => {
        console.error("Error conectando al backend:", err);
        setErrorP("Error de conexión");
      });
  }, [params.id]);

  // ✅ Monitorear cambios en `projects`
  useEffect(() => {
    console.log("Projects actualizados:", projects);
  }, [projects]);

  if (!params) return <p>Cargando perfil...</p>;
  if (!respuesta) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="p-4">
      {/* Sección de información del usuario */}
      <Card className="mb-4 text-center shadow-4">
        <div className="flex flex-col items-center p-4">
          <Avatar image="https://picsum.photos/200" size="xlarge" shape="circle" />
          <h1 className="text-2xl font-bold mt-2">{respuesta.name}</h1>
          <p className="text-gray-500">{respuesta.email}</p>
        </div>
      </Card>
      <div className="flex justify-center">
        <Button label="Crear Proyecto" />
      </div>
      {/* Sección de proyectos */}
      <h2 className="text-2xl font-semibold mb-4">Proyectos Asignados</h2>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((proyecto) => (
            <Card key={proyecto.id} className="shadow-2">
              <div className="p-4 flex flex-col items-center">
                <Image src="https://picsum.photos/150" alt="Proyecto" className="w-full h-40 object-cover rounded-lg mb-2 m-auto" />
                <h3 className="text-lg font-bold text-center">{proyecto.project.name}</h3>
                <p className="text-gray-600 text-center">{proyecto.project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No hay proyectos asignados.</p>
      )}
    </div>
  );
}
