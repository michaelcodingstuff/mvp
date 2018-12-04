import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image,
  asset,
  Environment,
  NativeModules,
} from 'react-360';
const { AudioModule } = NativeModules;

export default class mvp extends React.Component {
  state = {
    videos: [
      {name: 'Jordan Peterson', id: 1, image: 'jp.jpg', bg: '360_beach.jpg', audio: 'test.mp3'},
      {name: 'Some Other Guy', id: 2, image: 'sb.jpg', bg: '360_night.jpg', audio: 'what.mp3'},
    ],
    currentBackground: '',
  }

  changeBackground(url, audio) {
    // you can set where audio plays from spatially
    console.log('Audiolink', audio);
    AudioModule.playEnvironmental({
      source: asset(audio),
      volume: 0.7,
      loop: false,
    });
    Environment.setBackgroundImage(
      asset(url),
    );
  }

  stopPlay() {
    AudioModule.stopEnvironmental();
  }

  render() {
    return (
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {' Items: '+this.state.videos.length}
          </Text>
          <VrButton style={styles.stop} onClick={this.stopPlay}>
            <Text style={styles.button}>X</Text>
          </VrButton>
          {this.state.videos.map((episode) => (
            <VrButton key={episode.id} onClick={()=>{
              this.changeBackground(episode.bg, episode.audio);
            }}>
            <Text style={styles.item}>
              {episode.name}
            </Text>
            <Image style={styles.author} source={asset(episode.image)}></Image>
            </VrButton>
          ))}
        </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
  },
  stop: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#00000000',
    borderColor: '#639dda',
    borderWidth: 2,
    height: 800,
  },
  greeting: {
    fontSize: 30,
  },
  item: {
    padding: 5,
    fontSize: 25,
  },
  author: {
    width: 200,
    height: 150,
  }
});

AppRegistry.registerComponent('mvp', () => mvp);
