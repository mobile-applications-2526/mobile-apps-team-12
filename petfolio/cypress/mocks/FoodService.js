const FoodsService = {
  updateFood: (id, data) => {
    console.log('Mock updateFood called:', id, data);
    return Promise.resolve({ id, ...data });
  },
  deleteFood: (id) => {
    console.log('Mock deleteFood called:', id);
    return Promise.resolve({ id });
  },
  getFood: (id) => {
    console.log('Mock getFood called:', id);
    return Promise.resolve({ 
      id, 
      name: 'Mock Food', 
      description: 'Mock Description',
      quantity: '1 unit'
    });
  },
  getAllFoods: () => {
    console.log('Mock getAllFoods called');
    return Promise.resolve([]);
  },
};

export default FoodsService;