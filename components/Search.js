import React from 'react'
import globalstyle from '../Style'
import {Button, View, Image}from 'react-native'
import {Searchbar} from 'react-native-paper'
import PropTypes from 'prop-types'
import {createStackNavigator, createAppContainer} from 'react-navigation'

import List from './List'

import { API_KEY } from '../utils/weatherApiKey';

class Search extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            city : 'Paris',
        }
    }

    static navigationOptions = {
        title: 'Rechercher une ville',
        tabBarIcon : () => {
            return <Image source={require('./png/user.jpg')} style={{width : 20, height: 20}}/>
        }
    }

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.fetchWeather(position.coords.latitude, position.coords.longitude);
			},
			error => {
				this.setState({
					error: 'Récupération de votre position impossible'
				});
			}
		);
	}

	fetchWeather(lat = 25, lon = 25) {
		fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
			.then(res => res.json())
			.then(json => {
				//console.log(json);
				this.setState({
                    city: json.name,
					isLoading: false
				});
			});
	}    

    setCity(city) {
        this.setState({city})
    }

    submit() {        
        this.props.navigation.navigate('Result', {city : this.state.city.trim()})
    }

    render(){
        //console.log('Search(render)', this.state.city);
        return(
            <View>
                <Searchbar
                    style ={{backgroundColor : '#ced9df', margin:5}}
                    placeholder="Rechercher"
                    onChangeText={(text) => this.setCity(text)}
                    value={this.state.city}
                />
                <View style={{margin:20}}>
                    <Button
                        color={globalstyle.color}
                        onPress={() => this.submit()}
                        title="Validez"/>
                </View>
            </View>
        )
    }
}

const navigationOptions = {
    headerStyle : globalstyle.header,
    headerTitleStyle : globalstyle.headerTitle,
    headerTintColor: '#fff',
}

const AppNavigator = createStackNavigator({    
    Search : {
        screen : Search,
        navigationOptions
    },
    Result: {
        screen: List,
        navigationOptions
    },
});
  
export default createAppContainer(AppNavigator);