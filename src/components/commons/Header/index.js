import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Logotitle from '../Logotitle/'
import { STYLES } from '../../../styles';

const Header = ({
  title,
}) => {
	if (!title) return null;
	
  return (
    <View style={styles.container}>
      <Logotitle title="PHOTOBIBLE" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, 
	}
});

