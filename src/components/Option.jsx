import React from 'react';

function Option({ selectOption, changefield, selectCity}) {
	
	const sOptions = JSON.parse(selectOption).map((row, i) => {
		return (<option key={'cityoption_'+i} value={row.name}>{row.name}</option>);
	});
	
	return (<select onChange={changefield} value={selectCity} name="selectCity" className="selectCity" placeholder="Выберите город">{sOptions}</select>);
}

export default Option;