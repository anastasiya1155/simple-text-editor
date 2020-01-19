import React, { Component } from 'react';
import ControlPanel from '../control-panel/ControlPanel';
import './FileZone.css';
import SynonymsPanel from './synonyms-panel/SynonymsPanel';

class FileZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
    };
    this.textEditor = React.createRef();
  }

  applyStyle = event => {
    document.execCommand(event.currentTarget.value, false, null);
  };

  handleMouseUp = () => {
    const { getSynonyms, removeSynonyms } = this.props;
    let selection;

    if (window.getSelection) {
      selection = window.getSelection();
    } else if (document.getSelection) {
      selection = document.getSelection();
    } else if (document.selection) {
      selection = document.selection.createRange().text;
    }

    const text = selection ? selection.toString() : '';

    if (text) {
      const range = selection.getRangeAt(0);
      this.setState({ selection: [range.startOffset, range.endOffset] });
      getSynonyms(text.trim());
    } else {
      removeSynonyms();
    }
  };

  handleSynonymClick = word => {
    const { selection } = this.state;
    const { removeSynonyms } = this.props;
    if (this.textEditor.current) {
      const oldText = this.textEditor.current.textContent;
      const oldHtml = this.textEditor.current.innerHTML;
      const oldArr = [
        oldText.substring(0, selection[0]),
        oldText.substring(selection[0], selection[1]),
        oldText.substring(selection[1]),
      ];
      oldArr[1] = word;
      const newText = oldArr.join('');
      const newHtml = oldHtml.replace(oldText, newText);
      this.textEditor.current.innerHTML = newHtml;
      removeSynonyms();
    }
  };

  render() {
    const { synonyms, isLoading } = this.props;
    return (
      <React.Fragment>
        <ControlPanel applyStyle={this.applyStyle} />
        <SynonymsPanel
          words={synonyms}
          handleSynonymClick={this.handleSynonymClick}
          isLoading={isLoading}
        />
        <div id="file-zone">
          <div
            id="file"
            ref={this.textEditor}
            contentEditable="true"
            onMouseUp={this.handleMouseUp}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default FileZone;
