"use client";

import CopyIconButton from "@/components/common/CopyIconButton";
import { Table } from "flowbite-react";

interface Props {
  data?: TransactionType[];
}
export default function TransactionsTable({ data }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold my-3 text-gray-800">
        My Transactions <small> ({data?.length}) </small>
      </h2>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <Table.Head className="font-bold border-b">
            <Table.HeadCell> Date </Table.HeadCell>
            <Table.HeadCell> Amount </Table.HeadCell>
            <Table.HeadCell> Category </Table.HeadCell>
            <Table.HeadCell> From </Table.HeadCell>
            <Table.HeadCell> To </Table.HeadCell>
            <Table.HeadCell> Status </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {data?.map((item) => (
              <Table.Row
                key={item?._id}
                className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <div className="flex flex-col">
                    <span>
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      {new Date(item?.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-xl">${item?.amount?.toFixed(2)}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="w-fit bg-orange-100 px-2 py-1 rounded">
                    {item?.category}
                  </div>
                </Table.Cell>

                <Table.Cell>
                  {item?.category === "deposit" && "My Assets"}
                  {item?.category === "withdrawal" && "account balance"}
                  {item?.category === "re-invest" && "profit balance"}
                  {item?.category === "referral-commision" &&
                    (item?.from || item?.commissionFrom)}
                </Table.Cell>

                <Table.Cell>
                  {(item?.category === "re-invest" ||
                    item?.category === "deposit") &&
                    "Deposit Balance"}

                  {item?.category === "withdrawal" && (
                    <CopyIconButton value={item?.blockchain?.toWallet}>
                      {item?.blockchain?.toWallet?.slice(0, 5)}...
                      {item?.blockchain?.toWallet?.slice(
                        item?.blockchain?.toWallet?.length - 5,
                        item?.blockchain?.toWallet?.length
                      )}
                    </CopyIconButton>
                  )}

                  {item?.category === "referral-commision" && "Profit Balance"}
                </Table.Cell>

                <Table.Cell>
                  <div className="w-fit bg-orange-500 text-white px-2 py-1 rounded">
                    {item?.status}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
