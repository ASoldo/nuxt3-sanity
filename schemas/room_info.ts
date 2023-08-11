export const room_info = {
  name: "room_info",
  type: "document",
  title: "Room Info",
  fields: [
    {
      name: "room_name",
      type: "string",
      title: "Room Name",
    },
    {
      name: "room_id",
      type: "number",
      title: "Room ID",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "room_name",
        maxLength: 96,
      },
    },
  ],
};
