import { Button } from "flowbite-react";
import Link from "next/link";

interface Props {
  node: nodeTypes;
}

const NodeDetails = ({ node }: Props) => {
  const available_seats = (node?.total_seats || 0) - (node?.sold_seats || 0);
  return (
    <section className="brand pb-150 pt-12">
      <div className="container space-y-6">
        <div className="space-y-3">
          <h2 className="!text-white text-xl font-semibold underline">
            {node?.name}
          </h2>
          <p className="!text-gray-200"> {node?.description} </p>
        </div>

        <div className="w-full lg:w-[450px] bg-blue-500 text-white p-4 rounded">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <h6 className="text-base text-gray-100 font-normal"> node </h6>
              <h3 className="text-2xl font-bold"> {node?.name} </h3>
            </div>
            <div className="col-span-6">
              <h6 className="text-base text-right text-gray-100 font-normal">
                Price
              </h6>
              <h3 className="text-2xl text-right font-bold">${node?.price}</h3>
            </div>

            <div className="col-span-6">
              <h6 className="text-base text-gray-100 font-normal"> Sold </h6>
              <h3 className="text-2xl font-bold"> {node?.sold_seats} </h3>
            </div>
            <div className="col-span-6">
              <h6 className="text-base text-right text-gray-100 font-normal">
                Available
              </h6>
              <h3 className="text-2xl text-right font-bold">
                {available_seats}
              </h3>
            </div>
          </div>
        </div>

        <Link className="w-fit block" href="/dashboard/nodes">
          <Button color="green">Book My Node</Button>
        </Link>
      </div>
    </section>
  );
};

export default NodeDetails;
