import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  txt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 100,
  },
  resultButtons: {
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
  }
})
