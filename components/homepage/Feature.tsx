interface DataType {
  id: number;
  icon: any;
  title: JSX.Element;
}
[];

const feature_data: DataType[] = [
  {
    id: 1,
    icon: "/assets/img/icon/f_01.svg",
    title: (
      <>
        Mobile payment <br /> make easy
      </>
    ),
  },
  {
    id: 2,
    icon: "/assets/img/icon/f_02.svg",
    title: (
      <>
        Investment <br /> Projects
      </>
    ),
  },
  {
    id: 3,
    icon: "/assets/img/icon/f_03.svg",
    title: (
      <>
        Lifetime free <br /> transaction
      </>
    ),
  },
  {
    id: 4,
    icon: "/assets/img/icon/f_04.svg",
    title: (
      <>
        Protect the <br /> identity
      </>
    ),
  },
  {
    id: 5,
    icon: "/assets/img/icon/f_05.svg",
    title: (
      <>
        Security your <br /> money
      </>
    ),
  },
];

const Feature = () => {
  return (
    <section className="features pos-rel pb-150 mb-0-pb">
      <div className="container">
        <div className="sec-title text-center mb-95">
          <h5 className="sec-title__subtitle">WHAY CHOOSE US</h5>
          <h2 className="sec-title__title mb-25">Why choose our token?</h2>
        </div>
        <div className="feature__wrap pos-rel ul_li_between">
          {feature_data.map((item) => (
            <div key={item.id} className="feature__item text-center">
              <div className="icon">
                <img src={item.icon} alt="" />
              </div>
              <h4>{item.title}</h4>
            </div>
          ))}
          <div className="feature__line-shape">
            <img src={"/assets/img/shape/f_shape.png"} alt="" />
          </div>
        </div>
      </div>
      <div className="feature__sec-shape">
        <img src={"/assets/img/shape/s_shape1.png"} alt="" />
      </div>
    </section>
  );
};

export default Feature;
