import { Pen } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export default function ListOfVolunteers({ volunteers, onDelete, onEdit }) {
  return (
    <>
      <div id="container" className="w-full">
        {volunteers.map((a) => (
          <div key={a.id} id='case' className="mb-2">
            <div className="flex flex-row gap-4 border rounded-md p-2 m-2 w-full items-center justify-between">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <h3 className="font-semibold text-lg">{a.firstname} {a.lastname}</h3>
                <p className="text-gray-400 text-sm sm:text-base"> {a.location}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <button
                  onClick={() => onEdit(a)}
                  className="p-2 min-w-0 bg-blue-100 hover:bg-blue-200 rounded-md flex items-center justify-center transition-colors duration-200"
                >
                  <Pen className="text-blue-500 size-4" />
                </button>
                <button
                  onClick={() => onDelete(a.id)}
                  className="p-2 min-w-0 bg-rose-100 hover:bg-rose-200 rounded-md flex items-center justify-center transition-colors duration-200"
                >
                  <Trash2 className="text-red-400 size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {volunteers.length === 0 && (
          <p className="text-center text-gray-500 mt-4">Aucun bénévole trouvé.</p>
        )}
      </div>
    </>
  );
}