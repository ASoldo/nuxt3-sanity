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
      type: "reference",
      title: "Active Room",
      to: [{ type: "room_info" }],
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
