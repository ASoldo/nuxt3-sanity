// Define the component types
export const header = {
  name: "header",
  type: "object",
  title: "Header",
  fields: [
    {
      name: "visibility",
      type: "boolean",
      title: "Visibility",
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    // Add more fields as needed for each component
  ],
  preview: {
    select: {
      title: "title",
      status: "visibility",
    },
    prepare(selection: any) {
      return {
        title: `Header: ${selection.title} | Active: ${selection.status}`,
      };
    },
  },
};

export const banner = {
  name: "banner",
  type: "object",
  title: "Banner",
  fields: [
    {
      name: "visibility",
      type: "boolean",
      title: "Visibility",
    },
    {
      name: "name",
      description: "Image Name",
      type: "string",
      title: "Image name",
    },
    {
      name: "image",
      description: "Upload your image",
      type: "image",
      title: "Image",
    },
    // Add more fields as needed for each component
  ],
  preview: {
    select: {
      name: "name",
      status: "visibility",
    },
    prepare(selection: any) {
      return {
        title: `Banner: ${selection.name} | Active: ${selection.status}`,
      };
    },
  },
};

export const body = {
  name: "body",
  type: "object",
  title: "Body",
  fields: [
    {
      name: "visibility",
      type: "boolean",
      title: "Visibility",
    },
    {
      name: "content",
      type: "text",
      title: "Content",
    },
    // Add more fields as needed for each component
  ],
  preview: {
    select: {
      content: "content",
      status: "visibility",
    },
    prepare(selection: any) {
      return {
        title: `Body: ${selection.content} | Active: ${selection.status}`,
      };
    },
  },
};

export const footer = {
  name: "footer",
  type: "object",
  title: "Footer",
  fields: [
    {
      name: "visibility",
      type: "boolean",
      title: "Visibility",
    },
    {
      name: "content",
      type: "text",
      title: "Content",
    },
    // Add more fields as needed for each component
  ],
  preview: {
    select: {
      content: "content",
      status: "visibility",
    },
    prepare(selection: any) {
      return {
        title: `Footer: ${selection.content} | Active: ${selection.status}`,
      };
    },
  },
};

// Define the page type
export const page = {
  name: "page",
  type: "document",
  title: "Pages",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "components",
      type: "array",
      title: "Components",
      of: [
        { type: "header", title: "Header" },
        { type: "banner", title: "Banner" },
        { type: "body", title: "Body" },
        { type: "footer", title: "Footer" },
      ],
    },
  ],
};
