import React, { useContext, useReducer } from "react";
import { reducer, setInitialState } from "../../utils/store/MovementsReducer";
import { MovementsContext } from "../../utils/store/MovementsContext";

const MovementsTable = () => {
  const movements = useContext(MovementsContext)
  const currencyFormatter = new Intl.NumberFormat('es-CL',{style: 'currency', currency:'CLP'})
  if (movements.length > 0 ) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Movimiento
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Fecha
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Monto
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tipo
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {movements.map((movement) => {
              return (
                <tr className="hover:bg-gray-50">
                  <th className="px-6 py-4 font-medium text-gray-900">
                    <span className="block">{movement.description}</span>
                    <span className="block font-normal">{movement.origin}</span>
                  </th>
                  <td className="px-6 py-4">
                    <p>{movement.date}</p>
                    
                    </td>
                  <td className="px-6 py-4">{currencyFormatter.format(movement.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold ${movement.type === 'INGRESS' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                     
                      {movement.type === "INGRESS" ? 'Pago' : 'Gasto' }
                    </span>
                  </td>
                  <td className="flex justify-end gap-4 px-6 py-4 font-medium">
                    <a href="">Delete</a>
                    <a href="" className="text-primary-700">
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default MovementsTable;
