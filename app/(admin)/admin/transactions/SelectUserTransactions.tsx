"use client";

import { Autocomplete } from "@mantine/core";

interface Props {
  onChangeId(id: string): void;
  users: userSchemaType[];
}
export default function SelectUserTransactions({ onChangeId, users }: Props) {
  function getIdByUsername(username: string) {
    const userId = users.find((u) => u.username === username)?._id || "";
    onChangeId(userId);
  }

  return (
    <div className="flex items-center justif-center gap-x-2 w-full max-w-[450px]">
      <span className="whitespace-nowrap font-bold"> Filter By User: </span>
      <Autocomplete
        className="w-full"
        placeholder="Search by username"
        limit={15}
        data={users?.map((u) => u?.username)}
        onChange={getIdByUsername}
      />
    </div>
  );
}
