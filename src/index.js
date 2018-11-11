import React from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import { getDataDays, getDataMinutes, getDataHours, getDataMonths } from "./utils";

class ChartComponent extends React.Component {
  componentDidMount() {

    setTimeout(() => {
      let boxes = document.querySelectorAll(".indicator");
      for (let x = 0; x < boxes.length; x++) {
        boxes[x].addEventListener("click", (e) => {
          let currents = e.target.className.split(" ");
          let current;
          for (let k = 0; k < currents.length; k++) {
            if (currents[k] !== "current" && currents[k] !== "indicator") {
              current = currents[k];
              break
            }
          }

          this.setState({ current });

          for (let j = 0; j < boxes.length; j++) {
            if (x !== j) {
              boxes[j].classList.remove("current");
            } else {
              if (!boxes[j].classList.contains("current")) {
                boxes[j].classList.add("current");
              }
            }
          }

          if (current === "minute") {
            getDataMinutes().then(data => {
              this.setState({ data });
            });
          }

          if (current === "hour") {
            getDataHours().then(data => {
              this.setState({ data });
            });
          }

          if (current === "day") {
            getDataDays().then(data => {
              this.setState({ data });
            });
          }

          if (current === "month") {
            getDataMonths().then(data => {
              this.setState({ data });
            });
          }


        });
      }
    }, 2000);

    getDataDays().then(data => {
      this.setState({ data, current: "day" });
    });

  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <div className='multiple-inst'>
        <div className='time-indicator'>
          <div className='indicator minute'>分</div>
          <div className='indicator hour'>时</div>
          <div className='indicator day current'>日</div>
          <div className='indicator month'>月</div>
        </div>
        <Chart type='svg' data={this.state.data} current={this.state.current}/>
      </div>
    );
  }
}

render(
  <ChartComponent/>,
  document.getElementById("root")
);
