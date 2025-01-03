const StatCard = ({ label, value, icon: Icon, type = "primary" }) => (
  <div className="stat-card">
    <div className="flex justify-between items-center gap-1">
      <div>
        <p className="stat-label">{label}</p>
        <p className={`stat-value ${type}`}>{value}</p>
      </div>
      <div
        className={`p-3 flex items-center justify-center rounded-xl bg-${type}-light/10`}
      >
        <Icon className={`w-6 h-6 text-${type}-light`} />
      </div>
    </div>
  </div>
);

export default StatCard;
