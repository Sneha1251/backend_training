const mockData = require("./mockData");

const generateUsers = () => mockData.users;
const generatePosts = () => mockData.posts;

module.exports = { generatePosts, generateUsers };
