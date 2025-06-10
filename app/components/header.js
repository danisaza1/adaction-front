import { Recycle } from "lucide-react";

export default function Header() {
  return (
    <div className="flex-col center text-center text-white p-5 bg-emerald-600 ">
      {/* Cambia 'flex-col' a 'flex' aquí */}
      <h4 className="flex items-center justify-center font-bold text-xl">
        <Recycle className="mr-2 font-bold" /> {/* Añade un margen a la derecha para separar el icono del texto */}
        Adaction
      </h4>
      <p className="mt-3 font-extralight font-sm">Agir pour un environnement plus propre</p>
    </div>
  );
}