import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export default function useUsers(isUsersObjectById?: boolean) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const adminId = (session?.user as { id: string })?.id;
  const [users, setUsers] = useState<userSchemaType[]>([]);
  const [usersObject, setUsersObject] = useState(
    {} as { [key: string]: userSchemaType }
  );

  const getTransactions = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/admin/users/${adminId}`);

    if (data.error) {
      console.log(data.error);
      throw new Error("Something went wrong");
    }

    setUsers(data.reverse());
    setLoading(false);
  }, [adminId]);

  useEffect(() => {
    if (adminId) getTransactions();
  }, [adminId, getTransactions]);

  useEffect(() => {
    if (isUsersObjectById && users) {
      const object = users.reduce(
        (acc, val) => {
          acc[val._id] = val;
          return acc;
        },
        {} as { [key: string]: userSchemaType }
      );

      object && setUsersObject(object);
    }
  }, [isUsersObjectById, users]);

  return { users, setUsers, usersObject, loading };
}
