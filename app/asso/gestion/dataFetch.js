// dataFetch.js
import { useEffect, useState } from "react";

// Custom Hook for fetching cities
export function useCitiesGet() { // Changed to a named export and a custom hook
  const [cities, setCities] = useState([]);

  async function fetchCities() {
    try {
      const res = await fetch("http://localhost:3001/cities");
      const data = await res.json();
      setCities(data.cities);
    } catch (err) {
      console.error("Erreur lors du chargement des villes :", err);
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return cities;
}

// Custom Hook for managing volunteers data and actions
export function useVolunteersData() { // New custom hook
  const [volunteers, setVolunteers] = useState([]);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  const fetchVolunteers = async () => {
    try {
      const res = await fetch("http://localhost:3001/profil");
      const data = await res.json();
      setVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  const handleDeleteVolunteer = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce bénévole ?")) {
      try {
        const res = await fetch(`http://localhost:3001/profil/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          console.log(`Bénévole avec l'ID ${id} supprimé.`);
          fetchVolunteers(); // Refetch the list to update the UI
        } else {
          const errorData = await res.json();
          console.error("Échec de la suppression:", errorData.error);
          alert(`Erreur: ${errorData.error || "Impossible de supprimer le bénévole."}`);
        }
      } catch (error) {
        console.error("Erreur réseau lors de la suppression:", error);
        alert("Une erreur réseau s'est produite lors de la suppression.");
      }
    }
  };

  const handleEditVolunteer = (volunteer) => {
    setEditingVolunteer(volunteer);
  };

  useEffect(() => {
    fetchVolunteers();
  }, []); // Fetch volunteers on initial render

  return {
    volunteers,
    fetchVolunteers, // Export fetchVolunteers so ProfilPage can trigger a refetch
    handleDeleteVolunteer,
    handleEditVolunteer,
    editingVolunteer,
    setEditingVolunteer // Export setEditingVolunteer to allow ProfilPage to reset it
  };
}