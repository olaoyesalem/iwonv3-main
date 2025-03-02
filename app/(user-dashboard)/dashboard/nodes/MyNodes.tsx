import React from "react";
import { FaHistory } from "react-icons/fa";
interface Props {
  user_nodes?: userNodeTypes[];
}

export default function MyNodes({ user_nodes }: Props) {
  const totalSeats = user_nodes?.reduce((acc, val) => {
    acc += val.seats_purchased;
    return acc;
  }, 0);

  return (
    <div className="bg-green-500 p-2 rounded shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white flex items-center justify-start gap-x-1">
          <FaHistory /> My Nodes History
        </h2>

        <p className="text-white text-lg">My Seats: {totalSeats} </p>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="max-h-[75vh] overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-white rounded-b">
            <thead className="text-xs text-green-600 uppercase border-b-2">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold">
                  Purchased Seats
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                  Seat Price
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                  Total Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {user_nodes?.map((n) => (
                <tr className="border-b">
                  <td className="px-6 py-4">{n?.seats_purchased}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono">$</span>
                    {n?.purchaseCalculatedData?.currentPrice?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">${n?.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
