import Wrapper from "@/components/Wrapper";
import ContactForm from "@/components/homepage/ContactForm";
import FooterThree from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import ContentTitleAndDes from "@/components/common/ContentTitleAndDes";
import Breadcrumb from "@/components/common/Breadcrumb";

const TermsOfService = () => {
  return (
    <Wrapper>
      <Header />
      <Breadcrumb title="Terms Of Serivce" page_title="Terms Of Serivce" />
      <div className="">
        <div className="py-20 container">
          <div className="xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 border-1 !border-gray-800 !border-opacity-50">
            <ContentTitleAndDes
              title="Terms of Service"
              desc="These Terms of Service govern the use of the iWon Investment Platform (the 'Platform') and its services. By accessing or using the Platform, you agree to comply with and be bound by these terms. If you do not agree with these terms, you should not use the Platform."
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  <strong>Account Creation:</strong> To use the Platform, you
                  must create an account. You must provide accurate information
                  and maintain the confidentiality of your login details.
                </li>
                <li>
                  <strong>Platform Access:</strong> You are granted access to
                  the Platform solely for lawful purposes and must not engage in
                  any prohibited activities, including fraud or unauthorized
                  access.
                </li>
                <li>
                  <strong>Crypto Transactions:</strong> You acknowledge that
                  cryptocurrency transactions are irreversible. The Platform is
                  not responsible for any errors or losses in transactions.
                </li>
                <li>
                  <strong>Fees:</strong> The Platform may charge fees for
                  certain services, such as transaction processing or account
                  maintenance. You agree to pay any applicable fees.
                </li>
                <li>
                  <strong>Intellectual Property:</strong> All content and
                  materials on the Platform are owned by iWon Investment
                  Platform and are protected by copyright, trademark, and other
                  laws.
                </li>
                <li>
                  <strong>Termination:</strong> The Platform reserves the right
                  to suspend or terminate your access to the Platform for
                  violating these terms or for any unlawful activities.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="User Responsibilities"
              desc="As a user of the iWon Investment Platform, you agree to:"
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  Maintain the security of your account information and notify
                  us of any unauthorized access.
                </li>
                <li>
                  Comply with all applicable laws and regulations related to
                  cryptocurrency and financial transactions.
                </li>
                <li>
                  Not use the Platform for any fraudulent or illegal activity.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="Limitation of Liability"
              desc="To the fullest extent permitted by law, iWon Investment Platform shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of the Platform."
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  We are not responsible for any loss of funds due to user error
                  or third-party actions.
                </li>
                <li>
                  We are not liable for any downtime, technical failures, or
                  interruptions of the Platform.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="Amendments to Terms"
              desc="iWon Investment Platform reserves the right to amend or update these Terms of Service at any time. Users will be notified of significant changes, and continued use of the Platform indicates acceptance of the revised terms."
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  It is your responsibility to review these terms periodically
                  for any changes.
                </li>
              </ul>
            </ContentTitleAndDes>
          </div>
        </div>
      </div>
      <ContactForm />
      <FooterThree />
    </Wrapper>
  );
};
export default TermsOfService;
