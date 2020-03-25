import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: '#90caf9',
    //justifyContent: 'center',
  },
  logoContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    width: Dimensions.get('screen').width*0.5,
    height: 200,
  },
  logoText: {
    fontFamily: 'rubik-regular',
    fontSize: 16,
  },
  loginScreen: {
    flex: 1,
    backgroundColor: '#90caf9',
    alignItems: 'center',
    paddingTop: 10,
    //justifyContent: 'center',
  },
  inRow: {
    flexDirection: 'row',
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
  },
  input: {
    width: Dimensions.get('screen').width*0.6,
    borderBottomWidth: 1,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    borderColor: 'rgba(0, 0, 0, 0.42)',
    paddingLeft: 15,
    padding: 5,
    margin: 5,
    fontFamily: 'rubik-regular',
    fontSize: 16,
    color: '#000',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  registerText: {
    marginTop: 12,
    fontFamily: 'rubik-regular',
    fontSize: 14,
  },
})
