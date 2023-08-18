import { demo } from "./demo";
import { header, banner, body, footer, page } from "./page";
import { position, room, game } from "./room";
import { room_info } from "./room_info";
import { item } from "./gameItems";
import { gameConfig } from "./gameConfig";
import { question } from "./question";
import { qrcodes } from "./qrcodes";

export const schemaTypes = [demo];
export const pageTypes = [
  header,
  banner,
  body,
  footer,
  page,
  question,
  position,
  room,
  game,
  item,
  gameConfig,
  room_info,
  qrcodes,
];
