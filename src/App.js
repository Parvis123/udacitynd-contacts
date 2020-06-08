import React, { Component } from 'react';
import ListContacts from './components/ListContacts';
import * as ContacsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: 
    [  

    ]
  }

  componentDidMount(){
    ContacsAPI.getAll()
      .then((contacts) => {
        this.setState({
          contacts:contacts
        })
      })
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((contactToBeDeleted) => {
        return contactToBeDeleted.id !== contact.id
      })
    }))
    ContacsAPI.remove(contact)
  }
  render() {
    return (
      <div>
        <ListContacts 
        contacts={this.state.contacts} 
        onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
