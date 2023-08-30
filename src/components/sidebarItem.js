const sidebarItem = ({ id, email }) => {
  return `
      <li class="sidebar-item">
        <label for="unsub-${id}">${email}</label>
        <input type="button" value="unsub" data-subscribe-id="${id}" />
      </li>
    `;
};

export default sidebarItem;
