import React, { Component } from 'react';
import { StyleSheet,image,View,Alert,AsyncStorage } from 'react-native';
import { Container,
  Input, Item,Title,Body,Header,Right,Badge ,
   Content, Footer, FooterTab, Button, Icon,
    Text,CardItem,Card,Label,Left,Spinner } from 'native-base';

import { StackNavigator } from 'react-navigation';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
 const ACCESS_TOKEN = 'access_token';

import moment from 'moment';
export default class verify extends Component {
  constructor(props) {
    super(props)
       this.state = {
 
      DateText: '',
      isclick: 0,
 
      DateHolder: null,
      otp:'',
      mobile:this.props.navigation.state.params.mobile
      
    }
  }

 redirect(routeName,accessToken){
   
    this.props.navigation.navigate(routeName,{accessToken:accessToken});
  }


   DatePickerMainFunctionCall = () => {
 
    let DateHolder = this.state.DateHolder;
 
    if(!DateHolder || DateHolder == null){
 
      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }
 
    //To open the dialog
    this.refs.DatePickerDialog.open({
 
      date: DateHolder,
 
    });
 
  }
  onDatePickedFunction = (date) => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  }

    verifypin = () =>{
    this.setState({isclick:1});



    const {mobile} = this.state;
    const {otp} = this.state;
    
         fetch('https://dairydata.000webhostapp.com/verifyotp.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        mobile: mobile,
        otp:otp
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
  AsyncStorage.setItem(ACCESS_TOKEN,responseJson);
 this.redirect('Home');
      })
      .catch((error)=>{
        console.error(error);
      });
     
   

  }

  render() {


    return (
      <Container style={{backgroundColor: '#F7F7F6'}}>
        <Header style={{backgroundColor: '#00add9'}} >
        <Left>
      <Icon active ios='ios-arrow-back' android="md-arrow-back" style={{fontSize: 30,marginBottom:5, color: 'white'}}/>

        </Left>
          <Body>
            <Title style={{marginLeft:-30}}>Mobile  Verification</Title>
          </Body>
    
        </Header>
        <Content>
        
            <CardItem style={{backgroundColor:'#F7F7F6'}}>
              <Body style={{backgroundColor:'#F7F7F6'}}>

              <Label style={{fontSize:22,color:'#00add9',marginLeft:55,marginTop:60}}>VERIFY YOUR MOBILE</Label>
      <Label style={{fontSize:13,marginTop:10}}>We have sent 4 digit OTP to your mobile number (+91{this.props.navigation.state.params.mobile}).Enter code below</Label>

               <Item regular style={{marginTop:30,width:150,marginLeft:80}}>
            <Input style={{fontSize:25,textAlign:'center'}} maxLength={4}  placeholder='Enter OTP' onChangeText= {otp => this.setState({otp})}/>
             
          </Item>



              <Button onPress={this.verifypin}  block danger iconLeft style={{marginTop: 20, backgroundColor: '#00add9'}} >
          {this.state.isclick==0 ? <Text>VERIFY</Text>: <Spinner color="white"/> }  
               </Button>

             
           
            
          

     <Label style={{fontSize:16,color:'#00add9',marginTop:20}}>Resend OTP</Label>     

              </Body>
            </CardItem>
       

          
        </Content >
         

       
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