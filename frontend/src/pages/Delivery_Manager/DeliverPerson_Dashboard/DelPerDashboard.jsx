import "../../../css/AdminDashboard/admin-dashboard.css";

function DelPerDashboard() {
  return (
    <>
      <div className="admin-dash">
        <h1 className="admin-dash-heading">Delivery Person Dashboard</h1>

        <h3 className="admin-dash-heading">Summary</h3>

        <div className="summary-section">
          <div className="summary-item">
            <p className="s-name">Orders</p>
            <p className="s-amount">100</p>
          </div>
          <div className="summary-item">
            <p className="s-name">Deliveries</p>
            <p className="s-amount">500</p>
          </div>
          <div className="summary-item">
            <p className="s-name">Total Revenue</p>
            <p className="s-amount">Rs.50,000</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DelPerDashboard;
