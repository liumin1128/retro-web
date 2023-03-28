export default [
  {
    key: 'line1',
    list: [
      {
        key: 's1',
        seats: [
          { id: 16, _id: '641aaf86a5528ba9c07345a9', direction: 2, status: 1 },
          { id: 17,_id: '641aaf87a5528ba9c07345ab', direction: 2, status: 1 },
        ],
      },
      {
        key: 's2',
        seats: [
          { id: 18, direction: 0, status: 0 },
          { id: 19, direction: 0, status: 0 },
        ],
      },
    ],
  },

  {
    key: 'line2',
    list: [
      {
        key: 's1',
        seats: [
          { id: 16, direction: 2, status: 1 },
          { id: 17, direction: 2, status: 1 },
        ],
      },
      {
        key: 's2',
        seats: [
          { id: 18, direction: 0, status: 0 },
          { id: 19, direction: 0, status: 0 },
        ],
      },
    ],
  },

  {
    key: 'line3',
    list: [
      {
        key: 's1',
        seats: [{ id: 16, direction: 2, status: 1 }],
      },
    ],
  },

  {
    key: 'line4',
    list: [
      {
        key: 's1',
        seats: [
          { id: 0, direction: 2, status: 1 },
          { id: 1, direction: 2, status: 1 },
          { id: 2, direction: 2, status: 0 },
          { id: 3, direction: 2, status: 0 },
        ],
      },

      {
        key: 's2',
        seats: [
          { id: 4, direction: 0, status: 0 },
          { id: 5, direction: 0, status: 0 },
          { id: 6, direction: 0, status: 0 },
          { id: 7, direction: 0, status: 0 },
        ],
      },
    ],
  },

  {
    key: 'line5',
    list: [
      {
        key: 's1',
        seats: [
          { id: 8, direction: 2, status: -1 },
          { id: 9, direction: 2, status: -1 },
          { id: 10, direction: 2, status: 0 },
          { id: 11, direction: 2, status: 0 },
        ],
      },

      {
        key: 's2',
        seats: [
          { id: 12, direction: 0, status: -1 },
          { id: 13, direction: 0, status: -1 },
          { id: 14, direction: 0, status: -1 },
          { id: 15, direction: 0, status: -1 },
        ],
      },
    ],
  },
];
