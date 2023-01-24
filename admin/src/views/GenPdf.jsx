import {
  Document,
  Font,
  Page,
  Text,
  Image,
  StyleSheet,
} from '@react-18-pdf/renderer';
import logo from './../assets/images/logo.png'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export const GenPdf = () => {
  <Document>
    <Page style={styles.body} wrap>
      <Text style={styles.header} fixed>
      ~ Created with react-pdf ~
      </Text>
      <Text style={styles.title}>Contrat Aéroport</Text>
      <Image
        style={styles.image}
        src={logo}
      />
    </Page>  
  </Document>
}
