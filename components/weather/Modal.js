import React from 'react'
import { View, Text, TouchableHighlight, FlatList, Modal, Button, Image } from 'react-native'
import PropTypes, { array } from 'prop-types'
import { Card, CardItem } from 'native-base';
import moment from 'moment'
import globalstyle from '../../Style'

export class WeatherModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        };
    }

    static propTypes = {
        date: PropTypes.string,
        data_complete: PropTypes.array,
        index: PropTypes.number
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    time(data) {
        if (moment(data.dt * 1000).format('LT') === '01:00' || moment(data.dt * 1000).format('LT') === '04:00' || moment(data.dt * 1000).format('LT') === '22:00') {
            return true
        }
    }

    icon(size = 50, data) {

        const type = data.weather[0].main.toLowerCase()

        if (this.time(data)) {
            switch (type) {
                case 'clouds':
                    image = require('./icons/cloud_night.png')
                    break
                case 'rain':
                    image = require('./icons/rain_night.png')
                    break
                default:
                    image = require('./icons/clear_night.png')
            }
        } else {
            switch (type) {
                case 'clouds':
                    image = require('./icons/cloud.png')
                    break
                case 'rain':
                    image = require('./icons/rain.png')
                    break
                default:
                    image = require('./icons/clear.png')
            }
        }
        return <Image source={image} style={{ width: size, height: size }} />
    }

    filterData(data) {
        data_day = data.filter((item) => moment(item.dt * 1000).format('LL') === this.props.date);
        //console.log('Modal(filterData)', data_day);
        return (data_day)
    }

    render() {
         //console.log('Modal(render)', this.props.index);
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>

                    <View style={globalstyle.ModalStyle}>
                        <View style={globalstyle.ModalStyle1}>
                            <Text style={globalstyle.TitleModal}>Météo de la journée</Text></View>
                        <View style={{ margin: 30, height: 300 }}>
                        <FlatList
                            data = {this.filterData(this.props.data_complete)}
                            renderItem={({ item, index }) => 
                            <View>
                                <Card>
                                    <CardItem style={{ backgroundColor: '#74bbe4' }}>
                                        <View style={globalstyle.CardModal}>
                                            <Text style={{ fontSize: 20, color: '#000000' }}>{moment(item.dt * 1000).format('LT')}</Text>
                                            {this.icon(50, item)}
                                            <Text style={{ fontSize: 30, color: '#000000' }}>{Math.round(item.main.temp)}°C</Text>
                                        </View>
                                    </CardItem>
                                </Card>
                            </View>}   
                            keyExtractor={item => item.dt_txt}             
                        />                            
                        </View>
                        <View style={globalstyle.ModalStyle}>
                            <Button
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                                title="Retour"
                                color="#004c8c"
                                accessibilityLabel="Météo de la semaine"
                            />
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight
                    underlayColor='transparent'
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={{ fontSize: 20, color: '#004c8c' }}>Détails</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
