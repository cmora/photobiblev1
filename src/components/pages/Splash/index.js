import React from 'react';
import { StyleSheet, Text, View, Image, Animated, ImageBackground, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { STYLES } from '../../../styles';
import { Verses } from '../../../data/Verses';
const LOGO = require('../../../../assets/images/logo.png');
const BG = require('../../../../assets/images/splash-bg.png');

class Splash extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    logoPosition: new Animated.Value(60),
    logoFade: new Animated.Value(0),
    boxFade: new Animated.Value(0),
    textFade: new Animated.Value(0),
    boxPos0: new Animated.Value(50),
    boxPos1: new Animated.Value(50),
    boxPos2: new Animated.Value(50),
    boxPos3: new Animated.Value(50),
    boxPos4: new Animated.Value(50),
    boxPos5: new Animated.Value(50),
    boxPos6: new Animated.Value(50),
    boxPos7: new Animated.Value(50),
    boxPos8: new Animated.Value(50),
    boxPos9: new Animated.Value(50),
  }

  componentDidMount() {
    this.animateLogo();
  }

  animateLogo = () => {
    Animated.timing(
      this.state.logoPosition,
      {
        toValue: 0,
        duration: 600,
      }
    ).start();
    Animated.timing(
      this.state.logoFade,
      {
        toValue: 1,
        duration: 600,
      }
    ).start(this.animateBacg);
  }

  animateBacg = () => {
    Animated.timing(
      this.state.boxFade,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start(this.animateTexts);
  }

  animateTexts = () => {
    Animated.timing(
      this.state.textFade,
      {
        toValue: 1,
        duration: 1500,
      }
    ).start();
    Verses.map((item, index) => {
      const pos = this.state[`boxPos${index}`];
      Animated.timing(
        pos,
        {
          toValue: Math.floor(-Math.random() * 100),
          duration: 10000,
        }
      ).start();
    });
    setTimeout(() => {
      const { navigate } = this.props.navigation;
      navigate('Home');
    }, 6000);
  }

  renderVerse = (item, index) => {
    const { textFade } = this.state;
    const pos = this.state[`boxPos${index}`];
    return (
      <Animated.View
        style={[
          styles.verseBox,
          styles[`verseBox${index}`],
          {
            opacity: textFade,
            transform: [{
              translateY: pos,
            }],
          }
        ]}
        key={item.id}
      >
        <Text style={styles.verseText}>{item.text}</Text>
        <Text style={styles.verseVerse}>{item.verse}</Text>
      </Animated.View>
    );
  };

  render() {
    const { logoPosition, logoFade, boxFade } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG} style={styles.bg} />
        {Verses && Verses.map((item, index) => this.renderVerse(item, index))}
        <View style={styles.wrap}>
          <Animated.View
            style={[
              styles.box,
              { opacity: boxFade }
            ]}
          >
            <LinearGradient
              colors={['#5945dc', '#047adc', '#04a0c1', '#09a29e', '#daee69']}
              style={styles.boxLine1}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
            <View style={styles.boxLine2} />
            <LinearGradient
              colors={['#5945dc', '#047adc', '#04a0c1', '#09a29e', '#daee69']}
              style={styles.boxLine3}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
            <View style={styles.boxLine4} />
          </Animated.View>
          <Image
            source={LOGO}
            style={styles.logo}
          />
          <Animated.View
            style={{
              opacity: logoFade,
              transform: [{
                translateY: logoPosition,
              }],
            }}
          >
            <View style={styles.textContainer}>
              <LinearGradient
                colors={['#5945dc', '#047adc', '#04a0c1', '#09a29e', '#daee69']}
                style={styles.linearGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              />
              <Text style={styles.text}>Cada imagen de tu vida con una <Text style={styles.green}>palabra de Dios.</Text></Text>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: STYLES.color.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    padding: 20,
    position: 'relative',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  logo: {
    width: 180,
    height: 124,
  },  
  textContainer: {
    marginTop: 20,
    width: 180,
  },
  text: {
    fontSize: 14,
    color: '#b4b4b4',
    fontFamily: STYLES.fonts.montserrat,
  },
  green: {
    color: STYLES.color.primary,
  },
  linearGradient: {
    height: 1,
    marginBottom: 15,
  },
  boxLine1: {
    height: 1,
    backgroundColor: 'blue',
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  boxLine2: {
    width: 1,
    backgroundColor: 'blue',
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 0,
    backgroundColor: '#daee69',
  },
  boxLine3: {
    height: 1,
    backgroundColor: 'blue',
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  boxLine4: {
    width: 1,
    backgroundColor: 'blue',
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    backgroundColor: '#5945dc',
  },
  verseBox: {
    opacity: 0.4,
    position: 'absolute',
  },
  verseText: {
    fontSize: 7,
    color: '#b4b4b4',
  },
  verseVerse: {
    fontSize: 7,
    color: '#b4b4b4',
    marginTop: 2,
  },
  verseBox0: {
    top: 80,
    left: 20,
    width: 150,
  },
  verseBox1: {
    top: 40,
    right: 40,
    width: 110,
  },
  verseBox2: {
    top: 120,
    right: 20,
    width: 160,
  },
  verseBox3: {
    top: 160,
    left: 20,
    width: 150,
  },
  verseBox4: {
    top: 200,
    right: 25,
    width: 180,
  },
  verseBox5: {
    bottom: 200,
    right: 25,
    width: 180,
  },
  verseBox6: {
    bottom: 60,
    left: 50,
    width: 100,
  },
  verseBox7: {
    bottom: 150,
    left: 20,
    width: 150,
  },
  verseBox8: {
    bottom: 100,
    right: 50,
    width: 150,
  },
  verseBox9: {
    bottom: 30,
    right: 20,
    width: 190,
  }
});


export default Splash;