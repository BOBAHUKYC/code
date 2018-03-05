import React from 'react';

function Weather({ children, city, name, temperature, country, wind, lon, lat, time, tableArr, countryShow, windShow, coordShow, blockform, tableShow}) {
	
	
	const tableArrOut = tableArr.map((row, i) => {
		return (<tr key={'city_'+i} className="zoomIn"> 
					<td>{i+1}</td>
					<td className="city" >{row.name}</td>
					<td className="temperature">{row.temp}&deg;C</td>
					<td className="country" style={countryShow}>{row.country}</td>
					<td className="wind" style={windShow}>{row.wind}</td>
					<td className="coord" style={coordShow}>{row.lat}; {row.lon}</td>
					<td className="time">{row.time}</td>
				</tr>);
	});
	
    return (
		<div id="weatherBody" className={tableShow}>
			<h2>Таблица выбранных городов</h2>
			<form className="testform" id="cleanTable" onSubmit={blockform}>
				<button  type="submit" className="block">Очистить таблицу</button>
			</form>
			<table className="weather-details">
			<tbody>
			   <tr className="zoomIn">
				<th>№</th>
				<th>Город</th>
				<th >Температура</th>
				<th className="country" style={countryShow}>Код страны</th>
				<th className="wind" style={windShow}>Скорость ветра  м/c</th>
				<th className="coord" style={coordShow}>Широта ; Долгота в десятичных градусах</th>
				<th className="time">Время</th>
			   </tr>
			   <tr className="zoomIn"> 
					<td>Ваш город:</td>
					<td className="city">{city}</td>
					<td className="temperature">{temperature}&deg;C</td>
					<td className="country" style={countryShow}>{country}</td>
					<td className="wind" style={windShow}>{wind}</td>
					<td className="coord" style={coordShow}>{lat};  {lon}</td>
					<td className="time">{time}</td>
				</tr>
				{tableArrOut}
			</tbody>
			</table>
		</div>
    );
}

export default Weather;


