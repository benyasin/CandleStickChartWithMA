

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getDataDays() {
	const promiseDays = fetch("https://rrag.github.io/react-stockcharts/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseDays;
}

export function getDataMinutes() {
  const promiseMinutes = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT_INTRA_DAY.tsv")
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(d => new Date(+d))));
  return promiseMinutes;
}

export function getDataHours() {
  const promiseHours = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT_INTRA_DAY.tsv")
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(d => new Date(+d))));
  return promiseHours;
}

export function getDataMonths() {
  const promiseMonths = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT_INTRA_DAY.tsv")
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(d => new Date(+d))));
  return promiseMonths;
}
