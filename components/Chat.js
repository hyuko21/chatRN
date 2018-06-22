
import React, { Component } from 'react';
import { 
  Text,
  TextInput, 
  View, 
  StyleSheet,
  KeyboardAvoidingView,
  FlatList, 
  TouchableOpacity,
} from 'react-native';

import Message from './Message';

import firebase from 'react-native-firebase';

export default class Chat extends Component {
  state = {
    text: '',
    messages: [],
  };
  
  sendMessage = () => {
    if (!this.state.text) return;
    
    const newMessage = {
      author: 'victor',
      body: this.state.text,
      time: new Date().toLocaleTimeString('pt-br').substr(0, 5),
    };

    this.setState({ text: '' });
    
    firebase.database().ref().push(newMessage);
  }
  
  renderMessage = ({ item }) => (
    <Message
      author={item.author} 
      body={item.body} 
      time={item.time}
    />
  );

  pushMessage = (message) => {
    this.setState({ 
      messages: [
        message,
        ...this.state.messages,
      ],
    });
  }

  deleteMessage = (id) => {
    this.state.messages.some((message, index) => {
      if (message.id === id) {
        this.setState({ 
          messages: [
            ...this.state.messages.slice(0, index),
            ...this.state.messages.slice(index + 1),
          ],
        });
        return true;
      }
      return false;
    });
  }

  componentDidMount = () => {
    firebase.database().ref().on('child_added', snap => {
      this.pushMessage({ id: snap.key, ...snap.val() });
    });
    firebase.database().ref().on('child_removed', snap => {
      this.deleteMessage(snap.key);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
        <FlatList 
          inverted
          style={styles.chat}
          data={this.state.messages}
          keyExtractor={item => item.id}
          renderItem={this.renderMessage}
        />
        <View style={styles.footer}>
          <TextInput 
            style={styles.input}
            value={this.state.text}
            placeholder='Type a message'
            placeholderTextColor='#666'
            returnKeyType='send'
            onChangeText={value => this.setState({ text: value })}
            onSubmitEditing={this.sendMessage}
            blurOnSubmit={false}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  chat: {
    backgroundColor: '#ddd',
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#bbb',
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
