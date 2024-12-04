import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const Update_page = () => {
  const [hasError, setHasError] = useState(false);
  const webViewRef = useRef(null);

  const reloadWebView = () => {
    setHasError(false);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <View style={styles.container}>
      {hasError ? (
        // Display error message and refresh button
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>لايوجد اتصال بالجهاز</Text>
          <TouchableOpacity onPress={reloadWebView} style={styles.button}>
            <Text style={styles.buttonText}>إعادة المحاولة</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Display the WebView
        <WebView
          source={{ uri: 'http://2.2.2.2/update_app' }}
          style={styles.webview}
          onError={() => setHasError(true)}
          ref={webViewRef}
          startInLoadingState={true}
          renderError={() => null} // Prevent showing the default error view
        />
      )}
    </View>
  );
};

export default Update_page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'red',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});