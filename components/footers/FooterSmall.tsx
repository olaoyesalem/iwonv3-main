import Link from "next/link";

const FooterSmall = () => {
  return (
    <footer>
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

export default FooterSmall;
