//----- dark mode ----//
const fontColorWhite = '#FFF'
//---- basic mode ----//
const blue = '#004c8c'
export default {
    color : blue,
    container :{
        marginBottom :10,
        marginTop: 100,
        flex: 1, 
        alignItems: 'center',
        color:"black",
    },
    title : {
        fontSize: 30,
        color: fontColorWhite,
        //fontFamily : 'open-sans-bold'
    },
   
    header :{
        backgroundColor : blue,
        tintColor: '#FFF'
    },
    headerTitle:{
        color: 'white',
    },
    Indicator:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    View :{
        flex: 1,
        flexDirection: 'row', 
        justifyContent: "space-between",
        backgroundColor: '#74bbe4',
        color: 'blue'
    },
    day:{
        color: 'black',
        fontSize: 15,
    },
    dayFirst:{
        color: 'white',
        fontSize: 15,
    },
    temp:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    temp2:{
        marginTop: 15,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },    
    tempFirst:{
        marginTop: 20,
        marginLeft: 20,
        fontSize: 60,
        color: 'black',
        fontWeight: 'bold'
    },
    toDay:{
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold'
    },
    TextBar:{
        color: blue,
        flex: 1,
        alignItems: 'center'

    },
    CardFirst:{
        backgroundColor: '#74bbe4',
        height: 250,
        
    },
    ViewFirst :{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ViewFirst2:{
        flex :1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-evenly',
       
    },
    Card:{
        backgroundColor: '#74bbe4',
        margin: 0,
    },
    CardView:{
        margin: 0
    },
    /*---------Modal---------*/
    ModalStyle1:{
        flexDirection: 'row', 
        justifyContent:'center',
        alignItems:'center'
    },
    ModalStyle: {
        justifyContent: 'space-around',
        margin: 30,
        backgroundColor: 'rgba(0,76,140,.85)',
        borderRadius: 0
    },
    CardModal:{
        flex :1,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems: 'center',
    },
    TitleModal:{
        marginTop: 25,
        color:'#000000',
        fontSize:30,
        fontWeight :'bold',
    },
    ModalReturn: {
        //fontWeight :'bold',
        fontSize: 20,
       
    }
}