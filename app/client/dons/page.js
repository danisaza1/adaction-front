"use client";
import {
  Card,
  CardHeader,
  CardTitle,
} from "../../components/card";
import { Gift } from "lucide-react";
import DonationCard from "../../components/DonationCard";
import NavBar from "app/components/navbar";
import { useAuth } from '../../context/authContext';


export default function Dons() {
  // let dataDons = { asso_name, points, volunteer_id};
  const { user } = useAuth();
 const fetchD = async (asso_name, points) => {
  if (!user?.id) {
    console.error("Utilisateur non identifié !");
    return;
  }

  const response = await fetch("http://localhost:3001/donations", {
    
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
     asso_name, 
     points, 
     volunteerId: user.id,
  }),
  });

  // volunteer_id: volunteerId, 
  
  const json = await response.json();
  console.log("Donation envoyée avec succès !", json);
  } 
  
  

  // return data;
  
  return (
      <>
              <NavBar role="client"/>
       <Card className="pt-2">
    <Card className="flex justify-center w-full max-w-md mx-auto p-3">
      <CardHeader className="w-full">
        <CardTitle className="flex font-bold justify-center text-xl">
          Faire un don
        </CardTitle>
        <div className="flex justify-center color text-emerald-700">
          <Gift />
          Points collectés :
        </div>
      </CardHeader>

      <DonationCard 
      emoji="🌊"
       assoName="Ocean Cleanup"
       desc="Association dédiée au nettoyage des océans et à la protection de la vie marine."
       points="100"
       fetchD={fetchD}
      />
         <DonationCard 
      emoji="🌳"
       assoName="Forest Guardians"
       desc="Protection des forêts et reforestation à travers le monde."
       points="150"
       fetchD={fetchD}
      />
         <DonationCard 
      emoji="🦁"
       assoName="Wildlife Protectors"
       desc="Protection des espèces menacées et préservation de leur habitat."
       points="200"
       fetchD={fetchD}
      />
         <DonationCard 
      emoji="🌬️"
       assoName="Clean Air Initiative"
       desc="Lutte contre la pollution de l'air et promotion des énergies propres."
       points="120"
       fetchD={fetchD}
      />
      </Card>
    </Card>
    </>
  );

}