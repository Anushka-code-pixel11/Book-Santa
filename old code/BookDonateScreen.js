import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    Modal, 
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import { FlatList } from 'react-native-gesture-handler';

export default class BookDonateScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            requestedBooksList: []
        }
        this.requestRef = null;
    }

    getRequestedBooksList = () => {
        this.requestRef = db.collection("requested_books")
        .onSnapshot((snapshot) => {
            var requestedBooksList = snapshot.docs.map(document => document.data())
            this.setState({
                requestedBooksList: requestedBooksList
            })
        })
        
    }
    componentDidMount() {
        this.getRequestedBooksList()
    }
    
    keyExtractor = (item,index) => index.toString()
    renderItem = ({item,i}) => {
        return (
            <ListItem 
                key = {i}
                title = {item.book_name}
                subtitle = {item.reason_to_request}
                titleStyle = {{color: "black",fontWeight: "bold"}}
                rightElement = {
                    <TouchableOpacity style = {styles.button}>
                        <Text style = {{color: "magenta"}}> 
                            View 
                        </Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }
    render() {
        return (
            <View style = {{flex: 1}}>
                <MyHeader 
                    title = "Donate Books"
                />
                <View style = {{flex: 1}}>
                    {
                        this.state.requestedBooksList.length === 0
                        ?(
                            <View style = {styles.subContainer}> 
                                <Text style = {{fontSize: 20}}>
                                    list of all requested books
                                </Text>
                            </View>
                        ):

                        (
                            <FlatList 
                                keyExtractor = {this.keyExtractor}
                                data = {this.state.requestedBooksList}
                                renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })