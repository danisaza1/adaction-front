"use client";

import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { PackagePlus } from 'lucide-react';
import { Heart } from 'lucide-react';
import { User } from 'lucide-react';




export default function NavBar({ role }) {
  return (
    <nav className="p-4 shadow bg-white flex justify-center text-base gap-12 text-gray-400 ">
      {/* Condition ternaire corrigée */}
      {role === 'client' ? ( // Si le rôle est 'client'
        <>
          <Link href="/client/dashboard" className='flex'> <Sprout className="mr-2" />Dashboard</Link>
          <Link href="/client/collectes" className='flex'> <PackagePlus className="mr-2" />Collectes</Link>
          <Link href="/client/dons" className='flex'>  <Heart className="mr-2" />Dons</Link>
          <Link href="/client/profil" className='flex'>   <User className="mr-2" />Profil</Link>
        </>
      ) : role === 'asso' ? ( // Sinon, si le rôle est 'asso'
        <>
          <Link href="/asso/gestion">Gestion des bénévoles</Link>
          <Link href="/asso/leaderboard">Leaderboard</Link>
        </>
      ) : ( // Sinon (pour tout autre rôle ou si aucun rôle n'est spécifié)
        // Tu peux choisir d'afficher rien, un message, ou des liens par défaut
        <p>Sélectionnez un rôle pour voir la navigation.</p> 
      )}
    </nav>
  );
}