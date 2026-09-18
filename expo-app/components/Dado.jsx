import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Dado = ({ valor }) => {
  // Em React Native, imagens locais precisam ser requeridas estaticamente
  let imageSource;
  switch (valor) {
    case 1:
      imageSource = require('../assets/dados/dado1.png');
      break;
    case 2:
      imageSource = require('../assets/dados/dado2.png');
      break;
    case 3:
      imageSource = require('../assets/dados/dado3.png');
      break;
    case 4:
      imageSource = require('../assets/dados/dado4.png');
      break;
    case 5:
      imageSource = require('../assets/dados/dado5.png');
      break;
    case 6:
      imageSource = require('../assets/dados/dado6.png');
      break;
    default:
      imageSource = require('../assets/dados/dado1.png');
  }

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 2,
  },
  image: {
    width: 70,
    height: 70,
  },
});

export default Dado;
