import React, { Component } from 'react';
import { StyleSheet,image,View,Alert,AsyncStorage,TouchableOpacity} from 'react-native';
import { Container,
  Input, Item,Title,Body,Header,Right,Badge ,
   Content, Footer, FooterTab, Button, Icon,
    Text,CardItem,Thumbnail,Card,List,ListItem,Left,Switch } from 'native-base';

const ACCESS_TOKEN = 'access_token';

import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

import inr from './inr.png';
import add from './addmoney.png';
import debit from './debitmoney.png';


import { StackNavigator } from 'react-navigation';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
export default class Home extends Component {
  constructor(props) {
    super(props)
      this.state = {
         modalVisible: false,
     accessToken: "",
      isLoggenIn: "",
      amount:'',
      acbal:0,
      data:[],
      cartc:0,
      error:''

  }
}


 componentWillMount() {
    this.getToken();
    this.getbalance();
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




  getbalance = () =>{
  fetch('https://dairydata.000webhostapp.com/getbal.php')
      .then((response) => response.json())
      .then((responseJson) => {
       this.setState({acbal:responseJson});
      })
      .catch((error) => {
        console.error(error);
      });


  fetch('https://dairydata.000webhostapp.com/getcartcount.php')
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson!=""){
                 this.setState({cartc:responseJson});

               }else{
                       this.setState({cartc:0});

               }
      })
      .catch((error) => {
        console.error(error);
      });



       fetch('https://dairydata.000webhostapp.com/getorder.php')
      .then((response) => response.json())
      .then((responseJson) => {
    this.setState( { data: responseJson });
        console.log(this.state.data)

      })
      .catch((error) => {
        console.error(error);
      });
  }





  deposite = () =>{



    const {amount} = this.state;
      const {accessToken} = this.state;
     console.log(AsyncStorage.getItem(ACCESS_TOKEN))
          console.log(accessToken)
if(amount!=""){

         fetch('https://dairydata.000webhostapp.com/deposite.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        amount:amount,
        token:accessToken
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
this.getbalance();

      })
      .catch((error)=>{
        console.error(error);
      });


     this.popupDialog.dismiss(() => {
  console.log('callback - will be called immediately')
});
   this.getbalance();
}
else{
          this.setState({error: 'Enter Amount'});

}


  }

 

  


  render() {

 var ini = this;


  let isi = this.state.data.map(function (data, index) {
        return (

          <List key={index}>
            <ListItem  onPress={() => Alert.alert(
    
    // This is Alert Dialog Title
    'Items Purchased',
 
    // This is Alert Dialog Message. 
    data.item,
    [
       {text: 'OK', onPress: () => console.log('OK ButtonPressed')},
      
    ]
 
  )}>
            {data.in_type==1 ? <Thumbnail square size={80} source={debit} /> : <Thumbnail square size={80} source={add} />}
 
 
              <Body>
               <Text>{data.type}</Text>
                <Text note>By {data.name}</Text>
              </Body>
              <Right>
              <Text style={{fontSize:15,color:'#00add9'}}> {data.in_type==1 ? '-' : '+'} {data.amount}</Text>

              </Right>
            </ListItem>
            </List>
            
        )
    });
  

    return (

     <Container style={{backgroundColor: '#F7F7F6'}}>
      <Header style={{backgroundColor: '#00add9'}} >
          <Body>
            <Title>Home Diary</Title>
          </Body>
          <Right  style={{backgroundColor: '#00add9'}}>
      <Button badge vertical onPress={this.getbalance}   style={{backgroundColor: '#00add9'}} >
          <Icon ios='ios-refresh' android="md-refresh" style={{fontSize: 30, color: 'white'}}/>
            </Button>
          
          </Right>
        </Header>
        <ListItem style={{backgroundColor: '#00add9',marginLeft:-15}} >
              <Thumbnail style={{marginLeft:20,height:55}}  square size={40} source={inr} />
              <Body>
                <Text style={{fontSize:50,fontWeight: 'bold',color:'white',marginLeft:-10}}>  {this.state.acbal}  </Text>

              </Body>
          <Button info style={{marginTop:12}} onPress={() => {
      this.popupDialog.show();
    }}  ><Text> Add Money </Text></Button>

          
            </ListItem>
        <Content style={{backgroundColor: 'white'}}>
        
  
  

           <Card style={{marginTop:0,}}>
      {isi}
          </Card>


        </Content >
         

        <Footer >
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button vertical  active>
              <Icon ios='ios-home' android="md-home"  style={{color: '#00add9'}} />
              <Text style={{color: '#00add9'}}>Home</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('diary',{amount:this.state.amount,cartc:this.state.cartc})}>
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
<PopupDialog
    dialogTitle={<DialogTitle title="Add Balance" />}
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <Content>
          <Item regular style={{marginTop:15,width:250,marginLeft:60}}>
            <Input onChangeText= {amount => this.setState({amount})} placeholder='Amount' />
          </Item>
           <Text style={styles.error}>
            {this.state.error==""?null: <Icon ios='ios-close-circle-outline' style={{fontSize:12,color:'#00add9'}} android="md-close-circle"/> }   {this.state.error}
        </Text>
          <Button onPress={this.deposite} block info iconLeft style={{marginTop: 20, backgroundColor: '#00add9',width:250,marginLeft:60}} >
          <Text>Add</Text>
               </Button>
        </Content>
  </PopupDialog>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    buttoncont: {
      flex:1,
        padding:10,
        

    },
     error: {
    color: '#C62828',
    paddingTop: 10,
    fontSize:12,
    textAlign:'center'

  },
  success: {
    color: 'green',
    paddingTop: 10
  }
 
});