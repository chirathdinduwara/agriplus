import React from "react";

function dm_person_details() {
  return (
    <>
      <div id="delivery-container">
        <h2 id="delivery-title">Delivery Person Details</h2>
        <table id="table">
          <thead>
            <tr>
              <th className="delivery-id">Delivery ID</th>
              <th className="delivery-name">Name</th>
              <th className="delivery-contact">Contact</th>
              <th className="delivery-location">Location</th>
              <th className="delivery-status">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="delivery-id-value">#D102</td>
              <td className="delivery-name-value">John Doe</td>
              <td className="delivery-contact-value">+1234567890</td>
              <td className="delivery-location-value">New York</td>
              <td className="delivery-status-value">
                <span className="status-progress" id="status-active">
                  Active
                </span>
              </td>
            </tr>
            <tr>
              <td className="delivery-id-value">#D103</td>
              <td className="delivery-name-value">Jane Smith</td>
              <td className="delivery-contact-value">+9876543210</td>
              <td className="delivery-location-value">Los Angeles</td>
              <td className="delivery-status-value">
                <span className="status-progress" id="status-idle">
                  Idle
                </span>
              </td>
            </tr>
            <tr>
              <td className="delivery-id-value">#D104</td>
              <td className="delivery-name-value">Mike Johnson</td>
              <td className="delivery-contact-value">+1122334455</td>
              <td className="delivery-location-value">Chicago</td>
              <td className="delivery-status-value">
                <span className="status-progress" id="status-busy">
                  Busy
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default dm_person_details;
