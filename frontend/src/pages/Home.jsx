import heroimg01 from "../assets/images/heroimg01.jpg";
import heroimg02 from "../assets/images/heroimg02.jpg";
import heroimg03 from "../assets/images/heroimg03.jpg";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
const Home = () => {
  return (
    <>
      {/* hero section */}
      <>
        <section className="hero__section pt-[60px] 2xl:h-[800px]">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
              {/* hero content */}
              <div>
                <div className="lg:w-[570px]">
                  <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                    Why wait in queue when we are here !
                  </h1>
                  <p className="text__para">
                    Welcome to StylesAtEase! Discover the ultimate convenience
                    in scheduling your next pampering session with us. Say
                    goodbye to long waits on hold or trying to find the perfect
                    time in your busy schedule. Our user-friendly interface
                    makes booking your appointment a breeze.
                  </p>
                  <Link to="/salons">
                    <button className="btn flex items-center gap-1">
                      Book an Appointment
                      <span>
                        <AiOutlineArrowRight />
                      </span>
                    </button>
                  </Link>
                </div>

                {/* hero counter */}
                {/* <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                      30+
                    </h2>
                    <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  </div>
                </div> */}
              </div>
              <div className="flex gap-[30px] justify-end flex-col md:flex-row">
                <div className="flex items-center">
                  <img src={heroimg01} className="w-full rounded-full"></img>
                </div>
                <div className="mt-[30px]">
                  <img
                    src={heroimg02}
                    className="w-full mb-[30px] rounded-full"
                  ></img>
                  <img src={heroimg03} className="w-full rounded-full"></img>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      {/* hero section ends */}
      {/* <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">Saving your precious time !</h2>
            <p className="text__para text-center">
              Book your slot now to take advantage of our exciting discounts and
              skip the queue! Choose your preferred time and get ahead of the
              crowd. Don't miss out on this opportunity to make your experience
              even better. Reserve your spot today!
            </p>
          </div>

          <div className="flex flex-wrap items-center flex-col md:flex-row gap-5"></div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
