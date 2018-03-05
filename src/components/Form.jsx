import React from 'react';

function Form({ children,lonField, latField, changefield, blockform }) {
    return (
       <form id="weatherForm" className="testform" onSubmit={blockform}>
		{children}
		<div className="leftSide">
			<label className="block latField">Широта: <input type="number" className="lan" name="latField"  value={latField} placeholder="Широта в десятичных градусах" onChange={changefield} /></label>
			<label className="block lonField">Долгота: <input type="number" className="lon" name="lonField" value={lonField} placeholder="Долгота в десятичных градусах" onChange={changefield} /></label>
			<button type="submit" className="block">Добавить координаты</button>
		</div>
		<div className="rightSide">
			<textarea className="block" name="optionsField" rows="6" placeholder="Я не знаю для чего она тут!!!" onChange={changefield}></textarea>
		</div>
		<div className="c"></div>
		
		<div className="formSettings block">
			<label className="countryLabel"><input type="checkbox" name="countryField" onChange={changefield} className="country"/>Код Страны</label>
			<label className="windLabel"><input type="checkbox" name="windField" onChange={changefield} className="wind" />Скорость ветра</label>
			<label className="coordLabel"><input type="checkbox" name="coordField" onChange={changefield} className="coord" />Координаты</label>
		</div>
		<label className="inline-block"><input type="checkbox" name="showTable" onChange={changefield} className="table" id="showTable" />Показать таблицу</label>
	   </form>
    );
}

export default Form;