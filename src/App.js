import React, { Component } from 'react';
import './App.css';
import contacts from './data/contacts.json'

class App extends Component {
  state = {
    myContacts: contacts.splice(0,5),
    contacts: contacts,
  }

  handleNewRandomContact = () => {
    const{contacts, myContacts} = this.state
    const randomIndex = Math.round(Math.random()* contacts.length - 1);
    const newContact = contacts[randomIndex]
    //Con los tres puntos hacemos un for para todos los elementos del array de la base de datos
    const newMyContacts = [...myContacts]

   newMyContacts.push(newContact)

   console.log(myContacts)
      this.setState({
        myContacts: newMyContacts
      })
  }

  deleteContact = (index) => {
    const {myContacts} = this.state
    const deleteContact = [...myContacts]
    deleteContact.splice(index,1)
    

    this.setState({
      myContacts: deleteContact
    })
  }

  handleSortByPopularity = () => {
    const {myContacts} = this.state
    const newMyContacts = [...myContacts]
    newMyContacts.sort ((a,b) => {
      return b.popularity - a.popularity
    })
    this.setState({
      myContacts: newMyContacts
    })
  }

  handleSortByName = () => {
    const {myContacts} = this.state
    const newMyContacts = [...myContacts]
    newMyContacts.sort((a,b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
    this.setState({
      myContacts: newMyContacts
    })
  }

  render() {
    
    return (
      <div className="App">

        <h1>IronContacts</h1>

        <button onClick = {this.handleNewRandomContact}>Add random contact</button>
        <button onClick = {this.handleSortByPopularity}>Sort by popularity</button>
        <button onClick = {this.handleSortByName}>Sort by name</button>

   <table>
    <thead>
        <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
        </tr>
    </thead>
    <tbody>
      {
        this.state.myContacts.map((contact, index) => {
          return (
        <tr key={index}>
            <td><img src={contact.pictureUrl } alt={contact.name} /></td>
            <td><p>{contact.name}</p></td>
            <td><p>{contact.popularity}</p></td>
            <td><button onClick = {() => {this.deleteContact(index)}}>Delete</button></td>
        </tr>
        )
        })
      }
    </tbody>
</table>
       
      </div>
    );
  }
}

export default App;
