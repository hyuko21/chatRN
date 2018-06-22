
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Message = (props) => {
  return (
    <View style={styles.container}>
      <View>
        {props.author && <Text style={styles.author}>{props.author}</Text>}
        <Text style={styles.body}>{props.body}</Text>
      </View>
      <Text style={styles.time}>{props.time}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 3,
    flexDirection: 'row',
    marginTop: 3,
    marginRight: 10,
    marginLeft: 10,
  },
  author: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  body: {
    margin: 5,
    marginRight: 15,
    fontSize: 16,
  },
  time: {
    flex: 1,
    marginRight: 5,
    textAlign: 'right',
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#333',
  },
});
