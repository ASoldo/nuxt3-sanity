import { defineConfig, isDev, PluginOptions } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { schemaTypes, pageTypes } from "./schemas";
import { scheduledPublishing } from "@sanity/scheduled-publishing";
import Iframe from "sanity-plugin-iframe-pane";
import { CogIcon, RocketIcon } from "@sanity/icons";
const devOnlyPlugins = [Iframe];

interface Config {
  name: string;
  title: string;
  basePath: string;
  projectId: string;
  dataset: string;
  icon?: any;
  plugins: Array<PluginOptions>;
  schema: Object;
}

const configArray: Config[] = [
  {
    name: "Knaufland",
    title: "Kaufland-CMS",
    basePath: "/studio",
    projectId: "u678c0qn",
    dataset: "production",
    icon: RocketIcon,
    plugins: [
      deskTool(),
      scheduledPublishing(),
      visionTool(),
      ...(isDev ? devOnlyPlugins : []),
    ],
    schema: { types: pageTypes },
  },
  {
    name: "my-staging-space",
    title: "My staging workspace",
    basePath: "/staging",
    projectId: "u678c0qn",
    dataset: "staging",
    icon: CogIcon,
    plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],
    schema: { types: schemaTypes },
  },
];

export default defineConfig(configArray);
