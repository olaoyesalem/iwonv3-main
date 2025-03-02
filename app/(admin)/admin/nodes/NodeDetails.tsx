"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import axios from "axios";
import { InputHTMLAttributes, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";

function NodeProperty({
  keyTitle,
  value,
  editView,
  inputProps,
}: {
  keyTitle: string;
  value?: string | number;
  editView?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}) {
  return editView ? (
    <div className="py-2">
      <b className="whitespace-nowrap mb-1"> {keyTitle}: </b>
      <Input
        {...inputProps}
        value={value}
        placeholder={keyTitle.toLowerCase()}
      />
    </div>
  ) : (
    <div className="flex items-start gap-x-3 text-xl py-1">
      <p className="whitespace-nowrap font-semibold"> {keyTitle}: </p>
      <p className="font-bold"> {value} </p>
    </div>
  );
}

interface Props {
  node?: nodeTypes;
}

export default function NodeDetails({ node: n }: Props) {
  const [node, setNode] = useState(n);
  const [loading, setLoading] = useState(false);
  const [editView, setEditView] = useState(false);

  const [name, set_name] = useState("");
  const [description, set_description] = useState("");
  const [price, set_price] = useState("");
  const [total_seats, set_total_seats] = useState("");
  const [price_increment_milestone, set_price_increment_milestone] =
    useState("");
  const [price_increment, set_price_increment] = useState("");
  const [sold_seats, set_sold_seats] = useState("");
  const [total_sold_amount, set_total_sold_amount] = useState("");

  useEffect(() => {
    set_name(node?.name || "");
    set_description(node?.description || "");
    set_price(node?.price.toString() || "");
    set_total_seats(node?.total_seats.toString() || "");
    set_price_increment_milestone(
      node?.price_increment_milestone.toString() || ""
    );
    set_price_increment(node?.price_increment.toString() || "");
    set_sold_seats(node?.sold_seats.toString() || "");
    set_total_sold_amount(node?.total_sold_amount.toString() || "");
  }, [node]);

  useEffect(() => {
    setNode(n);
  }, [n]);

  async function update() {
    if (!price || !total_seats) {
      toast.error("Price & Total Seats is required!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(`/api/v2/node/${node?._id}`, {
        name,
        description,
        price: Number(price || "1000"),
        total_seats: Number(total_seats || "10000"),
        price_increment_milestone: Number(price_increment_milestone || "10000"),
        price_increment: Number(price_increment || "10000"),
        sold_seats: Number(sold_seats || "0"),
        total_sold_amount: Number(total_sold_amount || "0"),
      });

      data?.node && setNode(data?.node);
      toast.success("Node Successfull updated!");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
      setEditView(false);
    }
  }

  return (
    <div className="space-y-2 w-full p-6 bg-green-50 shadow">
      <NodeProperty
        editView={editView}
        keyTitle="Node Name"
        value={name}
        inputProps={{
          onChange: (e) => set_name(e.target.value),
        }}
      />

      <NodeProperty
        editView={editView}
        keyTitle="Description"
        value={description}
        inputProps={{
          onChange: (e) => set_description(e.target.value),
        }}
      />

      <NodeProperty
        editView={editView}
        keyTitle="Per Seat Price"
        value={price}
        inputProps={{
          onChange: (e) => set_price(e.target.value),
        }}
      />

      <NodeProperty
        editView={editView}
        keyTitle="Total Seats"
        value={total_seats}
        inputProps={{
          onChange: (e) => set_total_seats(e.target.value),
        }}
      />

      <NodeProperty
        editView={editView}
        keyTitle="Increment Milestone Sales"
        value={price_increment_milestone}
        inputProps={{
          onChange: (e) => set_price_increment_milestone(e.target.value),
        }}
      />

      <NodeProperty
        editView={editView}
        keyTitle="Milestone Price Increase"
        value={price_increment}
        inputProps={{
          onChange: (e) => set_price_increment(e.target.value),
        }}
      />

      <NodeProperty
        editView={editView}
        keyTitle="Sold Seats"
        value={sold_seats}
        inputProps={{
          onChange: (e) => set_sold_seats(e.target.value),
        }}
      />

      <NodeProperty
        editView={editView}
        keyTitle="Total Sold Amount"
        value={total_sold_amount}
        inputProps={{
          onChange: (e) => set_total_sold_amount(e.target.value),
        }}
      />

      {editView ? (
        <div className="flex items-center gap-x-2">
          <Button color="red" size="lg" onClick={() => setEditView(false)}>
            Cancel <FaTimes />
          </Button>
          <Button color="green" size="lg" onClick={update} loading={loading}>
            Submit <FaCheck />
          </Button>
        </div>
      ) : (
        <div className="w-fit">
          <Button color="blue" size="lg" onClick={() => setEditView(true)}>
            <FaPencilAlt /> Edit
          </Button>
        </div>
      )}
    </div>
  );
}
