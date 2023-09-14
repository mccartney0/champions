const externalUser = {
  methods: {
    externalUser(email) {
      return !email.includes('@oracle.com');
    },
  },
};

export default externalUser;
