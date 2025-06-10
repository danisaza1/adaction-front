
"use client";
// import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { Card } from "../../components/card";
import NavBar from "app/components/navbar";
import { useAuth } from '../../context/authContext';
// import UseWastesData from "../dashboard/Data";

export default function FormProfil() {
 //const { userId } = useParams();// à remplacer par l'ID réel (depuis session, token, params, etc.)
  // console.log("userId =", userId);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [location, setLocation] = useState("");
  //   const wastesData = UseWastesData(); 
  // console.log(wastesData);
  

const { user } = useAuth();


    async function fetchData() {
  if (!user?.token || !user?.id) return;

  try {
    const res = await fetch(`http://localhost:3001/profil/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la récupération du profil");
    }

    const data = await res.json(); // Aquí va después de `res`
    setFirstName(data.firstname || "");
    setLastName(data.lastname || "");
    setLocation(data.location || "");
  } catch (error) {
    console.error("Erreur lors du chargement du profil :", error);
  }
}

useEffect(() => {
  fetchData();
}, [user]);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/updateProfil/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${user.token}`,
        },
    body: JSON.stringify({
  firstname,
  lastname,
  location
})
      });
  

      if (res.ok) {
        alert("Profil mis à jour !");
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      alert("Erreur réseau");
    }
  };


  return (
    <>
      <NavBar role="client" />
      <form className="flex justify-center" onSubmit={handleSubmitUpdate}>
        <Card className="flex justify-center border shadow-lg w-96 p-9 m-4">
          <div className="flex flex-col">
            <h2 className="text-4xl text-center font-bold">Votre Profil</h2>

            <label htmlFor="firstname" className="text-xl">Prénom</label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="lastname"className="text-xl">Nom</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label htmlFor="location" className="text-xl">Ville</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

          <button
            type="submit"
            className="bg-emerald-600 py-3 px-2 mt-7 rounded-lg shadow-lg text-white"
          >
            Mettre à jour
          </button>
        </div>
      </Card>
    </form>
    </>
  );
};
