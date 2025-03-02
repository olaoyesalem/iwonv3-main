import Wrapper from "@/components/Wrapper";
import ContactForm from "@/components/homepage/ContactForm";
import Header from "@/components/headers/Header";
import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footers/Footer";

const About = () => {
  return (
    <Wrapper>
      <Header />
      <Breadcrumb title="About US" page_title="About US" />
      <div className="">
        <div className="py-20 container">
          <div className="xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 border-1 !border-gray-800 !border-opacity-50 space-y-4">
            <h6 className="text-2xl mb-6">Why Deposit with iWon?</h6>
            <p className="lg:text-xl">
              The iWon investment platform, is dedicated to providing users with
              a reliable, secure, and easy-to-use cryptocurrency investment
              process. We aim to make cryptocurrency investments accessible to
              everyone, regardless of experience, while delivering a seamless \
              secure environment for long-term growth and success.
            </p>
            <p className="font-semibold">
              Key Features of iWon Investment Platform:
            </p>
            <ul className="list-disc pl-12 space-y-3 lg:text-lg">
              <li>
                Wide Range of Cryptocurrencies: Access a variety of digital
                assets to diversify your investment portfolio.
              </li>
              <li>
                User-Centric Design: Navigate through our platform with ease,
                whether you are a beginner or an experienced investor.
              </li>
              <li>
                Top-Level Security: Safeguard your investments with our
                state-of-the-art encryption and security measures.
              </li>
              <li>
                24/7 chat support: Our expert customer support is always
                available to help with any questions or concerns.
              </li>
              <li>
                Easy Onboarding: Simple registration and setup to get started
                quickly.
              </li>
              <li>
                Diverse Investment Options: Choose from a broad selection of
                cryptocurrencies for your investment portfolio.
              </li>
              <li>
                We use advanced analytics tools to make data-driven decisions
                with real-time market analysis.
              </li>
              <li>
                Global Reach: Deposit in cryptocurrencies from anywhere in the
                world, with no geographical limitations.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </Wrapper>
  );
};
export default About;
