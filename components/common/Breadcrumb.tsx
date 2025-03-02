import Link from "next/link";

const Breadcrumb = ({ title, page_title }: any) => {
  return (
    <section className="breadcrumb pos-rel">
      <div className="container">
        <div className="breadcrumb__content">
          <h2 className="breadcrumb__title">{title}</h2>
          <ul className="bread-crumb clearfix ul_li_center">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">{page_title}</li>
          </ul>
        </div>
      </div>
      <div className="breadcrumb__shape">
        <img className="hidden" src={"/assets/img/shape/b_shape1.png"} alt="" />
      </div>
      <div className="breadcrumb__icon">
        <div className="icon icon--1">
          <div data-parallax='{"y" : 80}'>
            <img src={"/assets/img/icon/bi_01.png"} alt="" />
          </div>
        </div>

        <div className="icon icon--2">
          <div data-parallax='{"x" : -90}'>
            <img src={"/assets/img/icon/bi_02.png"} alt="" />
          </div>
        </div>
        <div className="icon icon--3">
          <div data-parallax='{"y" : -80}'>
            <img src={"/assets/img/icon/bi_03.png"} alt="" />
          </div>
        </div>
        <div className="icon icon--4">
          <div data-parallax='{"x" : 90}'>
            <img src={"/assets/img/icon/bi_04.png"} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
