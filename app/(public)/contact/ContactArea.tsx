interface DataType {
  id: number;
  icon: any;
  title: string;
  address: JSX.Element;
}
[];

const contact_data: DataType[] = [
  {
    id: 2,
    icon: "/assets/img/icon/mail.svg",
    title: "Mail Address",
    address: (
      <>
        <a href="mailto:win@iwon.vc">win@iwon.vc</a>
      </>
    ),
  },
  {
    id: 3,
    icon: "/assets/img/icon/location.svg",
    title: "Our Location",
    address: <>Global</>,
  },
];

const ContactArea = () => {
  return (
    <section className="contact pt-120">
      <div className="container">
        <div className="row justify-content-md-center mt-none-30">
          {contact_data.map((item) => (
            <div key={item.id} className="col-lg-6 mt-30">
              <div className="contact-info__item">
                <div className="ul_li mb-45">
                  <div className="icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.address}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="google-map mb-30 mt-30">
          <div className="google-map__inner">
            <iframe
              title="#"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24157517.107279934!2d-16.972195994535472!3d42.344321431326875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ed8886cfadda85%3A0x72ef99e6b3fcf079!2sEurope!5e0!3m2!1sen!2sbd!4v1734500823674!5m2!1sen!2sbd"
              loading="lazy"
              aria-hidden="false"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
