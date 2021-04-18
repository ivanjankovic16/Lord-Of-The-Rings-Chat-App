import React from "react";
import { Poruke, Input } from "./components/index";

import './App.css';

function nasumicnoIme() {
  const names = [
    "Aldaron", "Aragorn", "Arathorn", "Arda", "Arwen", "Beorn", "Beren", "Bilbo", "Celeborn", "Durin", "Eärendil", "Elanor", "Elendil", "Elessar", "Éomer", "Éowyn", "Faramir", "Frodo", "Galadriel", "Lórien", "Lúthien", "Meriadoc", "Saruman", "Sauron", "Peregrin", "Samwise", "Varda"
  ];
  const nicknames = [
    "Halfelven", "Oakenshield", "Baggins", "theBowman", "Noldorin", "StewardOfGondor", "Numenorean", "Dunedain", "WitchKing", "King", "TheRingBearer", "LoyalCompanion", "WormTongue", "DarkLord", "theWise", "Elvenking", "Hero", "Orc", "SpawnOfUngoliant", "theFoul", "theFair", "PrinceOfDolAmroth", "Took", "ProudFeet", "theOneRing", "Ranger", "Noldor"
  ];
  const name = names[Math.floor(Math.random() * names.length)];
  const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
  return name + " " + nickname;
}

function nasumicnaBoja() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends React.Component {
  state = {
    messages: [],
    member: {
      username: nasumicnoIme(),
      color: nasumicnaBoja(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("lxTuqv1tjO6sNRDe", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Lord Of The Rings Chat App</h1>
        </div>
        <Poruke messages={this.state.messages} currentMember={this.state.member} />
        <Input onSendMessage={this.onSlanjePoruke} />
      </div>
    );
  }

  onSlanjePoruke = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;