export const qrcodes = {
  name: "qrcodes",
  type: "document",
  title: "QR Codes",
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
      name: "qrcode",
      type: "string",
      title: "QR Code",
    },
    {
      name: "qrcodeimage",
      type: "image",
      title: "QR Code Image",
    },
  ],
};
