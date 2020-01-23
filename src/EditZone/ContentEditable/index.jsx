import React from 'react';
import * as PropTypes from 'prop-types';
import { normalizeHtml, replaceCaret } from '../../utils';
import './ContentEditable.css';

class ContentEditable extends React.Component {
  constructor(props) {
    super(props);

    this.previousValue = props.value;
    this.el = React.createRef();
  }

  shouldComponentUpdate(nextProps) {
    if (!this.el.current) {
      return true;
    }

    return normalizeHtml(nextProps.value) !== normalizeHtml(this.el.current.innerHTML);
  }

  componentDidUpdate() {
    const { value } = this.props;
    if (!this.el.current) {
      return;
    }

    if (value !== this.el.current.innerHTML) {
      this.previousValue = value;
      this.el.current.innerHTML = value;
    }

    replaceCaret(this.el.current);
  }

  onChange = (event) => {
    const { onChange } = this.props;
    if (!this.el.current) {
      return;
    }

    const value = this.el.current.innerHTML;
    const previous = this.previousValue;
    this.previousValue = value;

    if (onChange && value !== previous) {
      onChange({ ...event, target: { value } });
    }
  };

  render() {
    const { value, onMouseUp } = this.props;

    return (
      <div
        role="textbox"
        tabIndex={0}
        className="editor"
        contentEditable
        onBlur={this.onChange}
        onInput={this.onChange}
        onKeyDown={this.onChange}
        onKeyUp={this.onChange}
        ref={this.el}
        onMouseUp={onMouseUp}
      >
        {value}
      </div>
    );
  }
}

ContentEditable.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onMouseUp: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

ContentEditable.defaultProps = {
  onMouseUp: () => {},
};

export default ContentEditable;
