import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import ControlPanel from './ControlPanel';
import SynonymsPanel from './SynonymsPanel';
import ContentEditable from './ContentEditable';
import './EditZone.css';

class FileZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  applyStyle = (event) => {
    if (document.queryCommandSupported(event.currentTarget.value)) {
      document.execCommand(event.currentTarget.value, false, null);
    }
  };

  handleMouseUp = () => {
    const { getSynonyms, removeSynonyms } = this.props;

    const selection = getSelection();
    const text = selection ? selection.toString() : '';

    if (text) {
      getSynonyms(text.trim());
    } else {
      removeSynonyms();
    }
  };

  handleSynonymClick = (word) => {
    const { removeSynonyms } = this.props;
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, word);
    } else {
      const range = document.selection.createRange();
      range.deleteContents();
      range.insertNode(document.createTextNode(word));
    }
    removeSynonyms();
  };

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  render() {
    const { synonyms, isLoading } = this.props;
    const { content } = this.state;
    return (
      <React.Fragment>
        <ControlPanel applyStyle={this.applyStyle} />
        <SynonymsPanel
          words={synonyms}
          handleSynonymClick={this.handleSynonymClick}
          isLoading={isLoading}
        />
        <div className="edit-zone">
          <ContentEditable
            value={content}
            onChange={this.handleChange}
            onMouseUp={this.handleMouseUp}
          />
        </div>
      </React.Fragment>
    );
  }
}

FileZone.propTypes = {
  synonyms: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  getSynonyms: PropTypes.func.isRequired,
  removeSynonyms: PropTypes.func.isRequired,
};

FileZone.defaultProps = {
  synonyms: [],
  isLoading: false,
};

export default FileZone;
