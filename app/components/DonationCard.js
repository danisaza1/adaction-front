import React from 'react';
import { Card, CardContent, CardHeader, Box} from '@mui/material';
import { CardFooter } from './card';
import { Button } from './button';

export default function DonationCard ({ emoji, assoName, desc, points,fetchD}) {
  return (

   <Card className="flex flex-col items-start justify-between border border-gray-100 rounded-lg p-3 transition-all duration-200 ease-in transform hover:-translate-y-1 hover:scale-102">
        <h3 className="flex text-lg font-bold text-gray-800 h-10"> <span className="text-2xl mr-3 inline-block -mt-1.5">{emoji}</span>{assoName}</h3>
        <p className="text-gray-600">{desc}</p>
      <hr className="my-4 w-full border-gray-300" />
      <div className="flex flex-row w-full"> 
    <span className="given-points text-emerald-600 flex flex-col leading-[1.1] pr-4">
       <span>{points}</span>
  <span>points</span>
    </span>
  <Button className="bg-emerald-600 hover:bg-emerald-700 flex flex-auto" variant="default" size="default" onClick={() => fetchD(assoName, parseInt(points))}>
          Faire un don
        </Button>
      </div>
      </Card>
  );
}
      // <Card
      // className="flex flex-col p-2 pl-6 "></Card>
//  <div className={`waste-label flex items-center justify-center w-10 h-10 border rounded-sm rounded mr-2 ${bgClass}`}>
//         {svgIcon}
//       </div>
//       <div className="flex flex-col justify-center"></div>