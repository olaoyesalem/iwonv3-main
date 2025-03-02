import HomeComponents from "@/components/homepage";
import Wrapper from "@/components/Wrapper";
import mongooseConnect from "@/lib/mongoose";
import Company from "@/models/Company";
import Node from "@/models/Node";

export default async function page() {
  await mongooseConnect();
  const nodes = await Node.find();
  const node = (nodes[0] as nodeTypes) || {};

  const companies = await Company.find();
  const company = (companies[0] as CompanyProps) || {};

  return (
    <Wrapper>
      <HomeComponents node={node} company={company} />
    </Wrapper>
  );
}
