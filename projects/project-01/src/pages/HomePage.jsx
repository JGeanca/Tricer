import { Link } from 'react-router-dom'
import '../css/homepage.css'
import HomeWomen from '../assets/imgs/home_women.svg'
import HomeMen from '../assets/imgs/home_men.svg'
import HomeVideo from '../assets/videos/tricer.mp4'

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="big-square">
        <video className="hero-video" autoPlay loop muted>
          <source src={HomeVideo} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
        <div className="overlay">
          <h1 className="store-title">TRICER</h1>
          <p className="slogan">improvise let yourself go</p>
        </div>
      </div>
      <div className="small-squares">
        <div className="small-square">
          <Link to="/women">
            <img src={HomeWomen} alt="Women" className="women-img" />
            <div className="overlay-text">Women</div>
          </Link>
        </div>
        <div className="small-square">
          <Link to="/men">
            <img src={HomeMen} alt="Men" className="men-img" />
            <div className="overlay-text">Men</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
