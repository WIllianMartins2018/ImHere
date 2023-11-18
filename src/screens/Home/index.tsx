import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from './styles';
import Participant from "../../components/Participant";
import { useState } from "react";
import { day, dayOfWeek, month, months, week, year } from "../../util/util";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState<string>('');

  function handleParticipantAdd() {
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Deseja Remover o Participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () =>{ Alert.alert("Deletado"); setParticipants(prevState => prevState.filter(participant => participant !== name));}
      },
      {
       text: 'Não',
       style: 'cancel'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        
        Nome do Evento
      </Text>

      <Text style={styles.eventDate}>
        {week[dayOfWeek]}, {day} de {months[month]} de {year}
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6B6B6B"
          cursorColor="#FFF"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map((participant, index) => (
            <Participant
              name={participant}
              key={index}
              onRemove={() => handleParticipantRemove(participant)}
            />
          ))
        }
      </ScrollView>

      {/* Outra maneira de fazer Scrool
       <FlatList
        data={participans}
        keyExtractor={item => item}
        renderItem={({ item}) => (
          <Participant
            name={item }
            key={item }
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
      /> */}

    </View>
  );
}