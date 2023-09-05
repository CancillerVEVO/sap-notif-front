import notificationItem from "./src/components/notificationItem";
import postItem from "./src/components/postItem";
import sidebarItem from "./src/components/sidebarItem";
import verifySession from "./src/utils/session";
import socket from "./src/utils/socket";

const notifierBadge = document.getElementById("notifier-badge");
const menuButton = document.querySelector(".menu-button");
const sidebar = document.querySelector(".sidebar");
const sidebarList = document.getElementById("sidebar-list");
const postsList = document.getElementById("posts-list");
const notifierButton = document.querySelector(".header-notifier");
const notifSidebar = document.getElementById("notif-sidebar");
const notifSidebarList = document.getElementById("notif-sidebar-list");

document.addEventListener("DOMContentLoaded", async () => {
  if (!(await verifySession())) {
    window.location.href = "/src/views/login.html";
  }

  const response = await fetch("http://localhost:3002/api/profile", {
    method: "POST",
    credentials: "include",
  });

  const { data } = await response.json();

  const unread = data.notifications.filter((notif) => !notif.isOpened);

  data.subscriptions.forEach((item) => {
    const itemElement = document.createElement("li");
    itemElement.innerHTML = sidebarItem(item);
    sidebarList.appendChild(itemElement);
  });
  notifierBadge.innerText = unread.length > 0 ? unread.length : "";

  data.posts.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = postItem(item);
    postsList.appendChild(itemElement);
  });

  data.notifications.forEach((item) => {
    const itemElement = document.createElement("li");
    itemElement.innerHTML = notificationItem(item);
    notifSidebarList.appendChild(itemElement);
  });
});

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", async () => {
  try {
    await fetch("http://localhost:3002/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/src/views/login.html";
  } catch (error) {
    console.error(error);
  }
});

menuButton.addEventListener("click", () => {
  const currentState = sidebar.getAttribute("data-sidebar-state");
  if (currentState === "closed") {
    sidebar.setAttribute("data-sidebar-state", "open");
  } else {
    sidebar.setAttribute("data-sidebar-state", "closed");
  }
});

sidebar.addEventListener("click", async (event) => {
  const button = event.target;
  if (button.tagName === "INPUT" && button.getAttribute("data-subscribe-id")) {
    const id = button.getAttribute("data-subscribe-id");
    // LOGICA DE DESUSCRIPCION
    console.log(`Usuario con ID ${id} suscrito`);

    try {
      const response = await fetch(
        "http://localhost:3002/api/profile/subscribe",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userTopicId: id,
          }),
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
});

postsList.addEventListener("click", async (event) => {
  const button = event.target;
  if (button.tagName === "BUTTON") {
    const postId = button.parentElement.getAttribute("data-post-id");
    const creatorId = button.parentElement.getAttribute("data-creator-id");
    // LOGICA DE SUSCRIPCION
    console.log(`Creador ${creatorId} del post ${postId}`);

    try {
      const response = await fetch(
        "http://localhost:3002/api/profile/subscribe",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userTopicId: creatorId,
          }),
        }
      );

      socket.emit("subscribe", {
        userId: creatorId,
      });
    } catch (error) {
      console.error(error);
    }
  }
});

notifierButton.addEventListener("click", () => {
  const currentState = notifSidebar.getAttribute("data-sidebar-state");
  if (currentState === "closed") {
    notifSidebar.setAttribute("data-sidebar-state", "open");
  } else {
    notifSidebar.setAttribute("data-sidebar-state", "closed");
  }
});

notifSidebarList.addEventListener("click", async (event) => {
  const button = event.target;
  if (
    button.tagName === "BUTTON" &&
    button.getAttribute("data-notification-id")
  ) {
    const id = button.getAttribute("data-notification-id");

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/notifications/markAsOpened`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notificationId: id,
          }),
        }
      );

      const { data } = await response.json();

      renderNotifications(data);
    } catch (error) {
      console.error(error);
    }
  }
});

socket.on("notification", async () => {
  const response = await fetch(
    "http://localhost:3002/api/profile/notifications",
    {
      method: "POST",
      credentials: "include",
    }
  );

  const { data } = await response.json();

  renderNotifications(data);
});

const renderNotifications = ({ notifications }) => {
  const unread = notifications.filter((notif) => !notif.isOpened);

  notifSidebarList.innerHTML = "";

  notifications.forEach((item) => {
    const itemElement = document.createElement("li");
    itemElement.innerHTML = notificationItem(item);
    notifSidebarList.appendChild(itemElement);
  });

  notifierBadge.innerText = unread.length > 0 ? unread.length : "";
};
