import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from "react-native";
import React, {useState} from 'react'
import {Participant} from '../../components/Participant'


import { styles } from "./style";

export default function Home() {
  const [participants, setParticipants] = useState([])
  const [partipantName, SetPartipantName] = useState('')


  function handleParticipantAdd() {
    if(participants.includes(partipantName)) {
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
    }

    setParticipants((prevState) => [...prevState, partipantName])
    SetPartipantName('')
  }

  function handleParticipantRemove(name) {
    Alert.alert("Remover", `Tem certeza que deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter((participant) => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])

  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome dos participantes
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={(e) => (SetPartipantName(e))}
          value={partipantName}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
        <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant
          key={item}
          name={item}
          onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de produtos.
          </Text>
        )}
        />

    </View>
  )
}