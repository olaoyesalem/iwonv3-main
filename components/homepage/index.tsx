import Banner from "./Banner";
import Brand from "./Brand";
import ContactForm from "./ContactForm";
import Header from "../headers/Header";
import FooterThree from "../footers/Footer";
import Presentation from "./Presentation";
import NodeDetails from "./NodeDetails";

interface Props {
  company: CompanyProps;
  node: nodeTypes;
}

const HomeComponents = ({ company, node }: Props) => {
  return (
    <div className="body_wrap">
      <main>
        <Header />
        <Banner company={company} />
        <div className="bg-[#0b0b29]">
          <NodeDetails node={node} />
          <div className="md:px-16 lg:px-32 md:pb-16">
            <div
              className="relative w-full sm:rounded-xl overflow-hidden"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                title="iwon video"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/AHoLUD6DuaY"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <Presentation />
          <Brand />
          <ContactForm />
          <FooterThree />
        </div>
      </main>
    </div>
  );
};

export default HomeComponents;
