const exchanges = {
  USER_CREATED: "USER_CREATED",
  POST_MODIFIED: "POST_MODIFIED",
};

/**
 * @typedef {{uuid, name, handle, email, salt, hash}} IUserCreatedEvent
 */

/**
 * @typedef {{postUuid, authorUuid}} IPostPublishedEvent
 */

export { exchanges };
