
// import { Card } from "./card";
import { useState } from "react";
import { Users, LogIn } from 'lucide-react';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';

export default function LoginCard() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter(); 
  
    const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    await login(email, password);
    console.log('Formulaire soumis');
    router.push('/client/dashboard');
  } catch (error) {
    alert('Erreur lors de la connexion : ' + error.message);
  }
};
    return (
    <div className="login mt-2 flex flex-col items-center max-w-md mx-auto p-6 bg-white border rounded-md shadow">
      <h2 className="text-center font-bold w-full">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email"   value={email}
  onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div> 
          <label>Mon de passe </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
       <button id="login-button" type="submit" className="mt-5 gap-2 flex justify-center bg-emerald-600 shadow-xl hover:bg-emerald-500 text-white font-bold border rounded-xl shadow p-3 w-full"> <LogIn /> Se connecter</button>
        <button id="register-button" type="button" className="mt-5 gap-2 flex justify-center bg-emerald-600 shadow-xl hover:bg-emerald-500 text-white font-bold border rounded-xl shadow p-3 w-full" onClick={() => router.push('/asso/gestion')}>  <Users /> Gérer les bénévoles</button> 
        </div>
      </form>
    </div>
  );
}
