export default {
  jwt: {
    secret: process.env.APP_SECRET || 'private-key',
    expiresIn: 86400000,
  },
};
