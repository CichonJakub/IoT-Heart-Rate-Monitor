import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
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
  },
  inRow: {
    flexDirection: 'row',
  },
  h4: {
    fontFamily: 'rubik-regular',
    fontSize: 35,
  },
  h5: {
    fontFamily: 'rubik-regular',
    fontSize: 24,
    textAlign: 'center',
  },
  s1: {
    fontFamily: 'rubik-regular',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  body1: {
    fontFamily: 'rubik-regular',
    fontSize: 16,
  },
  body1: {
    fontFamily: 'rubik-regular',
    fontSize: 14,
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 70,
  },
  loadingIconContainer: {
    flex: 1,
    paddingTop: 120,
    //backgroundColor: 'pink',
  },
  resultContainer: {
    flex: 1,
    paddingTop: 60,
    //backgroundColor: 'pink',
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
  tmp: {
    position: 'absolute',
    bottom: 30,
  },
  sidebarContainer: {
    flex: 1,
    width: 256,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },
  sidebarHeader: {
    backgroundColor: '#5d99c6',
    borderTopRightRadius: 18,
    height: 24,
    width: 256,
  },
  sidebarLogo: {
    width: Dimensions.get('screen').width*0.3,
    height: 130,
  },
  sidebarDivider: {
    height:1,
    width:"100%",
    backgroundColor:"rgba(0, 0, 0, 0.12)",
    marginVertical: 20,
  },
  sidebarListItem: {
    flexDirection: 'row',
    height: 48,
    paddingLeft: 16,
  },
  icon: {
    paddingRight: 14,
  },
})
