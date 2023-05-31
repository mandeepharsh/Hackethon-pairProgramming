import "../hero/hero.scss";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="hero">
        <Link className="hero__peer hero__container" to="/peerSupport">
          <div>
            <p className="hero__peer-subtitle hero__subtittle">Peer Support</p>
          </div>
        </Link>

        <Link className="hero__chat hero__container" to="/chat">
          <div>
            <p className="hero__chat-subtittle hero__subtittle">AI challange</p>
          </div>
        </Link>
      </section>
    </>
  );
}

export default Hero;
