import React from 'react';
import { Alert, Linking } from 'react-native';

export default function checkAndUpdate(appVersion, serverVersion) {
  if (compareVersions(appVersion, serverVersion) < 0) {
    confirmUpdate();
  }

  function compareVersions(a, b) {
    const pa = a.split('.');
    const pb = b.split('.');
    
    for (let i = 0; i < 3; i++) {
      const na = Number(pa[i]);
      const nb = Number(pb[i]);

      if (na > nb) return 1;
      if (nb > na) return -1;
      if (!isNaN(na) && isNaN(nb)) return 1;
      if (isNaN(na) && !isNaN(nb)) return -1;
    }

    return 0;
  }

  function confirmUpdate() {
    Alert.alert(
      'تحديث متوفر',
      'هناك نسخة أحدث متوفرة من التطبيق،هل تريد تحميلها الآن؟',
      [
        {
          text: 'ليس الآن',
          onPress: () => console.log('Update canceled'),
          style: 'cancel',
        },
        {
          text: 'تحميل',
          onPress: () => openDownloadPage(),
        },
      ],
      { cancelable: false }
    );
  }

  function openDownloadPage() {
    const url = 'https://acsd.hyantalm.com/download_1/';
    Linking.openURL(url)
      .catch(err => console.error('An error occurred: ', err));
  }
}
