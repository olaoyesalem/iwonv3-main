import Breadcrumb from "@/components/common/Breadcrumb";

import Wrapper from "@/components/Wrapper";
import ContactArea from "./ContactArea";
import ContactForm from "@/components/homepage/ContactForm";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";

const Contact = () => {
  return (
    <Wrapper>
      <Header />
      <Breadcrumb title="Get in touch" page_title="Contact us" />
      <ContactArea />
      <ContactForm />
      <Footer />
    </Wrapper>
  );
};

export default Contact;
