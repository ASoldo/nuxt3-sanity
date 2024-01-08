export interface DialogElement extends HTMLElement {
  showModal: () => void;
  close: () => void;
}
export interface DemoData {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  id: number;
  name: string;
}

export interface PageData {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: Slug;
  components: Component[];
}

interface Slug {
  _type: string;
  current: string;
}

type Component = Header | Banner | Body | Footer;

interface Header {
  _type: "header";
  _key: string;
  title: string;
}

interface Banner {
  _type: "banner";
  _key: string;
  image: Image;
}

interface Body {
  _type: "body";
  _key: string;
  content: string;
}

interface Footer {
  _type: "footer";
  _key: string;
  content: string;
}

interface Image {
  _type: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
}
