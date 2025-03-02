import Marquee from "react-fast-marquee";

const brand_data: any[] = [
  "/assets/img/brand/bitpay.png",
  "/assets/img/brand/bitrue.png",
  "/assets/img/brand/bybit-logo.png",
  "/assets/img/brand/coinbase.png",
  "/assets/img/brand/crypto.png",
  "/assets/img/brand/exodus.svg",
  "/assets/img/brand/gemini.png",
  "/assets/img/brand/ledger.png",
  "/assets/img/brand/metamask.png",
  "/assets/img/brand/okx.avif",
  "/assets/img/brand/Rainbow.avif",
  "/assets/img/brand/TokenPocket.avif",
  "/assets/img/brand/TrustWallet.avif",
  "/assets/img/brand/xrp.png",
];

const Brand = () => {
  return (
    <section className="brand pb-150 pt-12">
      <div className="container">
        <div className="sec-title text-center mb-65">
          <h5 className="sec-title__subtitle">Trusted & Compatible walllets</h5>
        </div>
      </div>
      <Marquee className="brand__marquee" style={{ overflow: "hidden" }}>
        {brand_data.map((item, i) => (
          <div key={i} className="brand__item">
            <img className="rounded-full p-4" src={item} alt="" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Brand;
