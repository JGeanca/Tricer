import { Link } from 'react-router-dom'
import '../css/homepage.css'
import HomeWomen from '../assets/imgs/home_women.svg'
import HomeMen from '../assets/imgs/home_men.svg'

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="image-container">
        <div className="image-box">
          <Link to="/women">
            <img src={HomeWomen} alt="Women" />
            <div className="overlay-text">Women</div>
          </Link>
        </div>
        <div className="image-box">
          <Link to="/men">
            <img src={HomeMen} alt="Men" />
            <div className="overlay-text">Men</div>
          </Link>
        </div>
      </div>
    </div>
  )
}