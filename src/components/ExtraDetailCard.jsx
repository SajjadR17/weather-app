function ExtraDetailCard({ icon, name, value }) {
  return (
    <div className="extra-detail-card">
      <div className="extra-detail-card-left">
        <img className="extra-detail-card-icon" alt="" src={icon} />
        <div className="extra-detail-card-name">{name}</div>
      </div>
      <div className="extra-detail-card-value">{value}</div>
    </div>
  );
}

export default ExtraDetailCard;
