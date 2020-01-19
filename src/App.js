import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import FileZone from './file-zone/FileZone';
import getMockText from './text.service';

class App extends Component {
  state = {
    synonyms: null,
    isLoading: false,
  };

  getText() {
    getMockText().then(result => {
      console.log(result);
    });
  }

  getSynonyms = word => {
    this.setState({ isLoading: true });
    axios
      .get(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then(res => this.setState({ synonyms: res.data.map(s => s.word), isLoading: false }));
  };

  removeSynonyms = () => {
    this.setState({ synonyms: null });
  };

  render() {
    const { synonyms, isLoading } = this.state;
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <FileZone
            getSynonyms={this.getSynonyms}
            synonyms={synonyms}
            isLoading={isLoading}
            removeSynonyms={this.removeSynonyms}
          />
        </main>
      </div>
    );
  }
}

export default App;
