const notificationItem = ({ id, content, createdAt, isOpened }) => {
  return `
      <li class="notification-item" data-notification-id="${id}">
        <div class="notification-content">${content}</div>
        <div class="notification-date">${createdAt}</div>
        <div class="notification-status" data-notification-status="${isOpened}">${
    isOpened ? "Opened" : "Unopened"
  }</div>
  ${
    !isOpened
      ? ` <button class="notification-button" data-notification-id="${id}">READ</button>`
      : ""
  }
      </li>
    `;
};

export default notificationItem;
