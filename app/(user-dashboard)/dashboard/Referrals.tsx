"use client";

import { Table } from "flowbite-react";

interface Props {
  referrals?: userSchemaType[];
}
export default function Referrals({ referrals }: Props) {
  return (
    <div>


      <div className="overflow-x-auto">
        <Table className="w-full">
          <Table.Head className="font-bold border-b">
            <Table.HeadCell>Email </Table.HeadCell>
            <Table.HeadCell>Username </Table.HeadCell>
            <Table.HeadCell>Deposit </Table.HeadCell>
            <Table.HeadCell>Profits</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {referrals?.map((r) => (
              <Table.Row
                key={r?._id}
                className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell> {r?.email} </Table.Cell>
                <Table.Cell> {r?.username} </Table.Cell>
                <Table.Cell> ${r?.investBalance?.toFixed(2)} </Table.Cell>
                <Table.Cell> ${r?.profitBalance?.toFixed(2)} </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
