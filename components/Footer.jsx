import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text>
        <Link href="/PrivacyPolicy" style={styles.link}>Política de Privacidad</Link> |{' '}
        <Link href="/TermsOfUse" style={styles.link}>Términos de Uso</Link> |{' '}
        <Link href="/FAQPage" style={styles.link}>FAQs</Link>
      </Text>
      <Text>© 2025 Oak Tree C.A.</Text>
      <Text>Todos los derechos reservados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
