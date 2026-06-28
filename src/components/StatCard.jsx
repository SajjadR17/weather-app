import "../styles/statCard.css";

function StatCard({ icon, title, value, tip }) {
  return (
    <div className="stat-card">
      <img src={icon} alt="" className="stat-icon" />
      <span className="stat-title">{title}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-tip">{tip}</span>
    </div>
  );
}

export default StatCard;
