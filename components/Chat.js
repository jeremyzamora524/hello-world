import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, MessageText, Time } from 'react-native-gifted-chat';

import * as firebase from 'firebase';
import "firebase/firestore";

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        username: '',
        avatar: '',
      }
    }

    const firebaseConfig = {
      apiKey: "AIzaSyC7RNSAThKSNVMngCOBku3SzaDo1TRSH48",
      authDomain: "chatapp-2e1ca.firebaseapp.com",
      projectId: "chatapp-2e1ca",
      storageBucket: "chatapp-2e1ca.appspot.com",
      messagingSenderId: "395605782842",
      appId: "1:395605782842:web:a4d7c0d7afac7218886003",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // references the collection to query its documents
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.referenceMessagesUser = null;

  }

  onCollectionUpdate = QuerySnapshot => {
    const messages = [];
    // go through each document
    QuerySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  componentDidMount() {

    const username = this.props.route.params.username;

    this.referenceChatMessages = firebase.firestore().collection('messages');

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          username: username,
          avatar: "https://placeimg.com/140/140/any"
        },
      });
      // create a reference to the active user's documents (messages)
      this.referenceMessagesUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);

      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });

  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  addMessage() {

    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  renderBubble(props) {
    const textColor = this.props.route.params.textColor;
    const bubbleColor = this.props.route.params.bubbleColor;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: bubbleColor,
          }
        }}
        renderMessageText={(props) => {
          return (
            <MessageText
              {...props}
              textStyle={{
                right: { color: textColor },
              }}
            />
          );
        }}
        renderTime={(props) => {
          return (
            <Time
              {...props}
              timeTextStyle={{
                right: {
                  color: textColor,
                },
              }}
            />
          );
        }}
      />
    )
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
    });
  }

  render() {
    let { username, bgColor } = this.props.route.params;

    this.props.navigation.setOptions({ title: username });

    return (

      <View style={[{ backgroundColor: bgColor }, styles.container]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            username: this.state.username,
            avatar: this.state.user.avatar
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
        }
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 