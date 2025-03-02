"use client";

import { Table } from "flowbite-react";

interface Props {
  data?: depositType[];
}
export default function DepositsTable({ data }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold my-3 text-gray-800">
        My Deposits <small> ({data?.length}) </small>{" "}
      </h2>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <Table.Head className="font-bold border-b">
            <Table.HeadCell> Date </Table.HeadCell>
            <Table.HeadCell> Amount </Table.HeadCell>
            <Table.HeadCell> Profit </Table.HeadCell>
            <Table.HeadCell> Status </Table.HeadCell>
            <Table.HeadCell> Lock Perion End </Table.HeadCell>
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
                <Table.Cell> ${item?.profit?.toFixed(2)} </Table.Cell>
                <Table.Cell> {item?.status} </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col">
                    <span>{new Date(item?.lockPeriodEnd).toDateString()} </span>
                    <span>
                      {new Date(item?.lockPeriodEnd).toLocaleTimeString()}{" "}
                    </span>
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
