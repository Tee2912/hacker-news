import "bootstrap/dist/css/bootstrap.min.css";
import NewsList from "./components/NewsList";
import { Route, Routes, Link } from "react-router-dom";
import NewsComment from "./components/NewsComment";

function App() {
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Hacker News
            </Link>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" Component={NewsList}></Route>
          <Route path="/comments/:commentId" Component={NewsComment}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
