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

export default class WelcomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailID: " ",
            password: " ",
            firstName: " ",
            lastName: " ",
            contact: " ",
            confirmPassword: " ",
            isModalVisible: false, 
            address: " "
        }
    }

    userSignUP = (emailID,password,confirmPassword) => {
        if(password !== confirmPassword){
            return Alert.alert("passwords do not match");
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(emailID,password)
            .then((response) => {
                db.collection("Users").add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    mobile_number: this.state.contact,
                    user_name: this.state.emailID,
                    address: this.state.address,
                })
                return Alert.alert(
                    "User Added Succesfully",
                    " ",
                    [
                        {
                            text: "OK", onPress: () => {this.setState({
                                isModalVisible: false
                            })}
                        }
                    ]
                    );
                console.log("User Added Succesfully");
            })
            .catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
                console.log(errorMessage);
            });

        }
    }

    userLogin = (emailID,password) => {
        firebase.auth().signInWithEmailAndPassword(emailID,password)
        .then((response) => {
            return alert("Login Success")
            console.log("Login Success")
            this.props.navigation.navigate("DonateBooks")
        })
        .catch(function(error){
            var errorCode = error.code
            var errorMessage = error.message
            return Alert.alert(errorMessage)
            console.log(errorMessage)
        });
    }

    showModal = () => {
        return (
            <Modal
                animationType = "fade"
                transparent = {true}
                visible = {this.state.isModalVisible}> 
                <View style = {styles.modalContainer}>
                    <ScrollView style = {{width: "100%" }}>
                        <KeyboardAvoidingView style = {styles.keyboardAvoidingView}>
                            <Text style = {styles.modalText}> Registration </Text>
                            <TextInput
                                style = {styles.formTextInput} 
                                placeholder = "First Name"
                                maxLength = {8}
                                onChangeText = {(text) => {
                                    this.setState({
                                        firstName: text, 
                                    });
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput} 
                                placeholder = "Last Name"
                                maxLength = {8}
                                onChangeText = {(text) => {
                                    this.setState({
                                        lastName: text, 
                                    });
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput} 
                                placeholder = "Contact"
                                maxLength = {10}
                                keyboardType = {"numeric"}
                                onChangeText = {(text) => {
                                    this.setState({
                                        contact: text, 
                                    });
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput} 
                                placeholder = "Address"
                                multiline = {true}
                                onChangeText = {(text) => {
                                    this.setState({
                                        address: text, 
                                    });
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput} 
                                placeholder = "abc@gmail.com"
                                keyboardType = "email-address"
                                onChangeText = {(text) => {
                                    this.setState({
                                        emailID: text, 
                                    });
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = "enter password"
                                secureTextEntry = {true}
                                onChangeText = {(text) => {
                                    this.setState({
                                        password: text, 
                                    });
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = "Confirm Password"
                                secureTextEntry = {true}
                                onChangeText = {(text) => {
                                    this.setState({
                                        confirmPassword: text, 
                                    });
                                }}
                            />
                            
                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity 
                                    style = {styles.registerButton}
                                    onPress = {() => {
                                        this.userSignUP(
                                            this.state.emailID,
                                            this.state.password,
                                            this.state.confirmPassword
                                        );
                                    }}
                                >
                                    <Text style = {styles.registerButtonText}>  
                                        Register 
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style = {styles.registerButton}
                                    onPress = {() => {
                                        this.setState({
                                            isModalVisible: false,
                                        });
                                    }}>
                                    <Text style = {styles.registerButtonText}>  
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
                
                
                
            
            </Modal>
        )
    }
    render() {
        return (
            <View style = {styles.container}>
                <View style = {{justifyContent: "center", alignItems: "center"}}>
                    <View>
                        {this.showModal()}
                    </View>
                </View>
                <View style = {styles.profileContainer}>
                    <Text style = {styles.title}> Book Santa </Text>
                </View>

                <View style = {styles.buttonContainer}>
                    <TextInput
                        style = {styles.inputBox}
                        placeholder = "abc@gmail.com"
                        keyboardType = "email-address"
                        onChangeText = {(text) => {
                            this.setState({
                                emailID: text, 
                            });
                        }}
                    />

                    <TextInput
                        style = {styles.inputBox}
                        placeholder = "enter password"
                        secureTextEntry = {true}
                        onChangeText = {(text) => {
                            this.setState({
                                password: text, 
                            });
                        }}
                    />

                    <TouchableOpacity 
                            style = {[styles.button,{marginBottom: 20,marginTop: 20}]}
                            onPress = {() => {
                                console.log(this.state.emailID + "+" +  this.state.password)
                                this.userLogin(this.state.emailID,this.state.password);
                            }}
                        >
                        
                        <Text style = {styles.buttonText}> Login </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = {() => {
                            this.setState({
                                isModalVisible: true,
                            })
                        }}>

                        <Text style = {styles.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "orange",
    },

    title: {
        fontSize: 65,
        fontWeight: "bold",
        color: "blue",
        justifyContent: "center",
    },

    buttonContainer: {
        flex: 1,
        alignItems: "center",
    },  

    inputBox: {
        width: 300,
        height: 40,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
    },

    button: {
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lime",
        borderRadius: 25, 
    },

    buttonText: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "comic sans ms",
    },

    profileContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    keyboardAvoidingView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    modalText: {
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 30,
        color: "purple",
        margin: 50,
    },
    
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 30,
        backgroundColor: "grey",
    },

    modalBackButton: {
        justifyContent: "center",
        alignSelf: "center",
    },

    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },

    registerButton: {
        width: 200,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
    },

    registerButtonText: {
        color: "pink",
        fontSize: 15,
        fontWeight: "bold",
    }
});
