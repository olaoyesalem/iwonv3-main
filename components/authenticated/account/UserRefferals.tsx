import TailwindSkeletonMultiple from "@/components/common/TailwindSkeletonMultiple";
import useTheme from "@/components/hooks/useTheme";
import ArrowRotateRight from "@/components/icons/ArrowRotateRight";
import useUserReferrals from "@/hooks/useUserReferrals";
import React from "react";

interface Props {
  title?: string;
  username: string;
}

export default function UserRefferals({ title, username }: Props) {
  const { mode } = useTheme();
  const { referrals, loading, refreshReferrals } = useUserReferrals(username);

  if (loading)
    return (
      <div className="w-full space-y-1.5">
        <TailwindSkeletonMultiple total={4} className="w-full h-14" />
      </div>
    );

  return (
    <div className="w-full space-y-2">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-2xl font-semibold mb-1">
          {title || " My Referrals "} <small> ({referrals?.length}) </small>
          <button title="refresh latest referrals" onClick={refreshReferrals}>
            <ArrowRotateRight />
          </button>
        </h3>
      </div>
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
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-start text-xs font-bold !text-gray-500 uppercase"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-start text-xs font-bold !text-gray-500 uppercase"
                  >
                    Deposit
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-start text-xs font-bold !text-gray-500 uppercase"
                  >
                    Profits
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${mode === "dark" ? "!divide-gray-600" : "!divide-gray-200"}`}
              >
                {!referrals || referrals?.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-red-500 p-4">
                      No Refferals Yet!
                    </td>
                  </tr>
                ) : (
                  referrals?.map((r) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                        <span className="text-lg">{r?.email}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                        <span className="text-lg">{r?.username}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                        <span className="text-lg font-bold text-orange-600">
                          {r?.investBalance?.toFixed(2)}
                        </span>
                      </td>{" "}
                      <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                        <span className="text-lg font-bold text-green-600">
                          + {r?.profitBalance?.toFixed(2)}
                        </span>
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
