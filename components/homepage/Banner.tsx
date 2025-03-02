"use client";
import Link from "next/link";
import CountdownClock from "../common/CountDownClock";
import { useSession } from "next-auth/react";
import Icon from "../common/FontawesomeIcon";

interface Props {
  company: CompanyProps;
}
const Banner = ({ company }: Props) => {
  const { data: session } = useSession();

  return (
    <section className="hero hero__ico pos-rel">
      <div
        className="hero__bg"
        style={{
          backgroundImage: `url(/assets/img/bg/hero_bg.png)`,
          backgroundPosition: "bottom center",
          backgroundSize: "100% 88%",
        }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="hero__content">
              <div className="space-y-5 mb-12">
                <h1 className="title">
                  Deposit Smarter <span> Grow </span> Faster
                </h1>
                <p className="max-w-[650px]">
                  Shape Your Financial Future with Confidence – iWon.VC combines
                  expertise and innovation to help you navigate the world of
                  crypto investments. Unlocking opportunities for sustainable
                  growth and long-term success with our
                  <span className="text-lime-600"> community of winners </span>.
                </p>
              </div>
              <div className="btns">
                <Link
                  className="focus:ring thm-btn space-x-2 group"
                  href={session?.user ? "/dashboard" : "/login"}
                >
                  <span> GET STARTED </span>
                  <Icon
                    className="inline-block group-hover:!pl-1 transition-all"
                    icon="arrow-right"
                  />
                </Link>
                <Link
                  className="focus:ring thm-btn space-x-2 !bg-blue-500"
                  href={session?.user ? "/dashboard" : "/login"}
                >
                  <Icon icon="user-check" />
                  <span>{session?.user ? "Dashboard" : "Register"}</span>
                </Link>
              </div>
              <div className="hero__progress mt-50">
                <div className="progress-title ul_li_between">
                  <span>Open </span>
                  <span>Sold Out</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar flex items-end"
                    style={{ width: `${company?.bannerProgressPercentage}%` }}
                  >
                    <div className="!text-sm">
                      {company?.bannerProgressPercentage}%
                    </div>
                  </div>
                </div>

                <ul className="ul_li_between">
                  <li>0%</li>
                  <li>25%</li>
                  <li>50%</li>
                  <li> 75% </li>
                  <li> 100% </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="hero__explore-wrap text-center">
              <div className="hero__explore text-center">
                <div className="scroll-down"></div>
                <span>Explore Causes</span>
              </div>
              <div className="hero__countdown">
                <div>
                  <h6 className="text-center !tracking-wide">
                    Next payout day will be!
                  </h6>
                  <p>
                    Deposits must be made by Monday 12am in order to receive
                    disbursements on Friday.
                  </p>
                </div>

                <CountdownClock />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__shape">
        {/* <div className="shape shape--1">
          <img src={"/assets/img/shape/h_shape.png"} alt="" />
        </div> */}
        <div className="shape shape--2">
          <img src={"/assets/img/shape/h_shape2.png"} alt="" />
        </div>
        <div className="shape shape--3">
          <img src={"/assets/img/shape/h_shape3.png"} alt="" />
        </div>
      </div>

      <div className="hero__coin d-none d-lg-block">
        <div className="coin coin--1">
          <img src={"/assets/img/icon/coin1.png"} alt="" />
        </div>
        <div className="coin coin--2">
          <img src={"/assets/img/icon/coin2.png"} alt="" />
        </div>
        <div className="coin coin--3">
          <img src={"/assets/img/icon/coin3.png"} alt="" />
        </div>

        <div className="coin coin--6">
          <img src={"/assets/img/icon/coin6.png"} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
