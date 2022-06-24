import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, MessageText, Time, SystemMessage } from 'react-native-gifted-chat';

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {

    const username = this.props.route.params.username;
    const textColor = this.props.route.params.textColor;

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello ' + username,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Mr.Bot',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: username + ' has entered the chat',
          createdAt: new Date(),
          system: true,
          color: textColor,
        },
      ],
    })
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
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
            _id: 1,
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