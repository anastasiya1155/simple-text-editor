import React from 'react';
import * as PropTypes from 'prop-types';
import './ControlPanel.css';

function ControlPanel({ applyStyle }) {
  return (
    <div id="control-panel">
      <div id="format-actions">
        <button className="format-action" type="button" value="bold" onClick={applyStyle}>
          <b>B</b>
        </button>
        <button className="format-action" type="button" value="italic" onClick={applyStyle}>
          <i>I</i>
        </button>
        <button className="format-action" type="button" value="underline" onClick={applyStyle}>
          <u>U</u>
        </button>
      </div>
    </div>
  );
}

ControlPanel.propTypes = {
  applyStyle: PropTypes.func.isRequired,
};

export default ControlPanel;
