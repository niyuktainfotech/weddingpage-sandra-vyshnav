
import React, { useEffect, useState } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const App: React.FC = () => {

  // Wedding date: 3 January 2027, 11:10 AM IST
  const weddingDate = new Date("2027-01-03T11:10:00+05:30").getTime();

  const calculateTimeLeft = (): TimeLeft => {

    const difference = weddingDate - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      )
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft()
  );

  const [isWeddingOver, setIsWeddingOver] = useState(
    Date.now() >= weddingDate
  );

  useEffect(() => {

    const timer = window.setInterval(() => {

      const remaining = calculateTimeLeft();

      setTimeLeft(remaining);
      setIsWeddingOver(Date.now() >= weddingDate);

    }, 1000);

    return () => window.clearInterval(timer);

  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  return (

    <div className="wedding-page">

      {/* HEADER */}

      <header className="wedding-header" data-aos="fade-down">

        <a href="#home" className="header-logo">
          S <span>&</span> Y
        </a>

        <nav className="header-nav">
          <a href="#home">Home</a>
          <a href="#couple">Our Story</a>
          <a href="#events">The Ceremony</a>
          <a href="#venue">Venue</a>
        </nav>

      </header>


      {/* HERO SECTION */}

      <section className="hero-section" id="home">

        <div className="hero-content">

          <p className="hero-small-text">
            WITH THE BLESSINGS OF OUR FAMILIES
          </p>

          <h1 className="hero-title" data-aos="fade-up">
            <span><i>SANDRA</i> & <i>VYSHAK</i></span>
            <span>ARE TYING THE KNOT!</span>
          </h1>

          <div className="hero-details" data-aos="fade-up">

            <p className="hero-label">
              WEDDING CEREMONY
            </p>

            <p>03 JANUARY, 2027 | SUNDAY</p>

            <p>
              MUHURTHAM : 11:10 AM – 11:55 AM
            </p>

            <p>
              TDM HALL, ERNAKULAM SOUTH
            </p>

          </div>


          {/* COUNTDOWN */}

          <div className="countdown-section" data-aos="fade-up">

            {isWeddingOver ? (

              <h3 className="wedding-started">
                The Celebration Has Begun!
              </h3>

            ) : (

              <>
                <p className="countdown-heading">
                  COUNTING DOWN TO OUR BIG DAY
                </p>

                <div className="countdown-container">

                  <div className="countdown-item">
                    <h2>{timeLeft.days}</h2>
                    <span>DAYS</span>
                  </div>

                  <div className="countdown-item">
                    <h2>{timeLeft.hours}</h2>
                    <span>HOURS</span>
                  </div>

                  <div className="countdown-item">
                    <h2>{timeLeft.minutes}</h2>
                    <span>MINUTES</span>
                  </div>

                  <div className="countdown-item">
                    <h2>{timeLeft.seconds}</h2>
                    <span>SECONDS</span>
                  </div>

                </div>
              </>

            )}

          </div>

          <a href="#couple" className="hero-scroll">
            DISCOVER OUR STORY
            <span>↓</span>
          </a>

        </div>

      </section>


      {/* COUPLE INTRODUCTION */}

      <section className="couple-section" id="couple">

        <div className="hero-sparkles">
          <span className="sparkle sparkle-1">✦</span>
          <span className="sparkle sparkle-2">✧</span>
          <span className="sparkle sparkle-3">✦</span>
          <span className="sparkle sparkle-4">✧</span>
          <span className="sparkle sparkle-5">✦</span>
          <span className="sparkle sparkle-6">♡</span>
        </div>

        <div className="couple-image-wrapper" data-aos="zoom-in">

          <img
            src="/image-1.jpg"
            alt="Sandra and Vyshak"
            className="couple-portrait"
          />

        </div>

        <div className="couple-content" data-aos="fade-up">

        

          <p className="section-subtitle">
            TWO HEARTS, ONE JOURNEY
          </p>

          <h2>
            A love that knows
            <br />
            no bounds
          </h2>

          <p className="couple-description">
            Two souls, one beautiful journey and a lifetime
            of memories waiting to be created. We are excited
            to begin this new chapter together and celebrate
            our special day with the people we love.
          </p>

          <div className="couple-names">
            Sandra <span>&</span> Vyshak
          </div>

        </div>

      </section>


      {/* WHAT TO EXPECT / WEDDING CEREMONY */}

      <section className="expect-section" id="events">

        <div className="expect-background" data-aos="fade-in">

          <img
            src="/image-3.jpg"
            alt="Sandra and Vyshak wedding photograph"
          />

          <div className="expect-overlay"></div>

          <div className="expect-heading">
            <p>OUR SPECIAL DAY</p>
            <h2>
              What to
              <br />
              expect
            </h2>
          </div>

        </div>


        {/* SINGLE EVENT CARD */}

        <div className="event-card-wrapper" data-aos="fade-up">

          <div className="hero-sparkles">
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">✧</span>
            <span className="sparkle sparkle-3">✦</span>
            <span className="sparkle sparkle-4">✧</span>
            <span className="sparkle sparkle-5">✦</span>
            <span className="sparkle sparkle-6">♡</span>
          </div>

          <div className="event-card">

            <p className="event-number">
              A DAY TO REMEMBER
            </p>

            <div className="event-decoration">
              ✦
            </div>

            <h2>Wedding Ceremony</h2>

            <p className="event-description">
              Join us as we celebrate the beginning
              of our forever with love, laughter and
              the blessings of our families.
            </p>

            <div className="event-details">

              <div className="event-detail-item">
                <span className="detail-icon">◷</span>

                <div>
                  <h4>MUHURTHAM</h4>
                  <p>11:10 AM – 11:55 AM</p>
                </div>
              </div>

              <div className="event-detail-item">
                <span className="detail-icon">♧</span>

                <div>
                  <h4>DATE</h4>
                  <p>Sunday, 03 January 2027</p>
                </div>
              </div>

              <div className="event-detail-item">
                <span className="detail-icon">⌖</span>

                <div>
                  <h4>VENUE</h4>
                  <p>
                    TDM Hall, Opp. Durbar Hall Ground,
                    Ernakulam South
                  </p>
                </div>
              </div>

            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=TDM+Hall+Opp+Durbar+Hall+Ground+Ernakulam+South"
              target="_blank"
              rel="noopener noreferrer"
              className="event-map-button"
            >
              VIEW LOCATION
              <span> ↗ </span>
            </a>



          </div>

        </div>

      </section>


      {/* VENUE / GETTING AROUND */}

      <section className="venue-section" id="venue">

        <div className="venue-content" data-aos="fade-right">

          <p className="section-subtitle">
            FIND YOUR WAY
          </p>

          <h2>
            Getting
            <br />
            around
          </h2>

          <p>
            We can't wait to celebrate this special day
            with you. Join us at TDM Hall, Ernakulam South,
            as we begin our beautiful journey together.
          </p>

          <p>
            We look forward to welcoming you and sharing
            these unforgettable moments.
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=TDM+Hall+Opp+Durbar+Hall+Ground+Ernakulam+South"
            target="_blank"
            rel="noopener noreferrer"
            className="venue-button"
          >
            GET DIRECTIONS ↗
          </a>

        </div>

        <div className="venue-image-wrapper" data-aos="fade-left">

          <img
            src="/image-3.jpg"
            alt="Wedding venue"
            className="venue-image"
          />

        </div>


        <div className="hero-sparkles">
          <span className="sparkle sparkle-1">✦</span>
          <span className="sparkle sparkle-2">✧</span>
          <span className="sparkle sparkle-3">✦</span>
          <span className="sparkle sparkle-4">✧</span>
          <span className="sparkle sparkle-5">✦</span>
          <span className="sparkle sparkle-6">♡</span>
        </div>

      </section>


      {/* RSVP / CLOSING SECTION */}

      <section className="rsvp-section" data-aos="fade-in">

        <img
          src="/image-2.jpg"
          alt="Sandra and Vyshak"
          className="rsvp-background"
        />

        <div className="rsvp-overlay"></div>

        <div className="rsvp-content">

          <p>KINDLY JOIN US</p>

          <h2>
            Together is a
            <br />
            beautiful place to be.
          </h2>

          <div className="rsvp-divider">
            ✦
          </div>

          <p className="rsvp-names">
            Sandra <i>&</i> Vyshak
          </p>

          <h3>
            We look forward to
            <br />
            celebrating with you!
          </h3>

        </div>



      </section>


      {/* FOOTER */}


      <footer className="wedding-footer" data-aos="fade-up">

        <div className="footer-logo">
          S <span>&</span> Y
        </div>

        <h3 className="footer-couple">
          Sandra & Vyshak
        </h3>

        <div className="footer-divider"></div>

        <div className="footer-details">

          <div className="footer-info">
            <span>DATE</span>
            <p>Sunday, 03 January 2027</p>
          </div>

          <div className="footer-info">
            <span>MUHURTHAM</span>
            <p>11:10 AM – 11:55 AM</p>
          </div>

          <div className="footer-info">
            <span>VENUE</span>
            <p>
              TDM Hall, Opp. Durbar Hall Ground,
              <br />
              Ernakulam South
            </p>
          </div>

        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=TDM+Hall+Opp+Durbar+Hall+Ground+Ernakulam+South"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-location"
        >
          VIEW VENUE LOCATION ↗
        </a>

        <div className="footer-divider"></div>

        <p className="footer-bottom">
          MADE WITH LOVE FOR OUR SPECIAL DAY
        </p>

        <p className="footer-date">
          03.01.2027
        </p>

      </footer>


    </div>

  );
};

export default App;

