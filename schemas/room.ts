export const position = {
  name: "position",
  type: "object",
  title: "Position",
  fields: [
    {
      name: "x",
      type: "number",
      title: "X",
    },
    {
      name: "y",
      type: "number",
      title: "Y",
    },
    {
      name: "hotspot_interactable_id",
      type: "number",
      title: "Hotspot Interacatble Id",
    },
  ],
};

export const room = {
  name: "room",
  type: "object",
  title: "Room",
  fields: [
    {
      name: "room_name",
      type: "string",
      title: "Room Name",
    },
    {
      name: "hotspot_positions",
      type: "array",
      title: "Hotspot Positions",
      of: [{ type: "position", title: "Position" }],
    },
    {
      name: "hotspot_interactable_positions",
      type: "array",
      title: "Interactable Hotspot Positions",
      of: [{ type: "position", title: "Position" }],
    },
  ],

  preview: {
    select: {
      title: "room_name",
      hotspotCount: "hotspot_positions",
      interactableCount: "hotspot_interactable_positions",
    },
    prepare(selection: any) {
      return {
        title: `${selection.title} > Hotspots: ${selection.hotspotCount.length || 0
          } > Interactable: ${selection.interactableCount.length * 4 || 0
          } > Total: ${selection.hotspotCount.length + selection.interactableCount.length * 4
          }`,
      };
    },
  },
};

export const game = {
  name: "game",
  type: "document",
  title: "Game Rooms",
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
      name: "rooms",
      type: "array",
      title: "Rooms",
      of: [{ type: "room", title: "Room" }],
    },
  ],
};
