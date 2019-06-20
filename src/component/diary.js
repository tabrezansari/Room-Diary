import React, { Component } from "react";
import { StyleSheet,image,View,Alert,AsyncStorage,TouchableOpacity} from 'react-native';

import { Container, Header, Content, Icon, Picker, Right,Form,Body,Title,Card,Textarea,Button,Text,H3,Item,Input,Footer,FooterTab,Badge} from "native-base";
const ACCESS_TOKEN = 'access_token';

import { StackNavigator } from 'react-navigation';

export default class diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
        amount:'',
    accessToken: "",
          item:'',
             error:'',
             auth:'',
            amt:this.props.navigation.state.params.amount,
      cartc:this.props.navigation.state.params.cartc,
    
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value      


    });
  }
componentWillMount() {
    this.getToken();
    this.getauth();
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

  redirect(routeName){
         this.props.navigation.navigate(routeName);

  }




  getauth = () =>{
       const {accessToken} = this.state;
   console.log(accessToken)
         fetch('https://dairydata.000webhostapp.com/auth.php', {
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
    this.setState( { auth: responseJson });

      })
      .catch((error)=>{
        console.error(error);
      });


    }
  orderupdate = () =>{
    
    const {amount} = this.state;
    const {item} = this.state;
     const {selected} = this.state;
     const {accessToken} = this.state;
     const {amt} = this.state;
  console.log(amt)
    if(amount!="" || item!="" ){
         fetch('https://dairydata.000webhostapp.com/updateorder.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        amount: amount,
        token:accessToken,
        item:item,
        type:selected
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
       this.redirect('Home');

      })
      .catch((error)=>{
        console.log(error)


        this.setState({error: 'Account Balance is less'});



      });
     
 }

 
  }


  render() {
            const helloMessage =<Form>
          <Card style={{marginTop:10}}>
            <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 ,marginTop:5}} />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Widthdrawel Type" value="0" />
              <Picker.Item label="Item Purchased" value="Purchased Item" />
               <Picker.Item label="Food Order" value="Ordered Food" />
      
            </Picker>

             <Item regular style={{marginTop:5}}>
            <Input placeholder='Purchase Amount' onChangeText= {amount => this.setState({amount})} />
          </Item>

                        <Textarea rowSpan={5} style={{marginTop:5}} onChangeText= {item => this.setState({item})} bordered placeholder="Items (eg: Vegitable like potato etc)" />

                        <Text style={styles.error}>
            {this.state.error==""?null: <Icon ios='ios-close-circle-outline' style={{fontSize:12,color:'#00add9'}} android="md-close-circle"/> }   {this.state.error}
        </Text>

                         <Button full success style={{marginTop:5}} onPress={this.orderupdate}>
            <Text>Confirm Order</Text>
          </Button>


            </Card>
          </Form> ;


    return (
      <Container>
 <Header style={{backgroundColor: '#00add9'}} >
          <Body>
            <Title>Home Diary</Title>
          </Body>
          <Right>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('deposite',{cartc:this.state.cartc})}><Text style={{color:'white'}}>Check Deposites</Text></TouchableOpacity>
          </Right>
        
        </Header>       
         <Content>
       

         
        {this.state.auth==1 ? helloMessage : <H3 style={{marginTop:25,marginLeft:70,color:'grey'}}>You're Not Authorized</H3>}
                  
        </Content>
        <Footer >
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button vertical  onPress={() => this.props.navigation.navigate('Home')} >
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