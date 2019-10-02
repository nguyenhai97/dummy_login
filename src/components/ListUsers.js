import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class Login extends Component {
    static navigationOptions = {
        title: 'Danh sách người dùng',
    };
    constructor() {
        super();
        this.state = {
            responseData: []
        }
    }
    UNSAFE_componentWillMount = async () => {
        try {
            const response = await fetch('http://192.168.43.242/list.php')
            const users = await response.json()
            this.setState({responseData: users})
        } catch (err) {
            alert('lỗi')
        }
    }
    reloadDB = async () => {
        try {
            const response = await fetch('http://192.168.43.242/list.php')
            const users = await response.json()
            this.setState({responseData: users})
        } catch (err) {
            alert('lỗi')
        }
    }
    deleteItem(itemID) {
        fetch('http://192.168.43.242/delete.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: itemID,
            }),
        })
        this.reloadDB()
    }
    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    data={this.state.responseData}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.pass}</Text>
                        </View>
                    )}
                    renderHiddenItem={({item}) => (
                        <TouchableNativeFeedback onPress={()=>this.deleteItem(item.id)}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Text style={{textAlign:'right'}}>Xóa</Text>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                    leftOpenValue={0}
                    rightOpenValue={-75}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomColor: '#000',
        borderBottomWidth: 1
    }
});