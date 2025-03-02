"use client";
import useTheme from "@/components/hooks/useTheme";
import useUserInvestments from "@/hooks/useUserInvestments";
interface Props {
  user?: userSchemaType;
}
export default function UserInvestments({ user }: Props) {
  const { deposits } = useUserInvestments(user?._id);
  const { mode } = useTheme();

  return (
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold mb-1"> My Deposits </h3>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table
              className={`${
                mode === "dark"
                  ? "bg-gray-800 divide-gray-600"
                  : "bg-gray-100 divide-gray-200"
              } p-5 rounded overflow-hidden min-w-full divide-y `}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-start text-xs font-bold !text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-start text-xs font-bold !text-gray-500 uppercase"
                  >
                    Deposit Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-start text-xs font-bold !text-gray-500 uppercase"
                  >
                    Profit
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-start text-xs font-bold !text-gray-500 uppercase"
                  >
                    Lock Perion End
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${mode === "dark" ? "!divide-gray-600" : "!divide-gray-200"}`}
              >
                {!deposits || deposits?.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-red-500 p-4">
                      No Investments Yet!
                    </td>
                  </tr>
                ) : (
                  deposits?.map((r) => (
                    <tr>
                      {" "}
                      <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                        <div className="flex flex-col">
                          <span className="text-lg">
                            {new Date(r?.createdAt)?.toLocaleDateString() || 0}
                          </span>
                          <span>
                            {new Date(r?.createdAt)?.toLocaleTimeString() || 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                        <span className="text-lg font-bold text-orange-600">
                          {r?.amount?.toFixed(2)} USDT
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                        <span className="text-green-600 text-lg font-bold">
                          + {r?.profit?.toFixed(2)} USDT
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                        <div className="flex flex-col">
                          <span className="text-lg">
                            {new Date(r?.lockPeriodEnd)?.toLocaleDateString() ||
                              0}
                          </span>
                          <span>
                            {new Date(r?.lockPeriodEnd)?.toLocaleTimeString() ||
                              0}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
