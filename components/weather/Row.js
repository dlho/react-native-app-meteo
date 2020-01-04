import React  from 'react'
import {View, Text, Image,} from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/fr'
import globalstyle from '../../Style'
import { Card, CardItem } from 'native-base';
import { WeatherModal } from './Modal'
 
moment.locale('fr')

export default class WeatherRow extends React.Component{

    constructor(props){
        super(props)
    }

    static propTypes = {
        data_complete: PropTypes.array,
        data: PropTypes.object,
        dt_txt: PropTypes.string.isRequired,
        dt: PropTypes.number,
        index: PropTypes.number.isRequired
    }
    
    time(data) {
        if(moment(data.dt * 1000).format('LT') === '01:00' || moment(data.dt * 1000).format('LT') === '04:00' || moment(data.dt * 1000).format('LT') === '22:00')
            return true
    }

    icon(size = 50) {
        const type = this.props.data.weather[0].main.toLowerCase()
        if(this.time(this.props.data)){
            switch(type){ 
                case 'clouds': 
                image = require('./icons/cloud_night.png')
                break
                case 'rain':
                image = require('./icons/rain_night.png')
                break
                default :
                image = require('./icons/clear_night.png')
            }
        } else {
            switch(type){
                case 'clouds': 
                    image = require('./icons/cloud.png')
                    break
                    case 'rain':
                    image = require('./icons/rain.png')
                    break
                    default :
                    image = require('./icons/clear.png')
            }
        }
        return <Image source={image} style={{width: size ,height: size}}/>
    }

    dayFirst() {
        let day = moment(this.props.dt * 1000).format('LL').toUpperCase()
        return(<Text>{day}</Text>)
    }

    day() {
        let day = moment(this.props.dt * 1000).format('dddd').toUpperCase()
        return(<Text>{day}</Text>)
    }

    date() {
        let day = moment(this.props.dt * 1000).format('LL')
        return(<Text >{day}</Text>)
    }

    dates() {
        let day = moment(this.props.dt * 1000).format('LL')
        //console.log('Row(dates)', day);
        return(day)
    }

    render() {
        //console.log('Row(render)', this.props.index);
        //<Text style={globalstyle.dayFirst}>{this.date()}</Text>
        if(this.props.index === 0) {
            return(            
                <Card>
                    <CardItem style={globalstyle.CardFirst}>
                        <View style={globalstyle.ViewFirst2}>
                            <View>   
                                <Text style={globalstyle.toDay}>En ce moment</Text>
                                <Text style={globalstyle.tempFirst}>
                                    {Math.round(this.props.data.main.temp)}°C
                                </Text>   
                            </View>
                            <View style={globalstyle.ViewFirst}>                                               
                                {this.icon(140)}                     
                            </View>
                        </View>
                    </CardItem>
                </Card>
            )
        } else {
            return(                
                <Card>
                    <CardItem style={globalstyle.Card}>
                        <View style={globalstyle.View}>
                            <View> 
                                <Text style={globalstyle.temp}>{this.day()}</Text>
                                <Text style={globalstyle.day}>{this.date()}</Text>
                                <WeatherModal date={this.dates()} data_complete={this.props.data_complete} index={this.props.index}/>
                            </View>
                            <View>
                                <View>{this.icon()}</View>                        
                                <Text style={globalstyle.temp2}>
                                    {Math.round(this.props.data.main.temp)}°C
                                </Text>
                            </View>
                        </View>  
                    </CardItem>
                </Card>
            )
        } 
    }    
}