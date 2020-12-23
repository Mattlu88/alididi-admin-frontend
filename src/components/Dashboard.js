import React, { useEffect } from "react";

const Dashboard = (props) => {
  const { setSelectedItem }  = props

  useEffect(() => setSelectedItem('Dashboard'))

  return (
    <div>
      Dashboard   
    </div>
  );
};

export default Dashboard;
