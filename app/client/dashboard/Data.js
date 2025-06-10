// app/dashboard/Data.js
'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';

// Este hook ahora recibe la fecha seleccionada del frontend
export default function UseWastesData(selectedDate) {
  const [wastesData, setWastesData] = useState([]);
  const [firstname, setFirstname] = useState(''); // <--- ¡ASEGURATE DE QUE ESTE ESTADO ESTÁ AQUÍ!
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      // 1. Verificación inicial de token de usuario
      if (!user?.token) {
        console.log("UseWastesData: No user token found, skipping dashboard data fetch.");
        setWastesData([]);
        setFirstname(''); // Limpiar nombre si no hay token
        return;
      }

      // 2. Verificación de validez de la fecha
      if (!selectedDate || !(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
        console.warn("UseWastesData: Invalid selectedDate provided. Skipping data fetch.");
        setWastesData([]);
        setFirstname(''); // Limpiar nombre si la fecha es inválida
        return;
      }

      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();

      console.log(`UseWastesData: Fetching data for Month: ${month}, Year: ${year}`);

      try {
        const response = await fetch(`http://localhost:3001/dashboard?month=${month}&year=${year}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorJson = await response.json();
          console.error("UseWastesData: Dashboard API Error Response:", errorJson);
          throw new Error(`Erreur du serveur: ${response.status} - ${errorJson.error || 'Erreur inconnue'}`);
        }

        const json = await response.json();
        console.log("UseWastesData: Raw API Response:", json); // Para ver todo el JSON

        // 3. Procesamiento y guardado de los datos
        if (json && Array.isArray(json.wastes)) {
          setWastesData(json.wastes);
          // <--- ¡ASEGURATE DE QUE ESTA LÍNEA ESTÁ AQUÍ Y ES CORRECTA!
          setFirstname(json.firstname || 'Utilisateur'); // Guarda el nombre recibido, con un fallback
          console.log("UseWastesData: Firstname set to:", json.firstname);
          
        } else {
          console.warn("UseWastesData: Unexpected dashboard data format, expected { wastes: [], firstname: '' }:", json);
          setWastesData([]);
          setFirstname('Utilisateur'); // Fallback para el nombre si el formato es inesperado
        }
      } catch (err) {
        console.error('UseWastesData: Error in fetchData:', err);
        setWastesData([]);
        setFirstname('Utilisateur'); // Limpiar y usar fallback en caso de error
      }
    }

    fetchData();
  }, [user, selectedDate]); // Dependencias del useEffect

  return { wastesData, firstname };
}