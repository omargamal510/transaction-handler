import React, { useEffect, useState } from "react";
import getApi from "../../apis/getter";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function GraphComponent({amounts, dates, setGraphShow, selectedName}) {



  return (
    <>
    <h2 className="text-center my-10 bg-white text-black" onClick={()=> setGraphShow(false)}> Back  </h2> 
    <h3>{selectedName}</h3>
      <div className="graph flex justify-center">
        <div className="w-1/2">
          <Bar
            data={{
              labels: dates,
              datasets: [
                {
                  label: "Transactions amount",
                  data: amounts,
                  backgroundColor: ["#F00", "#F00", "#F00"],
                  borderRadius: 10,
                  hoverBackgroundColor: "#00F",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}
