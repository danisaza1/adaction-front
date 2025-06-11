// profilPage.js
"use client";
import { Button } from "../../components/button";
import { UserPlus, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from "../../components/card";
import SimpleSelect from "../../components/simpleselect";
import { useState } from "react"; // useEffect is now used within the hooks
import NavBar from "../../components/navbar";
import Formulaire from "../../components/formulaire";
import { useCitiesGet, useVolunteersData } from "./dataFetch.js"; // Import the custom hooks
import { Modal } from "../../components/modal";
import ListOfVolunteers from "../../components/listOfVolunteers";

export default function ProfilPage() {
  // Use the custom hooks
  const cities = useCitiesGet();
  const {
    volunteers,
    fetchVolunteers,
    handleDeleteVolunteer,
    handleEditVolunteer,
    editingVolunteer,
    setEditingVolunteer
  } = useVolunteersData();

  const [city, setCity] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingVolunteer(null); // Reset editing state when form closes
    fetchVolunteers(); // Refetch volunteers after form is closed
  };

  // handleEditVolunteer is now directly from useVolunteersData, no need to define it here again

  return (
    <>
      <NavBar role="asso" />
      <div className="flex justify-center p-4">
        <CardContent className="flex justify-center">
          <Card>
            <CardHeader>
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={() => {
                    setEditingVolunteer(null); // Ensure no volunteer is being edited when adding new
                    setShowForm(true);
                  }}
                  className="flex gap-2 mb-4 p-6 w-80 text-white normal-case bg-emerald-700 hover:bg-emerald-800 transition-colors duration-200"
                >
                  <UserPlus className="text-white" />
                  <p className="text-white normal-case">Ajouter un.e bénévole</p>
                </Button>
              </div>
              <div className="flex flex-row justify-between w-full items-center mb-6">
                <div className="flex-grow mr-4">
                  <input
                    placeholder="Rechercher un.e bénévole..."
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-600" />
                  <SimpleSelect options={cities} value={city} onChange={setCity} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
              <ListOfVolunteers
                volunteers={volunteers}
                onDelete={handleDeleteVolunteer}
                onEdit={(volunteer) => { 
                  handleEditVolunteer(volunteer);
                  setShowForm(true);
                }}
              />
            </CardContent>
          </Card>
        </CardContent>
      </div>
      <Modal isOpen={showForm} onClose={handleCloseForm}>
        <Formulaire
          onClose={handleCloseForm}
          onVolunteerAdded={fetchVolunteers} 
          onVolunteerUpdated={fetchVolunteers} 
          volunteerToEdit={editingVolunteer}
        />
      </Modal>
    </>
  );
}