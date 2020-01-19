import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
  render() {
    const { applyStyle } = this.props;
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
}

export default ControlPanel;
