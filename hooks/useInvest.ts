import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useInvest({
  amount,
  available,
  minimum,
  userId,
  _finally,
}: {
  amount: number;
  available: number;
  minimum: number;
  userId: string;
  _finally?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function makeInvest() {
    if (available < minimum) {
      toast.error(`Insufficient balance!`, { duration: 800 });
      return;
    }

    if (amount < minimum) {
      toast.error(`Minimum ${minimum} USDT required!`);
      return;
    }

    if (amount > available) return;

    setLoading(true);

    try {
      const { data } = await axios.post(`/api/v2/polygon/invest`, {
        userId,
        amount,
      });

      if (data?.success) {
        toast.success(`Congrats, You've invested ${amount} USDT!`);
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        toast.error(data?.message || `Please add some 'MATIC' for gas fees!`);
      }
    } catch (error: any) {
      toast.success(error?.message);
    } finally {
      _finally && _finally();
      setLoading(false);
    }
  }

  return { makeInvest, loading };
}
