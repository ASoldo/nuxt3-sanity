export const gameConfig = {
  name: "gameConfig",
  type: "document",
  title: "Game Config",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "active_room",
      type: "string",
      title: "Active Room",
    },
    {
      name: "correctItems",
      type: "array",
      title: "Correct Items",
      description: "These are the correct items for the game",
      of: [
        {
          type: "reference",
          to: [{ type: "item" }],
        },
      ],
    },
  ],
};
