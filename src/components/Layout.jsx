import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>{" "}
          </li>
          <li>
            <Link to="configs">Configs</Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
}
