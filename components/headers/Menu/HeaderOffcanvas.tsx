import Icon from "@/components/common/FontawesomeIcon";
import Link from "next/link";

const HeaderOffcanvas = ({ offCanvas, setOffCanvas }: any) => {
  return (
    <>
      <div className={`${offCanvas ? "offcanvas-menu-visible" : ""}`}>
        <div className={`extra-info ${offCanvas ? "active" : ""}`}>
          <div className="close-icon menu-close">
            <button title="#" onClick={() => setOffCanvas(false)}>
              <Icon icon="window-close" />
            </button>
          </div>
          <div className="logo-side mb-30">
            <Link href="/">
              <img className="max-w-32" src={"/logo-wt.png"} alt="Logo" />
            </Link>
          </div>
          <div className="side-info mb-30">
            <div className="contact-list mb-30">
              <h4>Office Address</h4>
              <p>
                123/A, Miranda City Likaoli <br /> Prikano, Dope
              </p>
            </div>
            <div className="contact-list mb-30">
              <h4>Phone Number</h4>
              <p>+0989 7876 9865 9</p>
              <p>+(090) 8765 86543 85</p>
            </div>
            <div className="contact-list mb-30">
              <h4>Email Address</h4>
              <p>info@example.com</p>
              <p>example.mail@hum.com</p>
            </div>
          </div>
          <div className="social-icon-right mt-30">
            <Link href="#">
              <Icon icon="facebook-f" />
            </Link>
            <Link href="#">
              <Icon icon="twitter" />
            </Link>
            <Link href="#">
              <Icon icon="google-plus-g" />
            </Link>
            <Link href="#">
              <Icon icon="instagram" />
            </Link>
          </div>
        </div>
        <div
          onClick={() => setOffCanvas(false)}
          className={`offcanvas-overly ${offCanvas ? "active" : ""}`}
        ></div>
      </div>
    </>
  );
};

export default HeaderOffcanvas;
