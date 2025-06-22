import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import dummyRoutes from '../../data/dummyRoutes.json';
import styles from './style.module.scss';

export default function Earth() {
	const globeEl = useRef();
	const [airports, setAirports] = useState([]);
	const [routes, setRoutes] = useState([]);

	const COUNTRY = 'United States';
	const OPACITY = 0.44;

	const airportParse = ([
		airportId,
		name,
		city,
		country,
		iata,
		icao,
		lat,
		lng,
		alt,
		timezone,
		dst,
		tz,
		type,
		source,
	]) => ({
		airportId,
		name,
		city,
		country,
		iata,
		icao,
		lat,
		lng,
		alt,
		timezone,
		dst,
		tz,
		type,
		source,
	});
	const routeParse = ([
		airline,
		airlineId,
		srcIata,
		srcAirportId,
		dstIata,
		dstAirportId,
		codeshare,
		stops,
		equipment,
	]) => ({
		airline,
		airlineId,
		srcIata,
		srcAirportId,
		dstIata,
		dstAirportId,
		codeshare,
		stops,
		equipment,
	});

	const parseCSVRows = (csvString, parser) => {
		// Split the CSV string into rows
		const rows = csvString.trim().split('\n');
		// Map each row to an array of values, then use the parser function on each
		return rows.map((row) => {
			// Split each row by comma, considering CSV-specific edge cases if necessary
			const values = row.split(',').map((value) => value.trim());
			// Use the provided parser function to convert array of values to an object
			return parser(values);
		});
	};

	useEffect(() => {
		globeEl.current.pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 });
		globeEl.current.controls().autoRotate = true;
		globeEl.current.controls().autoRotateSpeed = 0.4;
		globeEl.current.controls().enableZoom = false;
		// globeEl.current.controls().enabled = false;

		// Assuming you still want to fetch airports data
		fetch(
			'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'
		)
			.then((res) => res.text())
			.then((csvString) => {
				const parsedData = parseCSVRows(csvString, airportParse);

				const usAirports = parsedData.filter(
					(airport) => airport.country === '"United States"'
				);

				setAirports(usAirports);
				// console.log(parsedData);
			});

		// Load routes from the dummy data file
		setRoutes(dummyRoutes);
	}, []);

	return (
		<>
			{/* <script src="//unpkg.com/d3-dsv"></script>
			<script src="//unpkg.com/index-array-by"></script> */}
			<div className={styles.earth_container}>
				<Globe
					ref={globeEl}
					globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
					arcsData={routes}
					arcLabel={(d) =>
						`${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`
					}
					arcStartLat={(d) => +d.srcAirport.lat}
					arcStartLng={(d) => +d.srcAirport.lng}
					arcEndLat={(d) => +d.dstAirport.lat}
					arcEndLng={(d) => +d.dstAirport.lng}
					arcDashLength={0.45}
					arcDashGap={1}
					arcDashInitialGap={() => Math.random()}
					arcDashAnimateTime={8000}
					arcColor={(d) => [
						`rgba(155, 99, 241, ${OPACITY})`,
						`rgba(233, 24, 75, ${OPACITY})`,
						`rgba(77, 77, 255, ${OPACITY})`,
						`rgba(232, 235, 255, ${OPACITY})`,
						`rgba(255, 155, 251, ${OPACITY})`,
					]}
					arcsTransitionDuration={0}
					pointsData={airports}
					pointColor={() => 'orange'}
					pointAltitude={0.01}
					// pointRadius={0.02}
					pointsMerge={true}
				/>
			</div>
		</>
	);
}
