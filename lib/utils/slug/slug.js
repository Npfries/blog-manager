/**
 *
 * @param {string} string
 */
const slugify = (string) => {
  return string.replace(/ +/g, "-").toLowerCase();
};

export { slugify };
