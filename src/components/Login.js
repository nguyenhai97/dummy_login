import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        title: 'Đăng nhập',
    };
    constructor() {
        super();
        this.state = {
          email: '',
          passwd: '',
        };
    }
    login() {
        fetch('http://192.168.43.242/login.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.passwd,
            }),
        }).then(response => {
            if (response.status === 200) {
                this.props.navigation.navigate('ListUsers');
            } else if(response.status === 301) {
                alert('User da ton tai');
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Email</Text>
                <TextInput
                    onChangeText={value => this.setState({email: value})}
                    value={this.state.email}
                    style={styles.input}/>
                <Text>Password</Text>
                <TextInput
                    onChangeText={value => this.setState({passwd: value})}
                    value={this.state.passwd}
                    secureTextEntry={true}
                    style={styles.input}/>
                <Button onPress={() => this.login()} title="Đăng nhập"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
    }
});