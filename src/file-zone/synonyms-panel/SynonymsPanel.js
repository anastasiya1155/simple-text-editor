import React from 'react';
import './SynonymsPanel.css';

const SynonymsPanel = ({ words, handleSynonymClick, isLoading }) => {
    let content = '';
    if (isLoading) {
        content = 'Fetching synonyms...';
    } else if (words && words.length === 0) {
        content = 'Sorry, no synonyms found';
    } else if (!words) {
        content = 'Select a word to search for synonyms';
    } else {
        content = words.map(w => (
          <button key={w} onClick={() => handleSynonymClick(w)}>
              {w}
          </button>
        ));
    }

    return (
      <div className="synonym-panel">
          <div className="synonyms">{content}</div>
      </div>
    );
};

export default SynonymsPanel;
