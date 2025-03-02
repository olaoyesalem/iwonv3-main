import Wrapper from "@/components/Wrapper";
import ContactForm from "@/components/homepage/ContactForm";
import FooterThree from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import Breadcrumb from "@/components/common/Breadcrumb";

const Box = ({ title, desc }: { title: string; desc: string }) => (
  <div>
    <h3 className="text-2xl mb-3 text-center"> {title} </h3>
    <p className="text-lg text-center"> {desc} </p>
  </div>
);

const TermsAndConditions = () => {
  return (
    <Wrapper>
      <Header />
      <Breadcrumb
        title="Terms And Conditions"
        page_title="Terms And Conditions"
      />
      <div className="">
        <div className="py-20 container">
          <div className="max-w-[750px] mx-auto xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 border-1 !border-gray-800 !border-opacity-50 space-y-12">
            <Box
              title="General Risk Statement"
              desc="Trading, lending, and exchanging Cryptocurrency and other digital assets involve substantial risk and may result in the loss of part or all of your invested capital. Digital asset markets can be highly volatile, and the prices of these assets can fluctuate widely, influenced by various market, regulatory, and economic factors. You should carefully consider your financial circumstances, investment experience, and risk tolerance before engaging in any digital asset-related activities."
            />
            <Box
              title="Regulatory Information"
              desc="IWon operates in compliance with regulatory requirements in several jurisdictions: _space While IWon complies with regulations in the jurisdictions in which it operates, participation in trading, lending, and exchanging activities entails risks that may not be mitigated by regulation alone."
            />

            <div>
              <h3 className="text-2xl mb-3 text-center"> Specific Risks</h3>
              <div className="space-y-3">
                <p className="text-lg">
                  <b>Market Volatility:</b> Digital assets, including
                  Cryptocurrency, are subject to rapid price changes due to
                  market demand, regulatory developments, technological
                  advancements, or macroeconomic trends.
                </p>
                <p className="text-lg">
                  <b>Liquidity Risk:</b> Certain market conditions or low market
                  demand may make it difficult to execute transactions at your
                  desired price or volume.
                </p>
                <p className="text-lg">
                  <b>Lending Risk:</b> Engaging in lending activities exposes
                  you to the possibility of borrower default or the platform’s
                  failure to honor repayments.
                </p>
                <p className="text-lg">
                  <b>Counterparty Risk:</b> Transactions, particularly those
                  conducted over-the-counter (OTC), involve counterparty risk,
                  including the potential for fraud or default.
                </p>
                <p className="text-lg">
                  <b>Regulatory Risk:</b> Changes in regulations or government
                  policies may affect the legality or feasibility of trading,
                  lending, or exchanging Cryptocurrency.
                </p>
                <p className="text-lg">
                  <b>Operational Risk:</b> Platform outages, technical failures,
                  or cyber-attacks may impact your ability to access or manage
                  your assets.
                </p>
                <p className="text-lg">
                  <b>Leverage Risk:</b> Trading with leverage can amplify both
                  gains and losses, leading to significant financial exposure.
                </p>
                <div>
                  <h5 className="text-center my-1">Disclaimer of Liability</h5>
                  <p className="text-center">
                    IWon does not guarantee any specific outcome or
                    profitability from trading, lending, or exchanging
                    Cryptocurrency. Participation in these activities is
                    entirely at your own risk, and IWon will not be held liable
                    for any losses or damages incurred.
                  </p>
                </div>
              </div>
            </div>

            <Box
              title="Financial Advice"
              desc="IWon does not provide financial, investment, tax, or legal advice. You are solely responsible for understanding and complying with all applicable laws and regulations in your jurisdiction. 
"
            />
            <Box
              title="Acknowledgment"
              desc="By engaging in trading, lending, or exchanging cryptocurrency with IWon, you acknowledge that you have read, understood, and accepted this risk disclaimer. You further agree that you are participating voluntarily and assume full responsibility for any financial or other outcomes. For more information or to address any concerns, please contact IWon’s support team at the relevant regional office.
"
            />
          </div>
        </div>
      </div>
      <ContactForm />
      <FooterThree />
    </Wrapper>
  );
};
export default TermsAndConditions;
