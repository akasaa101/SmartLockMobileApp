import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  text: {
    alignSelf: 'baseline',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 12,
  },
  title: {
    color: '#3D1273',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    alignSelf: 'center',
  },
  subText: {
    color: '#FFF',
    fontSize: 12,
    alignSelf: 'center',
  },
  input: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(30, 31, 32, 0.25)',
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  button: {
    width: '95%',
    paddingVertical: 14,
    backgroundColor: '#3D1273',
    borderRadius: 16,
    alignSelf: 'center',
  },
  signup: {
    fontWeight: '700',
    color: '#00F0FF',
    fontSize: 14,
    borderBottomColor: '#00F0FF',
    paddingBottom: 1,
    borderBottomWidth: 1,
  },
});
