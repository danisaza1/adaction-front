'use client';
import React, { useState, useEffect } from 'react';

export default function Formulaire({ onClose, onVolunteerAdded, onVolunteerUpdated, volunteerToEdit }) {
  const [firstName, setFirstName] = useState(volunteerToEdit?.firstname || '');
  const [lastName, setLastName] = useState(volunteerToEdit?.lastname || '');
  const [email, setEmail] = useState(volunteerToEdit?.email || '');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(volunteerToEdit?.location || '');

  useEffect(() => {
    if (volunteerToEdit) {
      setFirstName(volunteerToEdit.firstname || '');
      setLastName(volunteerToEdit.lastname || '');
      setEmail(volunteerToEdit.email || '');
      setLocation(volunteerToEdit.location || '');
      setPassword('');
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setLocation('');
    }
  }, [volunteerToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      ...(password && { password }),
      location,
    };

    console.log('Submitting Form Data:', formData);

    try {
      let res;
      if (volunteerToEdit) {
        res = await fetch(`http://localhost:3001/updateProfil/${volunteerToEdit.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch("http://localhost:3001/profil", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (res.ok) {
        const json = await res.json();
        console.log("Server Response:", json);

        if (volunteerToEdit && onVolunteerUpdated) {
          onVolunteerUpdated();
        } else if (onVolunteerAdded) {
          onVolunteerAdded();
        }
        onClose();
      } else {
        const errorData = await res.json();
        console.error("Failed to submit volunteer data:", res.status, res.statusText, errorData);
        alert(`Erreur: ${errorData.error || "Impossible de soumettre les données du bénévole."}`);
      }
    } catch (error) {
      console.error("Network error during form submission:", error);
      alert("Une erreur réseau s'est produite lors de la soumission du formulaire.");
    }
  };

  return (
    <div className="p-4 w-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {volunteerToEdit ? 'Modifier le bénévole' : 'Ajouter un.e bénévole'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="form-firstname" className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            id="form-firstname"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="form-lastname" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            id="form-lastname"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="form-email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="form-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="form-password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            id="form-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required={!volunteerToEdit}
          />
          {!volunteerToEdit && (
            <p className="text-sm text-gray-500 mt-1">Le mot de passe est requis pour un nouveau bénévole.</p>
          )}
          {volunteerToEdit && (
            <p className="text-sm text-gray-500 mt-1">Laissez vide pour conserver le mot de passe actuel.</p>
          )}
        </div>
        <div>
          <label htmlFor="form-location" className="block text-sm font-medium text-gray-700">Localisation</label>
          <input
            id="form-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200"
          >
            {volunteerToEdit ? 'Mettre à jour' : 'Ajouter'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}