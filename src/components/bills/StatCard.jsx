const StatCard = ({ label, value, icon: Icon, type = "primary" }) => (
  <div className="stat-card">
    <div className="flex flex-col justify-center items-center">
      <div>
        <p className="stat-label">{label}</p>
        <p className={`stat-value ${type}`}>{value}</p>
      </div>
    </div>
  </div>
);

export default StatCard;