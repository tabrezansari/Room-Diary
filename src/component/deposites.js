import React, { Component } from 'react';
import { StyleSheet,image,View,Alert,AsyncStorage} from 'react-native';
import { Container,
  Input, Item,Title,Body,Header,Right,Badge ,
   Content, Footer, FooterTab, Button, Icon,
    Text,CardItem,Thumbnail,Card,List,ListItem,Left,Switch } from 'native-base';

const ACCESS_TOKEN = 'access_token';

import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

import add from './addmoney.png';


import { StackNavigator } from 'react-navigation';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
export default class deposite extends Component {
  constructor(props) {
    super(props)
      this.state = {
         modalVisible: false,
     accessToken: "",
      isLoggenIn: "",
      amount:'',
      acbal:0,
      data:[],
            cartc:this.props.navigation.state.params.cartc


  }
}


 componentWillMount() {
    this.getToken();
    this.getdeposites();
  }

onLogout =() =>{
    this.deleteToken();
  }

getToken = async() => {
    try {
      let data = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(data);
   if(data==null) {
          this.redirect('Login');
      } else {
          this.setState({accessToken: data})
      }     
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('Login');
    }
}
  deleteToken = async() => {
    try {
         AsyncStorage.clear();
        this.redirect('Login');
    } catch(error) {
        console.log("Something went wrong");
    }
  }
  redirect(routeName){
         this.props.navigation.navigate(routeName);

  }
  getdeposites = () =>{

        fetch('https://dairydata.000webhostapp.com/getdeposites.php')
      .then((response) => response.json())
      .then((responseJson) => {
    this.setState( { data: responseJson });
        console.log(this.state.data)

      })
      .catch((error) => {
        console.error(error);
      });
  }

 
  


  render() {

 var ini = this;


  let isi = this.state.data.map(function (data, index) {
        return (

          <List key={index}>
            <ListItem> 
           <Thumbnail square style={{width:50}} size={20} source={add} />

              <Body>
                <Text>Deposite Made</Text>
                <Text note>By {data.name}</Text>
              </Body>
              <Right style={{marginLeft:-10}}>
              <Text style={{fontSize:18,color:'#00add9'}}> + {data.tot_amt}</Text>

              </Right>
            </ListItem>
            </List>
            
        )
    });
  

    return (

     <Container style={{backgroundColor: '#F7F7F6'}}>
      <Header style={{backgroundColor: '#00add9'}} >
          <Body>
            <Title>Home Diary Deposites</Title>
          </Body>
       
        </Header>
      
        <Content style={{backgroundColor: 'white'}}>
        
  
  

           <Card style={{marginTop:0,}}>
      {isi}
          </Card>


        </Content >
         

        <Footer >
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button vertical onPress={() => this.props.navigation.navigate('Home')} >
              <Icon ios='ios-home' android="md-home"  style={{color: '#00add9'}} />
              <Text style={{color: '#00add9'}}>Home</Text>
            </Button>
            <Button vertical active onPress={() => this.props.navigation.navigate('diary',{amount:this.state.amount,cartc:this.state.cartc})}>
              <Icon ios='ios-clipboard'  android="md-clipboard" style={{color: '#00add9'}} />
              <Text style={{color: '#00add9'}}>Diary</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('profile',{cartc:this.state.cartc})} >
              <Icon style={{color: '#00add9'}}   name="person" />
              <Text style={{color: '#00add9'}}>Account</Text>
            </Button>
              <Button badge vertical   onPress={() => this.props.navigation.navigate('cart',{cartc:this.state.cartc})}>
              <Badge><Text>{this.state.cartc}</Text></Badge>
          <Icon ios='ios-cart' android="md-cart" style={{fontSize: 30, color: '#00add9'}}/>
                        <Text style={{color: '#00add9'}}>Cart</Text>

            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
    buttoncont: {
        flex: 1,

    },
     datePickerBox:{
    marginTop: 9,
    borderColor: '#FF5722',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent:'center'
  },
 
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',
 
  },
   
});