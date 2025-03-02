import Wrapper from "@/components/Wrapper";
import ContactForm from "@/components/homepage/ContactForm";
import FooterThree from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import ContentTitleAndDes from "@/components/common/ContentTitleAndDes";
import Breadcrumb from "@/components/common/Breadcrumb";

const PrivacyPolicy = () => {
  return (
    <Wrapper>
      <Header />
      <Breadcrumb title="Privacy Policy" page_title="Privacy Policy" />
      <div className="">
        <div className="py-20 container">
          <div className="xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 border-1 !border-gray-800 !border-opacity-50">
            <ContentTitleAndDes
              title="Information We Collect"
              desc="We may collect the following types of personal data:"
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  Account Information: Name, email address, phone number, date
                  of birth, and other registration details.
                </li>
                <li>
                  Transaction Information: Data related to your cryptocurrency
                  transactions, including purchase history and trading activity.
                </li>
                <li>
                  Technical Data: Device type, IP address, browser type,
                  operating system, and other necessary technical details for
                  platform functionality.
                </li>
                <li>
                  Usage Data: Information about how you interact with our
                  platform, such as pages visited and time spent on the
                  platform.
                </li>
                <li>
                  Communication Data: Any communication with our customer
                  support team or any other form of contact.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="How We Use Your Information"
              desc="We use your information for the following purposes:"
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  To provide services: To create and manage your account, enable
                  cryptocurrency transactions, and provide platform access.
                </li>
                <li>
                  To improve user experience: To enhance the usability and
                  functionality of our platform and improve customer service.
                </li>
                <li>
                  To process payments: To process payments related to your
                  crypto investments or trading activity.
                </li>
                <li>
                  For security and fraud prevention: To monitor and detect
                  suspicious or unauthorized activity on our platform to ensure
                  the safety of your account and personal information.
                </li>
                <li>
                  For communication: To send you account-related notifications,
                  updates, newsletters, or promotional offers (if you have opted
                  in).
                </li>
                <li>
                  For legal compliance: To comply with applicable laws,
                  regulations, and legal obligations, including identity
                  verification and fraud prevention.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="How We Protect Your Data"
              desc="Your privacy and security are our top priorities. We implement the following measures to protect your data:"
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  Encryption: All sensitive information is encrypted using
                  industry-standard encryption protocols during transmission and
                  storage.
                </li>
                <li>
                  Two-Factor Authentication (2FA): We offer 2FA for an added
                  layer of security during account login and transactions.
                </li>
                <li>
                  Regular Audits: We conduct regular security audits and updates
                  to ensure your data is securely stored and processed.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="Data Sharing and Disclosure"
              desc="We do not sell, rent, or trade your personal information to third parties. However, we may share your information in the following situations:"
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  Service Providers: We may share your data with trusted
                  third-party service providers who assist us in operating our
                  platform and services.
                </li>
                <li>
                  Legal Requirements: We may disclose your information if
                  required by law or in response to valid legal requests (e.g.,
                  a subpoena or government investigation).
                </li>
                <li>
                  Business Transfers: In the event of a merger, acquisition, or
                  sale of assets, your information may be transferred as part of
                  the transaction.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="Cookies and Tracking Technologies"
              desc="We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us analyze website traffic, remember user preferences, and provide a personalized experience."
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  You can manage your cookie preferences through your browser
                  settings.
                </li>
                <li>
                  Disabling cookies may affect the functionality of the
                  platform.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="Your Data Protection Rights"
              desc="You have the following rights regarding your personal information:"
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>
                  Access: You can request access to the personal data we hold
                  about you.
                </li>
                <li>
                  Correction: You can request corrections to any inaccurate or
                  incomplete data.
                </li>
                <li>
                  Deletion: You can request the deletion of your personal data,
                  subject to certain legal restrictions.
                </li>
                <li>
                  Opt-out of Communications: You can opt out of receiving
                  promotional communications from us at any time by following
                  the unsubscribe instructions in the email.
                </li>
                <li>
                  Data Portability: You can request a copy of your personal data
                  in a commonly used format.
                </li>
              </ul>
            </ContentTitleAndDes>

            <hr className="w-full h-1 bg-gray-600 my-8" />
            <ContentTitleAndDes
              title="Changes to This Privacy Policy"
              desc="We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date. Please review this policy regularly to stay informed about how we protect your privacy."
            >
              <ul className="list-inside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                <li>Any significant updates will be communicated to users.</li>
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
export default PrivacyPolicy;
