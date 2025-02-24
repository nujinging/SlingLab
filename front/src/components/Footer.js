import '../scss/components/footer.scss'
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ul>
          <li>
            <Link to="/terms" className="item">Terms</Link>
          </li>
          <li>
            <Link to="/privacy" className="item">Privacy</Link>
          </li>
          <li>
            <Link to="/security" className="item">Security</Link>
          </li>
          <li>
            <Link to="/status" className="item">Status</Link>
          </li>
          <li>
            <Link to="/docs" className="item">Docs</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
