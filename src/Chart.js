import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  BarSeries,
  AreaSeries,
  CandlestickSeries,
  LineSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  OHLCTooltip,
  MovingAverageTooltip
} from "react-stockcharts/lib/tooltip";
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickChartWithMA extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
    let that = this;
    let chartCanvas = d3.selectAll(".react-stockcharts-cursor")._groups[0];

    window.dispatch
      .on("handlePinchZoom", function(p) {
      })
      .on("handlePinchZoomEnd", function(p) {
      })
      .on("handleDragStart", function(p) {
      })
      .on("handleDrag", function(p) {
      })
      .on("handleDragEnd", function(p) {
      })

      .on("handleZoom", function(p) {
        //console.log(p);
        //zoomDirection, mouseXY, e
        let cur = this;
        chartCanvas.forEach((cc, index) => {
          let target = cc;
          let e = Object.assign({}, p.e);
          Object.defineProperty(e, "triggered", {
            value: target,
            writable: true
          });

          if (cur.props.id !== "cc_" + (index + 1)) {
            p.mouseXY && that.refs["cc_" + (index + 1)].handleZoom(p.zoomDirection, p.mouseXY, e);
          }
        });
      })

      .on("handleMouseDown", function(p) {
        //mousePosition, currentCharts, e
        //that.refs.cc_2.handleMouseDown(p.mousePosition, [3, 4], p.e);
      })

      .on("handleMouseEnter", function(p) {
        let cur = this;
        chartCanvas.forEach((cc, index) => {
          let target = cc;
          let e = Object.assign({}, p.e);

          if (cur.props.id !== "cc_" + (index + 1)) {
            Object.defineProperty(e, "sourceElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "srcElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "toElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "target", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "path", {
              value: e.path,
              writable: true
            });
            if (e.path && e.path.length) {
              e.path[0] = target;
            }
            that.refs["cc_" + (index + 1)].handleMouseEnter(e);
          }
        });
      })

      .on("handleMouseLeave", function(p) {
        let cur = this;
        chartCanvas.forEach((cc, index) => {
          let e = Object.assign({}, p.e);

          if (cur.props.id !== "cc_" + (index + 1)) {
            that.refs["cc_" + (index + 1)].handleMouseLeave(e);
          }
        });
      })

      .on("handleMouseMove", function(p) {
        let cur = this;
        window.mouseXY = p.mouseXY;

        chartCanvas.forEach((cc, index) => {
          let target = cc;
          let e = Object.assign({}, p.e);

          if (cur.props.id !== "cc_" + (index + 1)) {
            Object.defineProperty(e, "sourceElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "srcElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "toElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "target", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "path", {
              value: e.path,
              writable: true
            });
            if (e.path && e.path.length) {
              e.path[0] = target;
            }
            p.mouseXY && that.refs["cc_" + (index + 1)].handleMouseMove(p.mouseXY, "mouse", e);
          }
        });
      })

      .on("handlePan", function(p) {
        //console.log(p)
        let dxdy = p.dxdy;
        let mousePosition = p.mousePosition;
        let panStartXScale = p.panStartXScale;
        let cur = this;
        chartCanvas.forEach((cc, index) => {
          let target = cc;
          let e = Object.assign({}, p.e);

          if (cur.props.id !== "cc_" + (index + 1)) {
            Object.defineProperty(e, "triggered", {
              value: target,
              writable: true
            });

            Object.defineProperty(e, "sourceElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "srcElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "toElement", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "target", {
              value: target,
              writable: true
            });
            Object.defineProperty(e, "path", {
              value: e.path,
              writable: true
            });
            if (e.path && e.path.length) {
              e.path[0] = target;
            }
            that.refs["cc_" + (index + 1)].handlePan(mousePosition, panStartXScale, dxdy, that.refs["cc_" + (index + 1)].mutableState.currentCharts, e);
          }
        });
      })

      .on("handlePanEnd", function(p) {
        let dxdy = p.dxdy;
        let mousePosition = p.mousePosition;
        let panStartXScale = p.panStartXScale;
        let cur = this;
        chartCanvas.forEach((cc, index) => {
          let target = cc;
          let e = Object.assign({}, p.e);
          Object.defineProperty(e, "triggered", {
            value: target,
            writable: true
          });

          if (cur.props.id !== "cc_" + (index + 1)) {
            that.refs["cc_" + (index + 1)].handlePanEnd(mousePosition, panStartXScale, dxdy, that.refs["cc_" + (index + 1)].mutableState.currentCharts, e);
          }
        });
      });


    window.jwerty.key("←", (e) => {
      let mouseXY = window.mouseXY || [this.refs["cc_1"].props.width / 2, this.refs["cc_1"].props.height / 2];

      let timeLength = this.refs["cc_1"].state.plotData.length;
      let timeInterval = Math.floor(0.8 * this.refs["cc_1"].props.width / timeLength);
      chartCanvas.forEach((cc, index) => {
        that.refs["cc_" + (index + 1)] && that.refs["cc_" + (index + 1)].handleMouseMove([mouseXY[0] - timeInterval, mouseXY[1]], "mouse", e);
      });
    });
    window.jwerty.key("→", (e) => {
      let mouseXY = window.mouseXY || [this.refs["cc_1"].props.width / 2, this.refs["cc_1"].props.height / 2];

      let timeLength = this.refs["cc_1"].state.plotData.length;
      let timeInterval = Math.floor(0.8 * this.refs["cc_1"].props.width / timeLength);
      chartCanvas.forEach((cc, index) => {
        that.refs["cc_" + (index + 1)] && that.refs["cc_" + (index + 1)].handleMouseMove([mouseXY[0] + timeInterval, mouseXY[1]], "mouse", e);
      });
    });
    window.jwerty.key("↑", (e) => {
      let mouseXY = window.mouseXY || [this.refs["cc_1"].props.width / 2, this.refs["cc_1"].props.height / 2];

      chartCanvas.forEach((cc, index) => {
        that.refs["cc_" + (index + 1)] && that.refs["cc_" + (index + 1)].handleZoom(1, mouseXY, e);//e.type=='keydown'
      });
    });
    window.jwerty.key("↓", (e) => {
      let mouseXY = window.mouseXY || [this.refs["cc_1"].props.width / 2, this.refs["cc_1"].props.height / 2];

      chartCanvas.forEach((cc, index) => {
        that.refs["cc_" + (index + 1)] && that.refs["cc_" + (index + 1)].handleZoom(-1, mouseXY, e);//e.type=='keydown'
      });
    });
    window.jwerty.key("shift+↑", () => {
    });
    window.jwerty.key("shift+↓", () => {
    });

  }

  render() {
    const ema20 = ema()
      .options({
        windowSize: 20, // optional will default to 10
        sourcePath: "close" // optional will default to close as the source
      })
      .skipUndefined(true) // defaults to true
      .merge((d, c) => {
        d.ema20 = c;
      }) // Required, if not provided, log a error
      .accessor(d => d.ema20) // Required, if not provided, log an error during calculation
      .stroke("blue"); // Optional

    const sma20 = sma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.sma20 = c;
      })
      .accessor(d => d.sma20);

    const wma20 = wma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.wma20 = c;
      })
      .accessor(d => d.wma20);

    const tma20 = tma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.tma20 = c;
      })
      .accessor(d => d.tma20);

    const ema50 = ema()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ema50 = c;
      })
      .accessor(d => d.ema50);

    const smaVolume50 = sma()
      .options({ windowSize: 20, sourcePath: "volume" })
      .merge((d, c) => {
        d.smaVolume50 = c;
      })
      .accessor(d => d.smaVolume50)
      .stroke("#4682B4")
      .fill("#4682B4");

    const { type, data: initialData, width, ratio, current } = this.props;
    const xDisplayFormat = (current) => {
      switch (current) {
        case "minute":
          return timeFormat("%Y-%m-%d %H:%M");
        case "hour":
          return timeFormat("%Y-%m-%d %H");
        case "day":
          return timeFormat("%Y-%m-%d");
        case "month":
          return timeFormat("%Y-%m");
      }
    };
    const mouseCoordinateXDisplayFormat = (current) => {
      switch (current) {
        case "minute":
          return timeFormat("%H:%M");
        case "hour":
          return timeFormat("%d %H");
        case "day":
          return timeFormat("%m-%d");
        case "month":
          return timeFormat("%Y-%m");
      }
    };
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const calculatedData = ema20(sma20(wma20(tma20(ema50(smaVolume50(initialData))))));
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor
    } = xScaleProvider(calculatedData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    //如果【分、时、日、月】线下各使用一个数据请求，那么需要利用一个循环，分别为每一个ChartCanvas实例构建数据对象
    //在循环中根据对象的ChartCanvas的id找出对应的数据集，类似以下代码进行赋值...
    const initialData1 = initialData.map(d => {
      return Object.assign({}, d, {
        close: d.close + Math.random() * 2,
        high: d.high + Math.random() * 1,
        low: d.low + Math.random() * 1,
        open: d.open + Math.random() * 2,
        volume: d.volume + Math.random() * 2
      });
    });
    const calculatedData1 = ema20(sma20(wma20(tma20(ema50(smaVolume50(initialData1))))));
    const {
      data: data1,
      xScale: xScale1,
      xAccessor: xAccessor1,
      displayXAccessor: displayXAccessor1
    } = xScaleProvider(calculatedData1);
    const start1 = xAccessor(last(data1));
    const end1 = xAccessor(data1[Math.max(0, data1.length - 150)]);
    const xExtents1 = [start1, end1];


    const initialData2 = initialData.map(d => {
      return Object.assign({}, d, {
        close: d.close + Math.random() * 2,
        high: d.high + Math.random() * 1,
        low: d.low + Math.random() * 1,
        open: d.open + Math.random() * 2,
        volume: d.volume + Math.random() * 2
      });
    });
    const calculatedData2 = ema20(sma20(wma20(tma20(ema50(smaVolume50(initialData2))))));
    const {
      data: data2,
      xScale: xScale2,
      xAccessor: xAccessor2,
      displayXAccessor: displayXAccessor2
    } = xScaleProvider(calculatedData2);
    const start2 = xAccessor(last(data2));
    const end2 = xAccessor(data2[Math.max(0, data2.length - 150)]);
    const xExtents2 = [start2, end2];


    const initialData3 = initialData.map(d => {
      return Object.assign({}, d, {
        close: d.close + Math.random() * 2,
        high: d.high + Math.random() * 1,
        low: d.low + Math.random() * 1,
        open: d.open + Math.random() * 2,
        volume: d.volume + Math.random() * 2
      });
    });
    const calculatedData3 = ema20(sma20(wma20(tma20(ema50(smaVolume50(initialData3))))));
    const {
      data: data3,
      xScale: xScale3,
      xAccessor: xAccessor3,
      displayXAccessor: displayXAccessor3
    } = xScaleProvider(calculatedData3);
    const start3 = xAccessor(last(data3));
    const end3 = xAccessor(data3[Math.max(0, data3.length - 150)]);
    const xExtents3 = [start3, end3];


    const initialData4 = initialData.map(d => {
      return Object.assign({}, d, {
        close: d.close + Math.random() * 2,
        high: d.high + Math.random() * 1,
        low: d.low + Math.random() * 1,
        open: d.open + Math.random() * 2,
        volume: d.volume + Math.random() * 2
      });
    });
    const calculatedData4 = ema20(sma20(wma20(tma20(ema50(smaVolume50(initialData4))))));
    const {
      data: data4,
      xScale: xScale4,
      xAccessor: xAccessor4,
      displayXAccessor: displayXAccessor4
    } = xScaleProvider(calculatedData4);
    const start4 = xAccessor(last(data4));
    const end4 = xAccessor(data4[Math.max(0, data4.length - 150)]);
    const xExtents4 = [start4, end4];


    return (
      <div className={"inst-group d-flex flex-wrap"}>

        <ChartCanvas id='cc_1'
                     ref='cc_1'
                     height={400}
                     width={700}
                     ratio={ratio}
                     margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
                     type={type}
                     seriesName="MSFT"
                     data={data1}
                     xScale={xScale1}
                     xAccessor={xAccessor1}
                     displayXAccessor={displayXAccessor1}
                     xExtents={xExtents1}
        >
          <Chart id={41}
                 yExtents={[d => [d.high, d.low], sma20.accessor(), wma20.accessor(), tma20.accessor(), ema20.accessor(), ema50.accessor()]}
                 padding={{ top: 10, bottom: 20 }}
          >
            <XAxis axisAt="bottom" orient="bottom"/>
            <YAxis axisAt="right" orient="right" ticks={5}/>

            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}/>

            <CandlestickSeries/>
            <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
            <LineSeries yAccessor={wma20.accessor()} stroke={wma20.stroke()}/>
            <LineSeries yAccessor={tma20.accessor()} stroke={tma20.stroke()}/>
            <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
            <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
            <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()}/>
            <CurrentCoordinate yAccessor={wma20.accessor()} fill={wma20.stroke()}/>
            <CurrentCoordinate yAccessor={tma20.accessor()} fill={tma20.stroke()}/>
            <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()}/>
            <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()}/>

            <OHLCTooltip origin={[-40, 0]} xDisplayFormat={xDisplayFormat(current)}/>
            <MovingAverageTooltip
              onClick={e => console.log(e)}
              origin={[-38, 15]}
              options={[
                {
                  yAccessor: sma20.accessor(),
                  type: "SMA",
                  stroke: sma20.stroke(),
                  windowSize: sma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: wma20.accessor(),
                  type: "WMA",
                  stroke: wma20.stroke(),
                  windowSize: wma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: tma20.accessor(),
                  type: "TMA",
                  stroke: tma20.stroke(),
                  windowSize: tma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: ema20.accessor(),
                  type: "EMA",
                  stroke: ema20.stroke(),
                  windowSize: ema20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: ema50.accessor(),
                  type: "EMA",
                  stroke: ema50.stroke(),
                  windowSize: ema50.options().windowSize,
                  echo: "some echo here"
                }
              ]}
            />
          </Chart>

          <Chart id={42}
                 yExtents={[d => d.volume, smaVolume50.accessor()]}
                 height={150} origin={(w, h) => [0, h - 150]}
          >
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={mouseCoordinateXDisplayFormat(current)}/>
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".4s")}/>

            <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "red"}/>
            <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
            <CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()}/>
            <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47"/>
          </Chart>
          <CrossHairCursor/>
        </ChartCanvas>

        <ChartCanvas id='cc_2'
                     ref='cc_2'
                     height={400}
                     width={700}
                     ratio={ratio}
                     margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
                     type={type}
                     seriesName="MSFT"
                     data={data2}
                     xScale={xScale2}
                     xAccessor={xAccessor2}
                     displayXAccessor={displayXAccessor2}
                     xExtents={xExtents2}
        >
          <Chart id={41}
                 yExtents={[d => [d.high, d.low], sma20.accessor(), wma20.accessor(), tma20.accessor(), ema20.accessor(), ema50.accessor()]}
                 padding={{ top: 10, bottom: 20 }}
          >
            <XAxis axisAt="bottom" orient="bottom"/>
            <YAxis axisAt="right" orient="right" ticks={5}/>

            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}/>

            <CandlestickSeries/>
            <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
            <LineSeries yAccessor={wma20.accessor()} stroke={wma20.stroke()}/>
            <LineSeries yAccessor={tma20.accessor()} stroke={tma20.stroke()}/>
            <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
            <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
            <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()}/>
            <CurrentCoordinate yAccessor={wma20.accessor()} fill={wma20.stroke()}/>
            <CurrentCoordinate yAccessor={tma20.accessor()} fill={tma20.stroke()}/>
            <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()}/>
            <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()}/>

            <OHLCTooltip origin={[-40, 0]} xDisplayFormat={xDisplayFormat(current)}/>
            <MovingAverageTooltip
              onClick={e => console.log(e)}
              origin={[-38, 15]}
              options={[
                {
                  yAccessor: sma20.accessor(),
                  type: "SMA",
                  stroke: sma20.stroke(),
                  windowSize: sma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: wma20.accessor(),
                  type: "WMA",
                  stroke: wma20.stroke(),
                  windowSize: wma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: tma20.accessor(),
                  type: "TMA",
                  stroke: tma20.stroke(),
                  windowSize: tma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: ema20.accessor(),
                  type: "EMA",
                  stroke: ema20.stroke(),
                  windowSize: ema20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: ema50.accessor(),
                  type: "EMA",
                  stroke: ema50.stroke(),
                  windowSize: ema50.options().windowSize,
                  echo: "some echo here"
                }
              ]}
            />
          </Chart>

          <Chart id={42}
                 yExtents={[d => d.volume, smaVolume50.accessor()]}
                 height={150} origin={(w, h) => [0, h - 150]}
          >
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={mouseCoordinateXDisplayFormat(current)}/>
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".4s")}/>

            <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "red"}/>
            <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
            <CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()}/>
            <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47"/>
          </Chart>
          <CrossHairCursor/>
        </ChartCanvas>

        <ChartCanvas id='cc_3'
                     ref='cc_3'
                     height={400}
                     width={700}
                     ratio={ratio}
                     margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
                     type={type}
                     seriesName="MSFT"
                     data={data3}
                     xScale={xScale3}
                     xAccessor={xAccessor3}
                     displayXAccessor={displayXAccessor3}
                     xExtents={xExtents3}
        >
          <Chart id={31}
                 yExtents={[d => [d.high, d.low], sma20.accessor(), wma20.accessor(), tma20.accessor(), ema20.accessor(), ema50.accessor()]}
                 padding={{ top: 10, bottom: 20 }}
          >
            <XAxis axisAt="bottom" orient="bottom"/>
            <YAxis axisAt="right" orient="right" ticks={5}/>

            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}/>

            <CandlestickSeries/>
            <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
            <LineSeries yAccessor={wma20.accessor()} stroke={wma20.stroke()}/>
            <LineSeries yAccessor={tma20.accessor()} stroke={tma20.stroke()}/>
            <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
            <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
            <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()}/>
            <CurrentCoordinate yAccessor={wma20.accessor()} fill={wma20.stroke()}/>
            <CurrentCoordinate yAccessor={tma20.accessor()} fill={tma20.stroke()}/>
            <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()}/>
            <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()}/>

            <OHLCTooltip origin={[-40, 0]} xDisplayFormat={xDisplayFormat(current)}/>
            <MovingAverageTooltip
              onClick={e => console.log(e)}
              origin={[-38, 15]}
              options={[
                {
                  yAccessor: sma20.accessor(),
                  type: "SMA",
                  stroke: sma20.stroke(),
                  windowSize: sma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: wma20.accessor(),
                  type: "WMA",
                  stroke: wma20.stroke(),
                  windowSize: wma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: tma20.accessor(),
                  type: "TMA",
                  stroke: tma20.stroke(),
                  windowSize: tma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: ema20.accessor(),
                  type: "EMA",
                  stroke: ema20.stroke(),
                  windowSize: ema20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: ema50.accessor(),
                  type: "EMA",
                  stroke: ema50.stroke(),
                  windowSize: ema50.options().windowSize,
                  echo: "some echo here"
                }
              ]}
            />
          </Chart>

          <Chart id={32}
                 yExtents={[d => d.volume, smaVolume50.accessor()]}
                 height={150} origin={(w, h) => [0, h - 150]}
          >
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={mouseCoordinateXDisplayFormat(current)}/>
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".4s")}/>

            <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "red"}/>
            <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
            <CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()}/>
            <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47"/>
          </Chart>
          <CrossHairCursor/>
        </ChartCanvas>

        <ChartCanvas id='cc_4'
                     ref='cc_4'
                     height={400}
                     width={700}
                     ratio={ratio}
                     margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
                     type={type}
                     seriesName="MSFT"
                     data={data4}
                     xScale={xScale4}
                     xAccessor={xAccessor4}
                     displayXAccessor={displayXAccessor4}
                     xExtents={xExtents4}
        >
          <Chart id={41}
                 yExtents={[d => [d.high, d.low], sma20.accessor(), wma20.accessor(), tma20.accessor(), ema20.accessor(), ema50.accessor()]}
                 padding={{ top: 10, bottom: 20 }}
          >
            <XAxis axisAt="bottom" orient="bottom"/>
            <YAxis axisAt="right" orient="right" ticks={5}/>

            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}/>

            <CandlestickSeries/>
            <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
            <LineSeries yAccessor={wma20.accessor()} stroke={wma20.stroke()}/>
            <LineSeries yAccessor={tma20.accessor()} stroke={tma20.stroke()}/>
            <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
            <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
            <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()}/>
            <CurrentCoordinate yAccessor={wma20.accessor()} fill={wma20.stroke()}/>
            <CurrentCoordinate yAccessor={tma20.accessor()} fill={tma20.stroke()}/>
            <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()}/>
            <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()}/>

            <OHLCTooltip origin={[-40, 0]} xDisplayFormat={xDisplayFormat(current)}/>
            <MovingAverageTooltip
              onClick={e => console.log(e)}
              origin={[-38, 15]}
              options={[
                {
                  yAccessor: sma20.accessor(),
                  type: "SMA",
                  stroke: sma20.stroke(),
                  windowSize: sma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: wma20.accessor(),
                  type: "WMA",
                  stroke: wma20.stroke(),
                  windowSize: wma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: tma20.accessor(),
                  type: "TMA",
                  stroke: tma20.stroke(),
                  windowSize: tma20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: ema20.accessor(),
                  type: "EMA",
                  stroke: ema20.stroke(),
                  windowSize: ema20.options().windowSize,
                  echo: "some echo here"
                },
                {
                  yAccessor: ema50.accessor(),
                  type: "EMA",
                  stroke: ema50.stroke(),
                  windowSize: ema50.options().windowSize,
                  echo: "some echo here"
                }
              ]}
            />
          </Chart>

          <Chart id={42}
                 yExtents={[d => d.volume, smaVolume50.accessor()]}
                 height={150} origin={(w, h) => [0, h - 150]}
          >
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={mouseCoordinateXDisplayFormat(current)}/>
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".4s")}/>

            <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "red"}/>
            <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
            <CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()}/>
            <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47"/>
          </Chart>
          <CrossHairCursor/>
        </ChartCanvas>

      </div>
    );
  }
}

CandleStickChartWithMA.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChartWithMA.defaultProps = {
  type: "svg"
};
CandleStickChartWithMA = fitWidth(CandleStickChartWithMA);

export default CandleStickChartWithMA;
