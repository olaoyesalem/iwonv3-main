import Link from "next/link";
import Icon from "../common/FontawesomeIcon";

const Footer = () => {
  return (
    <footer
      className="site-footer footer__ico pos-rel"
      style={{ backgroundImage: `url(/assets/img/bg/footer_bg.png)` }}
    >
      <div className="container">
        <div className="row mt-none-30">
          <div className="col-lg-4 mt-30">
            <div className="footer__widget footer__subscribe">
              <h2>join our telegram</h2>
              <p>
                Click below to join our telegram
                <br /> community of winners!
              </p>
              <form>
                <input type="text" placeholder="iwon@gmail.com" />
                <button title="#">
                  <Icon icon="paper-plane" />
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-8 mt-30">
            <div className="footer__widget text-lg-end">
              <h2>Download Documents</h2>
              <div className="footer__document ul_li_right">
                <Link
                  href="/privacy-policy"
                  className="footer__document-item text-center"
                >
                  <div className="icon">
                    <img src={"/assets/img/icon/pdf.svg"} alt="" />
                  </div>
                  <span className="title">
                    <Icon icon="cloud-download-alt" />
                    <span className="p-1">privacy policy</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom ul_li_between mt-50">
          <div className="footer__logo mt-20">
            <Link href="/">
              <img className="max-w-32" src={"/logo-wt.png"} alt="" />
            </Link>
          </div>
          <ul className="footer__social ul_li mt-20">
            <li>
              <Link href="https://www.tiktok.com/@iwonvc" target="_blank">
                <Icon icon="tiktok" />
              </Link>
            </li>

            <li>
              <Link href="https://www.threads.net/@iwonvc" target="_blank">
                <Icon icon="threads" />
              </Link>
            </li>

            <li>
              <Link href="https://www.instagram.com/iwonvc/" target="_blank">
                <Icon icon="instagram" />
              </Link>
            </li>

            <li>
              <Link href="https://x.com/iwonvc" target="_blank">
                <Icon icon="x-twitter" />
              </Link>
            </li>

            <li>
              <Link href="https://www.pinterest.com/iwonvc/" target="_blank">
                <Icon icon="pinterest" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__copyright mt-35">
        <div className="container">
          <div className="footer__copyright-inner ul_li_between">
            <div className="footer__copyright-text mt-15">
              Copyright © 2024 iwon. All rights reserved.
            </div>
            <ul className="footer__links ul_li_right mt-15">
              <li>
                <Link href="/privacy-policy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">T&C</Link>
              </li>
              <li>
                <Link href="/terms-of-service">ToS</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__icon-shape">
        <div className="icon icon--1">
          <div data-parallax='{"x" : -80}'>
            <img
              className="max-w-8"
              src={"/assets/img/icon/coin5.png"}
              alt=""
            />
          </div>
        </div>
        <div className="icon icon--2">
          <div data-parallax='{"x" : 80}'>
            <img src={"/assets/img/shape/f_icon2.png"} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
