import React from "react";
interface Props {
  user_nodes?: userNodeTypes[];
}
export default function UserNodes({ user_nodes }: Props) {
  return (
    <div className="bg-green-500 p-2 rounded shadow">
      <h2 className="text-xl font-bold mb-2 text-white"> User Nodes </h2>
      <div className="w-full overflow-x-auto">
        <div className="max-h-[75vh] overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-white rounded-b">
            <thead className="text-xs text-green-600 uppercase border-b-2">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold">
                  User
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                  Seats Purchased
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
                  <td className="px-6 py-4">
                    <div>
                      <p>{n?.userId?.username}</p>
                      <p>{n?.userId?.email}</p>
                    </div>
                  </td>

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
