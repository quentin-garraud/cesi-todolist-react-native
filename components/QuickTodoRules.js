import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import call from 'react-native-phone-call';
import Communications from 'react-native-communications'

function contains(propsTitle, value) {
  let title = propsTitle.toLowerCase();
  if (title.includes(value)) {
    return value;
  }
}

function _call() {
  const args = {
    number: '0606060606',
    prompt: true,
  };
  Communications.phonecall(args.number, args.prompt)
}

function _sms(){
    const args = {
    number: '0606060606',
    prompt: true,
  };
  Communications.text(args.number, "HelloWorld")
}

function _email(){
    const args = {
    to: "",
    cc: "",
    cci: "",
    subject: "",
    body: ""
  };
  Communications.email(args.to,args.cc,args.cci,args.subject,args.body)
}

export function buttonName(title) {
  let button;
  console.log(title);

  if (contains(title, 'appeler')) {
    button = (
      <Button
        buttonStyle={{ borderRadius: 10 }}
        icon={{
          name: 'call',
          size: 15,
          color: 'white',
        }}
        style={styles.button}
        title="Appeler"
        onPress={() => _call()}
      />
    );
  } else if (contains(title, 'sms')) {
    button = (
      <Button
        icon={{
          name: 'message',
          size: 15,
          color: 'white',
        }}
        buttonStyle={{ borderRadius: 10 }}
        style={styles.button}
        title="Envoyer un SMS"
        onPress={() => _sms()}
      />
    );
  } else if (contains(title, 'email')) {
    button = (
      <Button
        icon={{
          name: 'mail',
          size: 15,
          color: 'white',
        }}
        style={styles.button}
        buttonStyle={{ borderRadius: 10 }}
        title="Envoyer un mail"
        onPress={()=> _email()}
      />
    );
  }
  return button;
}
const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});
