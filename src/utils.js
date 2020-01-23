function findLastTextNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node;
  }

  const children = node.childNodes;
  for (let i = children.length - 1; i >= 0; i--) {
    const textNode = findLastTextNode(children[i]);

    if (textNode !== null) {
      return textNode;
    }
  }
  return null;
}

export function normalizeHtml(str) {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}

export function replaceCaret(el) {
  // Place the caret at the end of the element
  const target = findLastTextNode(el);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el;

  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(target, target.nodeValue.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    if (el instanceof HTMLElement) {
      el.focus();
    }
  }
}

export function getSelection() {
  let selection;

  if (window.getSelection) {
    selection = window.getSelection();
  } else if (document.getSelection) {
    selection = document.getSelection();
  } else if (document.selection) {
    selection = document.selection.createRange().text;
  }

  return selection;
}
