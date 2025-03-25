import { Outlet } from "react-router-dom";

import "../../../css/AdminDashboard/admin-dashboard.css";
import DelPerNav from "./DelNav";

function DelPerDashboard_main() {
  return (
    <>
      <div className="dash">
        <DelPerNav />
        <Outlet />
      </div>
    </>
  );
}

export default DelPerDashboard_main;
