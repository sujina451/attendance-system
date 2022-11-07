import React, { Component } from "react";
import { Button, Text } from "react-native-elements";
import {
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard
} from "react-native";
import { logo_image, login_image } from "../assets/images";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../mobile/Style";
import { colors, width, height } from "../mobile/Theme";
import { login } from "../services";
import { connect, Dispatch } from "react-redux";
import { signin } from "../Storage/action";
import * as ApiStatus from "../helper/ApiStatus";
import { toastMessage } from "../helper/function";
import Spinner from 'react-native-loading-spinner-overlay';



class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      secureTextEntry: true,
      iconName: "eye",
      isLoading: true,
      errors:{
        email: null,
        password: null
      },
    };
  }

  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  componentDidMount() {
    this.checkLogin();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLogged != this.props.isLogged) {
      this.checkLogin();
    }
  }

  checkLogin() {
    if (this.props.isLogged) {
      this.props.navigation.navigate("Dashboard");
    }
  }


  
  signin = () => {
    this.setState({
      isLoading: true
    })
    const { userEmail, userPassword } = this.state;
      const data = {
        email: userEmail,
        password: userPassword,
      };
      login(data).then((response) => {
        this.setState({
          isLoading: false,
        })
        console.log(response);
        if (response.code == ApiStatus.SUCCESS) {
          this.props.dispatch(signin(response.data));
          toastMessage("success", response.message);
          this.props.navigation.navigate("Dashboard");
        } else {
          let errors={
            email:null,
            password:null
          }
          if(response.data){
            errors={
              email:response.data.errors.email,
              password:response.data.errors.password
            }
          }
          else{
            toastMessage('error',"Inavlid Crediantials")   
          }
          this.setState({
            errors
          })
              
        }
      });
  };

  passwordViewIcon = () => {
    let iconName = this.state.secureTextEntry ? "eye-slash" : "eye";

    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      iconName: iconName,
    });
  };

  render() {
    return (
      <>
      <View style={styles.loader}>
        <Spinner
          visible={this.state.isLoading}
        />
        </View>
       <View style={{flex:1}}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={loginstyles.loginMainWrap}>
              <Image style={loginstyles.loginTopImg} source={login_image} />

              <View style={loginstyles.loginBoxWrap}>
                <Image style={loginstyles.devopsLogo} source={logo_image} />
                <Text style={loginstyles.loginTitle}>Login:</Text>
                <TextInput
                  onChangeText={(userEmail) => this.setState({ userEmail })}
                  placeholder="Email Address"
                  placeholderTextColor="#9a9a9a"
                  style={loginstyles.loginInput}
                  autoCapitalize = 'none'
                />
                { this.state.errors.email != null && (
                  <Text style={loginstyles.errorMessage}>
                    * {this.state.errors.email}
                  </Text>
                )}
                <View style={loginstyles.passwordBoxWrap}>
                  <TextInput
                    {...this.props}
                    onChangeText={(userPassword) =>
                      this.setState({ userPassword })
                    }
                    placeholder="Password"
                    secureTextEntry={this.state.secureTextEntry}
                    placeholderTextColor="#9a9a9a"
                    style={loginstyles.passwordInput}
                    autoCapitalize = 'none'
                  />
                  <TouchableOpacity
                    style={loginstyles.eyeBtn}
                    onPress={this.passwordViewIcon}
                  >
                    <Icon
                      style={loginstyles.eyeIcon}
                      name={this.state.iconName}
                    />
                  </TouchableOpacity>
                  { this.state.errors.password != null && (
                  <Text style={loginstyles.errorMessage}>
                    * {this.state.errors.password}
                  </Text>
                )}
                </View>

                <TouchableOpacity
                  onPress={this.signin}
                  style={{ alignSelf: "flex-end" }}>
                  <Icon name="chevron-right" style={loginstyles.loginIcon} />
                </TouchableOpacity>
              </View>

              <View style={loginstyles.loginBottom}>
                <Text style={loginstyles.loginBottomText}>
                  Powered by {"\n"}Devops Technology Pvt.Ltd
                </Text>
              </View>
            </View>
       
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </View>
      </>
    );
  }
}
function mapStateProps(state) {
  return {
    isLogged: state.isLogged,
  };
}

const Login = connect(mapStateProps)(LoginComponent);

export { Login };

const loginstyles = StyleSheet.create({
  
  loginMainWrap: {
    flex: 0,
    backgroundColor: colors.body_background,
    flexDirection: "column",
    justifyContent:'center',
    alignItems:'center'
  },
  loginTopImg: {
   flex:0,
    width: "100%",
    height: 250,
    overflow: "hidden",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    
  },
  loginBoxWrap: {
    width: width * 0.85,
    backgroundColor: colors.color_white,
    paddingHorizontal: 20,
    height: height * 0.78,
    borderRadius: 40,
    shadowColor: colors.color_black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "center",
    alignSelf:'center',
    flex:0,
    marginTop:-150

  },
  devopsLogo: {
    width: 200,
    height: 150,
    resizeMode: "contain",
    marginTop: 0,
    marginBottom: 30,
    borderRadius: 10,
    padding: 0,
    alignSelf: "center",
  },
  loginTitle: {
    fontSize: 32,
    marginTop: 10,
    color: "#333",
    width: "100%",
    fontFamily: "Nunito-Bold",
  },
  loginInput: {
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: colors.input_background,
    color: colors.input_text,
    fontFamily: "Nunito-Regular",
    borderRadius: 10,
  },
  passwordBoxWrap: {
    width: "100%",
    height: 50,
    backgroundColor: colors.input_background,
    display: "flex",
    borderRadius: 10,
    position: "relative",
    marginVertical:10
  },
  eyeBtn: {
    position: "absolute",
    right: 15,
    top: 18,
  },
  eyeIcon: {
    fontSize: 15,
    color: colors.input_text,
    opacity: 0.3,
  },
  passwordInput: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    fontFamily: "Nunito-Regular",
    
  },
  loginIcon: {
    color: colors.color_white,
    fontSize: 30,
    backgroundColor: colors.secondary_color,
    padding: 15,
    paddingLeft: 20,
    width: 60,
    height: 60,
    textAlign: "center",
    borderRadius: 60 / 2,
    overflow: "hidden",
    marginTop: 25,
    textAlignVertical: "center",
  },
  loginBottom: {
    flex:0,
    justifyContent:'center',
    width:'100%',
    height: height * 0.15,
    
  },
  loginBottomText: {
    color: colors.footer_text,
    fontSize: 12,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 8,
    color: "red",
    marginVertical: 5,
    fontFamily: "Comfortaa-Regular",
 }
});
