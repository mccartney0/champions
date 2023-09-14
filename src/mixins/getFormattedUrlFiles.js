const getFormattedUrlFiles = {
  methods: {
    getUserPicture(userEmail) {
      return `${process.env.VUE_APP_SMO_API_URL}/employees/picture?userEmail=${userEmail}`;
    },
    getEventPicture(name) {
      return `${process.env.VUE_APP_API_FILES}${name}`;
    },
    getFlag(countryName) {
      return `${process.env.VUE_APP_RGO_API_FILES}/upload/countries/flags/rect/svg/${countryName}.svg`;
    },
  },
};

export default getFormattedUrlFiles;
