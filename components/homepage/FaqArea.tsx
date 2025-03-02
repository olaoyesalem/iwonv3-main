import Link from "next/link";

interface DataType {
  id: number;
  title: string;
  desc_1: JSX.Element;
  list: string[];
  desc_2: JSX.Element;
}
[];

const faq_data: DataType[] = [
  {
    id: 1,
    title: "How is the ICO project different from other blockchain ventures?",
    desc_1: (
      <>
        The cost of artificial intelligence in software development is
        determined by many factors:
      </>
    ),
    list: [
      "Scale of the project",
      "Set of technologies involved",
      "Number of development hours",
    ],
    desc_2: (
      <>
        Our team assists you in every possible way, balancing the cost and
        quality of your product for maximum satisfaction. <br />
        To get a concrete assessment of your future AI solution,{" "}
        <Link href="#!">Contact us</Link> and we will quickly provide you with
        all the information you need.
      </>
    ),
  },
  {
    id: 2,
    title:
      "What security measures are in place to protect ICO participants' investments an participate in the ICO?",
    desc_1: (
      <>
        The cost of artificial intelligence in software development is
        determined by many factors:
      </>
    ),
    list: [
      "Scale of the project",
      "Set of technologies involved",
      "Number of development hours",
    ],
    desc_2: (
      <>
        Our team assists you in every possible way, balancing the cost and
        quality of your product for maximum satisfaction. <br />
        To get a concrete assessment of your future AI solution,{" "}
        <Link href="#!">Contact us</Link> and we will quickly provide you with
        all the information you need.
      </>
    ),
  },
  {
    id: 3,
    title: "What is the purpose and vision behind this ICO project?",
    desc_1: (
      <>
        The cost of artificial intelligence in software development is
        determined by many factors:
      </>
    ),
    list: [
      "Scale of the project",
      "Set of technologies involved",
      "Number of development hours",
    ],
    desc_2: (
      <>
        Our team assists you in every possible way, balancing the cost and
        quality of your product for maximum satisfaction. <br />
        To get a concrete assessment of your future AI solution,{" "}
        <Link href="#!">Contact us</Link> and we will quickly provide you with
        all the information you need.
      </>
    ),
  },
  {
    id: 4,
    title:
      "What security measures are in place to protect ICO participants' investments an participate in the ICO?",
    desc_1: (
      <>
        The cost of artificial intelligence in software development is
        determined by many factors:
      </>
    ),
    list: [
      "Scale of the project",
      "Set of technologies involved",
      "Number of development hours",
    ],
    desc_2: (
      <>
        Our team assists you in every possible way, balancing the cost and
        quality of your product for maximum satisfaction. <br />
        To get a concrete assessment of your future AI solution,{" "}
        <Link href="#!">Contact us</Link> and we will quickly provide you with
        all the information you need.
      </>
    ),
  },
  {
    id: 5,
    title: "How can I secure and store my purchased ICO tokens?",
    desc_1: (
      <>
        The cost of artificial intelligence in software development is
        determined by many factors:
      </>
    ),
    list: [
      "Scale of the project",
      "Set of technologies involved",
      "Number of development hours",
    ],
    desc_2: (
      <>
        Our team assists you in every possible way, balancing the cost and
        quality of your product for maximum satisfaction. <br />
        To get a concrete assessment of your future AI solution,{" "}
        <Link href="#!">Contact us</Link> and we will quickly provide you with
        all the information you need.
      </>
    ),
  },
];

const FaqArea = () => {
  return (
    <section className="faq pos-rel pt-140 pb-105">
      <div className="container">
        <div className="sec-title text-center mb-35">
          <h5 className="sec-title__subtitle">FAQ</h5>
          <h2 className="sec-title__title">Frequently asked questions</h2>
        </div>
        <div className="faq__wrap">
          <div className="accordion_box clearfix" id="accordionThree">
            {faq_data.map((item) => (
              <div
                key={item.id}
                className={` block accordion-item ${
                  item.id === 1 ? "active-block" : ""
                }`}
                id={`heading${item.id}`}
              >
                <button
                  className={`acc-btn accordion-button ${
                    item.id === 1 ? "" : "collapsed"
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${item.id}`}
                  aria-expanded="true"
                  aria-controls={`collapse${item.id}`}
                >
                  <span>QA : 0{item.id}</span>
                  {item.title}
                </button>
                <div
                  id={`collapse${item.id}`}
                  className={`accordion-collapse collapse ${
                    item.id === 1 ? "show" : ""
                  }`}
                  data-bs-parent="#accordionThree"
                >
                  <div className="content accordion-body">
                    <p>{item.desc_1}</p>
                    <ul>
                      {item.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <p>{item.desc_2}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="faq__sec-shape">
        <div className="shape shape--1">
          <img src={"/assets/img/shape/s_shape1.png"} alt="" />
        </div>
        <div className="shape shape--2">
          <img src={"/assets/img/shape/s_shape2.png"} alt="" />
        </div>
      </div>
    </section>
  );
};

export default FaqArea;
