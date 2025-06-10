import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
// import WasteCard from WasteCard;
import { Cigarette, Package, Wine, Trash2, Smartphone, CircleHelp  } from 'lucide-react';
import WasteCard from './WasteCard';


const icons = {
  cigarette_butts: { bg: 'bg-yellow-400', icon: Cigarette, iconColor: 'text-white', title: 'Mégots de cigarette' },
  plastic: { bg: 'bg-blue-400', icon: Package, iconColor: 'text-white', title: 'Plastique' },
  glass: { bg: 'bg-green-300', icon: Wine, iconColor: 'text-white', title: 'Verre' },
  metal: { bg: 'bg-gray-400', icon: Trash2, iconColor: 'text-white', title: 'Métal' },
  electronic: { bg: 'bg-purple-400', icon: Smartphone, iconColor: 'text-white', title: 'Électronique' },
  others: { bg: 'bg-red-400', icon: CircleHelp, iconColor: 'text-white', title: 'Autre' },
};
export default function ConteneurDashboard ({wastesData}) {
console.log("ConteneurDashboard - wastesData received:", wastesData, "Type:", typeof wastesData, "Is Array:", Array.isArray(wastesData));


 if (!Array.isArray(wastesData) || wastesData.length === 0) {
  return (
      <Card style={{ boxShadow: 'none'}}>
        <CardContent className="grid grid-cols gap-2 bg-white">
          <p className="text-center text-gray-500">
            {Array.isArray(wastesData) && wastesData.length === 0
              ? "Aucune donnée de déchets pour le moment." // No hay datos
              : "Chargement des données ou format de données inattendu..." // Cargando o error de formato
            }
          </p>
        </CardContent>
      </Card>
    );
  }

     return (
    <Card style={{ boxShadow: 'none'}}>
      <CardContent className="grid grid-cols gap-2 bg-white">
        {wastesData.map(({ id, type, quantity }) => {
          console.log('type:', type);
          const config = icons[type]; 
  if (!config) {
    console.warn(`Type inconnu dans icons: '${type}' (id: ${id})`);
    // Tu peux soit sauter cet élément, soit afficher un fallback
    return null; // ne rien afficher pour ce type inconnu
  }     
          const IconComponent = config.icon;
          return (
            <WasteCard
              key={id}
              svgIcon={<IconComponent size={26} className={config.iconColor} />}
              waste_type={config.title}  // affiche le titre lisible
              quantity={quantity}
              bgClass={config.bg}/>
          );
        })}
      </CardContent>
    </Card>
);
}
