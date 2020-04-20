import React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { styles } from '../styles/global';

export default function Help() {

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.body1}>Pomiar można zacząć, jeśli na czujniku świeci się zielona dioda, która oznacza że czujnik jest gotowy do mierzenia pulsu{"\n"}</Text>
        <Text style={styles.body1}>Pomiar trwa 10 sekund{"\n"}Aby poprawnie odczytać dane, umieść palec wskazujący na czujniku naciskając na niego równomiernie{"\n"}</Text>
        <Text style={styles.body1}>Jeżeli na mikro kontrolerze cały czas świeci się niebieska dioda to oznacza, że elementy są ze sobą podłączane i trwa inicjalizacja urządzenia. Jeżeli po kilku sekundach dioda nie przestanie świecić to oznacza, że występuje problem w komunikacji z routerem{"\n"}</Text>
        <Text style={styles.body1}>Jeżeli na czujniku nie świeci się zielona dioda, po zniknięciu niebieskiej diody na mikro kontrolerze oznacza to, że występuje błąd w połączeniu samego czujnika z mikro kontrolerem{"\n"}</Text>
        <Text style={styles.body1}>Podczas pomiaru zielona dioda wygasa, a na czujniku świecić będzie czerwona</Text>
      </ScrollView>
    </View>
  )
}
