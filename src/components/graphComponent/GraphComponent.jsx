import React, { useEffect, useState } from "react";
import getApi from "../../apis/getter";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function GraphComponent({amounts, dates, setGraphShow, selectedName}) {



  return (
    <>
    <button className="text-center my-10 bg-teal-500 text-white px-5 py-2" onClick={()=> setGraphShow(false)}> <i className="fa fa-angle-left"></i> Back  </button> 
    <h3 className="text-center text-4xl mb-20">{selectedName}</h3>
      <div className="graph flex justify-center">
        <div className="w-1/2">
          <Bar
            data={{
              labels: dates,
              datasets: [
                {
                  label: "Transactions amount",
                  data: amounts,
                  backgroundColor: ["#14b8a6"],
                  borderRadius: 10,
                  hoverBackgroundColor: "#134e4a",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}
