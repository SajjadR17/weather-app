import "./header.css";

function Header() {
  return (
    <header>
      <nav className="sajjad-nav">
        <div className="brand">
          <div className="brand-logo">
            <img src="/favicon.ico" alt="" />
            <span className="logo">Sajjad</span>
            <span className="accent">Dev</span>
          </div>
        </div>
        <div className="nav-right">
          <span>Weather App</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
