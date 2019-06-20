import React, { Component } from 'react';
import { StyleSheet,ListView,image,View,Alert,AsyncStorage } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem,Spinner , Text,Body,Title,Right,Badge,FooterTab,Item,Input,Footer } from 'native-base';
const ACCESS_TOKEN = 'access_token';

import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

export default class cart extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: '',
      item:'',
      loaded:0,
      cartc:this.props.navigation.state.params.cartc,
      error:''

    };
  }

  componentWillMount() {
    this.getToken();
    this.getcartdata();
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


  deleteRow = (secId, rowId, rowMap,id) =>{

         fetch('https://dairydata.000webhostapp.com/handleitem.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        id:id,
        op:1
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{


      })
      .catch((error)=>{
        console.error(error);
      });
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }


   getcartdata = () =>{
  fetch('https://dairydata.000webhostapp.com/getcartdata.php')
      .then((response) => response.json())
      .then((responseJson) => {
      console.log(responseJson)

     this.setState({ listViewData: responseJson });
          this.setState({ loaded: 1 });

      })
      .catch((error) => {
        console.error(error);

      });


  }

  bought = () =>{


         fetch('https://dairydata.000webhostapp.com/additem.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        op:2,
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{

      })
      .catch((error)=>{
        console.error(error);
      });
   
this.getcartdata();

  }


   additem = () =>{



    const {item} = this.state;
if(item!=""){
 fetch('https://dairydata.000webhostapp.com/additem.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        item:item,
        op:1,
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
this.getcartdata();

      })
      .catch((error)=>{
        console.error(error);
      });


     this.popupDialog.dismiss(() => {
  console.log('callback - will be called immediately')
});
   
}else
{
            this.setState({error: 'Fill Blanks'});

}
        
this.getcartdata();

  }
  



  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
   <Header style={{backgroundColor: '#00add9'}} >
          <Body>
            <Title>Items to Buy</Title>
          </Body>
        <Right  style={{backgroundColor: '#00add9'}}>
      <Button badge vertical   style={{backgroundColor: '#00add9'}} onPress={() => {
      this.popupDialog.show();
    }}>
          <Icon ios='ios-add' android="md-add" style={{fontSize: 30, color: 'white'}}/>
            </Button>
          
          </Right>
        </Header> 
         <Content>
                   {this.state.loaded==0 ? <Spinner color='green' /> : null }
          {this.state.listViewData!="" ? <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
              <Text> {data.name} </Text>
              

              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data.name)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap,data.id)}>
                <Icon active name="trash" />
              </Button>}
          > </List>:<Text style={styles.error}>
             Cart is Empty
        </Text>}
          
           <Button full success onPress={this.bought}  style={{marginTop:10}}>
            <Text>Bought All</Text>
        
          </Button>
          
        </Content>

         <Footer >
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button vertical onPress={() => this.props.navigation.navigate('Home')} >
              <Icon ios='ios-home' android="md-home"  style={{color: '#00add9'}} />
              <Text style={{color: '#00add9'}}>Home</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('diary',{cartc:this.state.cartc})}>
              <Icon ios='ios-clipboard'  android="md-clipboard" style={{color: '#00add9'}} />
              <Text style={{color: '#00add9'}}>Diary</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('profile',{cartc:this.state.cartc})} >
              <Icon style={{color: '#00add9'}}   name="person" />
              <Text style={{color: '#00add9'}}>Account</Text>
            </Button>
              <Button badge vertical active >
              <Badge><Text>{this.state.cartc}</Text></Badge>
          <Icon ios='ios-cart' android="md-cart" style={{fontSize: 30, color: '#00add9'}}/>
                        <Text style={{color: '#00add9'}}>Cart</Text>

            </Button>
          </FooterTab>
        </Footer>

        <PopupDialog
    dialogTitle={<DialogTitle title="Add Item in Cart" />}
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <Content>
          <Item regular style={{marginTop:15,width:250,marginLeft:60}}>
            <Input onChangeText= {item => this.setState({item})} placeholder='Item eg(Tomato 1 KG)' />
          </Item>
           <Text style={styles.error}>
            {this.state.error==""?null: <Icon ios='ios-close-circle-outline' style={{fontSize:12,color:'#00add9'}} android="md-close-circle"/> }   {this.state.error}
        </Text>
          <Button onPress={this.additem} block info iconLeft style={{marginTop: 20, backgroundColor: '#00add9',width:250,marginLeft:60}} >
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