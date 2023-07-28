export const item = {
  name: "item",
  type: "document",
  title: "Game Items",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },
    {
      name: "question",
      type: "string",
      title: "Question",
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
  ],
};
