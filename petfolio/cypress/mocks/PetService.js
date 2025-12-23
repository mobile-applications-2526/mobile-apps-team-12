const PetService = {
  deletePetAndExtras: (petData) => {
    console.log('Mock deletePet called:', petData);
    return Promise.resolve({ petData });
  },

};

export default PetService;