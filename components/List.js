import React  from 'react'
import { FlatList, Button, Text, Image, View } from 'react-native'
import globalstyle from '../Style'
import WeatherRow from './weather/Row'
import { ActivityIndicator , Colors } from 'react-native-paper'
import axios from 'axios'
import moment from 'moment';

import { API_KEY } from '../utils/weatherApiKey';

moment.locale('fr')

export default class List extends React.Component {
    
    static navigationOptions = ({navigation}) => {  
        return{
            title : `${navigation.state.params.city}`,
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            city: this.props.navigation.state.params.city,
            report : null,
            error : false
        }
        this.fetchWeather()
    }

    fetchWeather () {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${API_KEY}&mode.json&units=metric`)
        .then((response) => {//console.log(response.data);
                this.setState({report: response.data})
            })
        .catch(() => {
            this.setState({error : true})
        })
    }

    errorIcon(size = 50) {
        image = require('./png/cancel.png')
        return <Image source={image} style={{width: size ,height: size}}/>
    }

    renderItem = ({item, index}) => (
        <WeatherRow
            data_complete={this.state.report.list}
            dt={item.dt}
            dt_txt={item.dt_txt}
            data={item}
            index={index}
        />
    );
           
    filterData = (data) => data.slice(0,1).concat(data.filter((item) => moment(item.dt * 1000).format('LT') == '13:00'));  // on filtre sur la temp de chaque jour à midi

    render() {
        if(this.state.report === null)
        {
            if(this.state.error === true){
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this.errorIcon(150)}
                        <View>
                            <Text style={{fontSize: 20, margin : 20}}>Veuillez inserer une ville valide</Text>
                        </View>                       
                        <View>
                            <Button
                            onPress={() => this.props.navigation.goBack(null)}
                            title="Retour"
                            color={globalstyle.color}
                            style={{ marginTop: 50}}
                            />
                        </View>
                    </View>
                  );
            } else {
                return(<ActivityIndicator style={globalstyle.Indicator} animating={true} color={Colors.white800} size="large"/>)
            }
        } else { 
            return(
                <View style={{backgroundColor: '#55555'}}>
                    <FlatList
                        data = {this.filterData(this.state.report.list)}                        
                        renderItem={(item, index) => this.renderItem(item, index)}
                        keyExtractor={(item, index) => {
                            //console.log(`${item.dt_txt}`, `${index}`)
                            return `${index}`;
                        }}          
                    />            
                </View>
            )
        }
    }
}