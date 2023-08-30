const postItem = ({ id, email, content, creatorId }) => {
  return `
      <div class="posts-container" data-post-id="${id}" data-creator-id="${creatorId}">
        <p>
          <b>${email}</b>
        </p>
        <p>${content}</p>
        <button>subscribe</button>
      </div>
    `;
};

export default postItem;
