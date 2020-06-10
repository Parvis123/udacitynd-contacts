import React, { Component } from "react";
import ListContacts from "./components/ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({
        contacts: contacts,
      });
    });
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((contactToBeDeleted) => {
        return contactToBeDeleted.id !== contact.id;
      }),
    }));
    ContactsAPI.remove(contact);
  };

  createContact = (contact) => {
    ContactsAPI.create(contact).then(() => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact]),
      }));
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path='/'
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />

        <Route
          path='/create'
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
