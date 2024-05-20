import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appleAuth} from '@invertase/react-native-apple-authentication';

const App = () => {
  const [loginData, setLoginData] = useState();
  const logInWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    setLoginData(appleAuthRequestResponse);
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log('credentialState>>>>>>>', credentialState);
    }
  };
  console.log('loginData', loginData);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logInWithApple()} style={styles.butBody}>
        <Text style={styles.butText}>Apple Login</Text>
      </TouchableOpacity>
      <Text style={styles.butText}>Email :- {loginData?.email}</Text>
      <Text style={styles.butText}>
        Name :- {loginData?.fullName?.givenName}
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  butBody: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  butText: {
    color: '#fff',
    fontSize: 20,
  },
});
