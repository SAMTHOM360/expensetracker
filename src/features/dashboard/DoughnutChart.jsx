import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";

import { fontSize } from "@mui/system";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const [availableRooms, setAvailableRooms] = useState(0);
  const [busyRooms, setBusyRooms] = useState(0);

  const companyId = sessionStorage.getItem("companyId");

  //   useEffect(() => {
  //     // if(allData){
  //     setAvailableRooms(allData?.totalAvailableRoom);
  //     setBusyRooms(allData?.totalBusyRooms);

  //     // }
  //     // else {
  //     //   return null;
  //     // }
  //   }, [allData]);

  const data = {
    labels: ["Available", "Busy"],
    // labels: [`Available:${availableRooms} `, `Busy:${busyRooms}`],
    datasets: [
      {
        label: "Poll",
        data: [1, 2, 3],
        // data:[totalRooms,availableRooms,busyRooms],
        // data: [availableRooms, busyRooms],
        backgroundColor: ["#4B0082", "#EE82EE", "#800080"],
        borderColor: ["#4B0082", "#EE82EE", "#800080"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 22,
          },
        },
        position: "bottom",
      },
    },
    layout: {
      padding: {
        // top: 5,
        bottom: 100,
      },
    },
    // scales: {
    //   x: {
    //     display: false, // Hide the x-axis if not needed
    //   },
    //   y: {
    //     display: false, // Hide the y-axis if not needed
    //   },
    // },
  };

  return (
    <div>
      {/* <h1>Doughnut Chart</h1> */}
      <div
        style={{
          display: "flex",
          justifyContent: "cenetr",
          alignItems: "center",
        }}
      >
        <Doughnut
          data={data}
          options={options}
          width="400px"
          height="400px"
        ></Doughnut>
      </div>
    </div>
  );
}
