const data = {
  parents: [
    {
      id: 1,
      name: "Иван",
      age: 40,
      children: [
        {
          id: 2,
          name: "Мария",
          age: 10,
          parentId: 1,
        },
        {
          id: 3,
          name: "Алексей",
          age: 8,
          parentId: 1,
        },
      ],
    },
    {
      id: 4,
      name: "Анна",
      age: 35,
      children: [
        {
          id: 5,
          name: "София",
          age: 6,
          parentId: 4,
        },
      ],
    },
  ],
};

export default data;
