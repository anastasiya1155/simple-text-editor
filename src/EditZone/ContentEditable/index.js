import React from 'react';
import { normalizeHtml, replaceCaret } from '../../utils';
import './ContentEditable.css';

class ContentEditable extends React.Component{
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
    if (!this.el.current) {
      return;
    }

    if (this.props.value !== this.el.current.innerHTML) {
      this.previousValue = this.props.value;
      this.el.current.innerHTML = this.props.value;
    }

    replaceCaret(this.el.current);
  }

  onChange = (event) => {
    if (!this.el.current) {
      return;
    }

    const value = this.el.current.innerHTML;
    const previous = this.previousValue;
    this.previousValue = value;

    if (this.props.onChange && value !== previous) {
      this.props.onChange({ ...event, target: { value } });
    }
  };

  render() {
    const { value, onMouseUp } = this.props;

    return (
      <div
        className="editor"
        contentEditable={true}
        onBlur={this.onChange}
        onInput={this.onChange}
        onKeyDown={this.onChange}
        onKeyUp={this.onChange}
        ref={this.el}
        onMouseUp={onMouseUp}
      >
        {value}
      </div>
    )
  }
}

export default ContentEditable;
