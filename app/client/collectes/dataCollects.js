import { useEffect, useState } from "react";
export default function citiesGet() {
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
  // Charger les villes depuis l'API
  useEffect(() => {
    fetchCities();
  }, []);
return cities;
    }






