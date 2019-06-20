import React, { Component } from 'react';
import { StyleSheet,image,View,Alert,Modal,Image,ListView,TouchableOpacity,AsyncStorage  } from 'react-native';
import { Container,
  Input, Item,Title,Body,Header,Right,Badge ,
   Content, Footer, FooterTab, Button, Icon,
    Text,CardItem,Thumbnail,Card,List,ListItem,Left,Switch,Fab  } from 'native-base';

import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

import { StackNavigator } from 'react-navigation';
import me from './avatar.png';

import swipe from './swipe.png';
const ACCESS_TOKEN = 'access_token';

export default class profile extends Component {
  constructor(props) {
    super(props);
  this.state = {
    modalVisible: false,
     accessToken: "",
      isLoggenIn: "",
      name:"",
      tokendata:"",
            cartc:this.props.navigation.state.params.cartc

    
  }
 
 
  }
  componentWillMount() {
    this.getToken();
    
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

          this.setState({accessToken: data});
          this.getuser();
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
  format = () =>{
    Alert.alert(
  'Deleting Data',
  'Are you sure want to delete all the datas',
  [
    {text: 'Yes', onPress: () => this.proceedformat()},
    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  ],
  { cancelable: false }


)


  
  }

 
 getuser = () =>{

        const {accessToken} = this.state;
console.log(accessToken)
    fetch('https://dairydata.000webhostapp.com/getuser.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        token:accessToken
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
        console.log(responseJson)
            this.setState({name: responseJson})

      })
      .catch((error)=>{
        console.log('sdfsdf')
      });



       
  }
  

  openModal = () =>{
    this.setState({modalVisible:true});
  }

  closeModal  = () => {
    this.setState({modalVisible:false});
  }


   changename = () =>{



    const {name} = this.state;
      const {accessToken} = this.state;
    

         fetch('https://dairydata.000webhostapp.com/editprofile.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        name:name,
        token:accessToken
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{


      })
      .catch((error)=>{
        console.error(error);
      });


     this.popupDialog.dismiss(() => {
  console.log('callback - will be called immediately')
});
   
  }
  



  render() {


    return (
      <Container style={{backgroundColor: '#00add9'}}>
        <Header style={{backgroundColor: '#00add9'}} >
           <Body>
            <Title>My Account</Title>
          </Body>
        
        </Header>
       
 


        <Content style={{marginTop:20,padding:15}}>
        
          <Thumbnail style={{marginLeft:130}} large source={me} />
         {this.state.name==""?  <Text style={{marginTop:10,color: 'white',fontSize:20,textAlign:'center'}}>Your Name</Text>: <Text style={{marginTop:10,color: 'white',fontSize:20,textAlign:'center'}}>{this.state.name}</Text>}




           <Text onPress={this.onLogout}
              title="Open modal" style={{marginTop:10,color: 'white',textAlign:'center'}}>Logout </Text>
           <Card style={{marginTop:40}}>
           
             <Button full success onPress={() => {
      this.popupDialog.show();
    }} > 
            <Text>Change Name</Text>
          </Button>

         
     
          </Card>

          
        </Content >
         

        <Footer >
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button vertical  onPress={() => this.props.navigation.navigate('Home')}>
              <Icon ios='ios-home' android="md-home"  style={{color: '#00add9'}} />
              <Text style={{color: '#00add9'}}>Home</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('diary',{amount:this.state.amount,cartc:this.state.cartc})}>
              <Icon ios='ios-clipboard'  android="md-clipboard" style={{color: '#00add9'}} />
              <Text style={{color: '#00add9'}}>Diary</Text>
            </Button>
            <Button vertical active onPress={() => this.props.navigation.navigate('profile',{cartc:this.state.cartc})} >
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
        <PopupDialog
    dialogTitle={<DialogTitle title="Change Name" />}
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <Content>
          <Item regular style={{marginTop:15,width:250,marginLeft:60}}>
            <Input onChangeText= {name => this.setState({name})} placeholder='Change Name' />
          </Item>
          <Button onPress={this.changename} block info iconLeft style={{marginTop: 20, backgroundColor: '#00add9',width:250,marginLeft:60}} >
          <Text>Change</Text>
               </Button>
        </Content>
  </PopupDialog>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    buttoncont: {
        flex: 1,

    },
    modalContainer: {
    flex:0,
    justifyContent: 'center',
 backgroundColor:'transparent'
  },
  innerContainer: {
    padding:10,
    marginTop:20,
    alignItems: 'center',
 backgroundColor:'transparent'

  },
   
});