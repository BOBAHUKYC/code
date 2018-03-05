import React, { Component } from 'react';

import Form from './components/Form';
import Weather from './components/Weather';
import Option from './components/Option';

import './App.css';
import $ from 'jquery';

class App extends Component {
  state = {
        time: 1,
        city: '',
		name:'',
        temperature: '',
		country: '',
		wind: '',
		lon: 0,
		lat: 0,
		
		selectOption : '[{},{"id":707860,"name":"Hurzuf","country":"UA","coord":{"lon":34.283333,"lat":44.549999}},{"id":519188,"name":"Novinki","country":"RU","coord":{"lon":37.666668,"lat":55.683334}},{"id":1283378,"name":"Gorkhā","country":"NP","coord":{"lon":84.633331,"lat":28}}]',
		tableArr: [],
		
		countryShow: {display:'none'},
		windShow: {display:'none'},
		coordShow: {display:'none'},
		
		lonField: 0,
		latField: 0,
		cityField: '',
		countryField: false,
		windField: false,
		coordField: false,
		selectData: '',
		
		
		formblock: false,
        fetching: true,
		
		baseUrl : `https://api.openweathermap.org`,
        path : `/data/2.5/weather`,
        appId : `36ea53c2f9ee88efc2436ba9e007002d` 
    }
	
	//Первый запуск
    componentDidMount = () => {
		this.fetchIP();
		
		$('#showTable').on('click', (function(){
			console.log('done!');
		}));
    }
	
	//Одиночная функция для 2 типов запросов
	fetchWeatherData = (city, country_code, query_type, lat, lon) => {
		const {baseUrl, path, appId} = this.state;
		let query ='';
		
		
		if (city) {
			
			switch(query_type) {
				case 'city':
					query = `${baseUrl}${path}?q=${city},${country_code}&units=metric&lang=ru&appid=${appId}`;
					break;
				case 'coord':
					query = `${baseUrl}${path}?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${appId}`;
					break;
				case 'city_only':
					query = `${baseUrl}${path}?q=${city}&units=metric&lang=ru&appid=${appId}`;
					break;
				default:
					break;
			}
			
			fetch(query)
				.then(response => response.json())
				.then(data => {
				   const date = new Date();
				   const time = date.getHours()+":"+date.getMinutes();
					switch(query_type){
						case 'city':
							this.setState({
								time,
								city:data.name,
								temperature: Math.round(data.main.temp),
								weatherCode: data.weather[0].id,
								country: data.sys.country,
								wind: data.wind.speed,
								lon: data.coord.lon,
								lat: data.coord.lat,
								lonField: data.coord.lon,
								latField: data.coord.lat,
								fetching: false
							});
							break;
						default:
							this.setState({ tableArr: [ ...this.state.tableArr,
								{
									time:time,
									id:data.sys.id,
									name:data.name,
									temp:Math.round(data.main.temp),
									country:data.sys.country,
									wind:data.wind.speed,
									lat:data.coord.lat,
									lon:data.coord.lon,
									fetching: false
								}
							] });
							break;
					}
				})
				.catch(error => alert('Ошибка: '+error));
		} else {
			const date = new Date();
			const time = date.getHours()+":"+date.getMinutes();
			this.setState({
				time,
				city:'Неизвестен',
				temperature: 'Нет данных',
				weatherCode: 'Нет данных',
				country: 'Неопределена',
				wind: 'Нет данных',
				lon: 0,
				lat: 0,
				lonField: 0,
				latField: 0,
				fetching: false
			});
		}
	}
	
	//Узнаем текущий город и страну по ип
    fetchIP = () => {
        fetch('//freegeoip.net/json/')
            .then(response => response.json())
            .then(({ city, country_code }) => this.fetchWeatherData(city, country_code, 'city'))
            .catch(error =>  alert('Ошибка: '+error));
    }
	
	//Блокируем отправку формы и обновляем данные
	blockform = event => {
		event.preventDefault();
		
		if (event.target.id === 'weatherForm'){
			const {lonField, latField } = this.state;
			this.fetchWeatherData('true', '', 'coord', latField, lonField);
		}
		
		if(event.target.id === 'cleanTable'){
			this.setState({ tableArr: [] });
		}
	}
	
	
	
	//Отслеживаем изменения полей в форме и сохраняем их
	changefield = event => {
		const name = event.target.name;
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		
		//Добавление города через выпадающий список
		if (event.target.className === 'selectCity' && event.target.value !== ''){
			
			this.fetchWeatherData(event.target.value,'','city_only');
		}
		
		//Управление отображением доп полей в таблице
		if (event.target.type === 'checkbox') {
			const styles = {
				hide : {
					display:'none'
				},
				show : {
					opacity:1
				},
				animation : {
					animation: "zoomOut linear 0.5s",
					opacity:0
				}
			}
			
			const e = event.target.className+'Show';
			if (event.target.checked) {
				if (event.target.className === 'table'){
					this.setState({[e]:"show"});
				} else
				this.setState({
					[e]:  styles.show
				});
			} else {
				if (event.target.className === 'table'){
					this.setState({[e]:"hide"});
					this.timer = setTimeout(()=>(
						this.setState({
							[e]:""				 
						})),500);
				} else {
				this.setState({
					[e]:styles.animation					 
				});
				
				this.timer = setTimeout(()=>(
					this.setState({
						[e]:styles.hide					 
					})),250);
				}
			}
			
		}
		
		//Изменяем значение изменненного поля по его name
		this.setState({
		  [name]: value
		});
	}
	
	//Вывод формы и таблицы
    render() {
        const { fetching, time, city, temperature, country, wind, lon, lat, lonField, latField, selectOption, selectCity, tableArr, countryShow, windShow, coordShow, tableShow } = this.state;

        return fetching ?
            <div className="app"><h1 className="block pulse">Загрузка...</h1></div>
            :
            <div className="app">
				<h1 className="header">Приложение Узнай погоду!</h1>
				<Form 
					city={city} 
					changefield = {this.changefield}
					blockform = {this.blockform}
					lonField={lonField}
					latField={latField} 
					>
					
					<Option 
						selectOption={selectOption}
						changefield = {this.changefield}
						selectCity = {selectCity}
						/>
					
				</Form>
                
				<Weather
					blockform = {this.blockform}
                    city={city}
                    temperature={temperature}
					country={country}
					wind={wind}
					lon={lon}
					lat={lat}
					time={time}
					tableArr={tableArr}
					countryShow={countryShow}
					windShow={windShow}
					coordShow={coordShow}
					tableShow={tableShow}
					/>
            </div>;
    }
}

export default App;
