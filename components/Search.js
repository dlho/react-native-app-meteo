import React from 'react'
import globalstyle from '../Style'
import {Button, View, Image}from 'react-native'
import {Searchbar} from 'react-native-paper'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import List from './List'

class Search extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            city : 'Paris'
        }
    }

    static navigationOptions = {
        title: 'Rechercher une ville',
        tabBarIcon : () => {
            return <Image source={require('./png/user.jpg')} style={{width : 20, height: 20}}/>
        }
    }
    
    setCity(city) {
        this.setState({city})
    }

    submit(){
        this.props.navigation.navigate('Result', {city : this.state.city})
    }

    render(){
        return(
            <View>
                <Searchbar
                    style ={{backgroundColor : '#74bbe4', margin:5}}
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