import { config } from "../../config/config.js";
import { PACKET_TYPE } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProtos.js";

const makeNotofication = (message, type) => {
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    message.length + config.packet.totalLength + config.packet.typeLength,
  );

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(type, 0);

  return Buffer.concat([packetLength, packetType, message]);
};

export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();

  const location = protoMessages.gameNotification.UpdateLocation;

  const payload = { users };
  const message = location.create(payload);

  const locationPacket = location.encode(message).finish();
  return makeNotofication(locationPacket, PACKET_TYPE.LOCATION);
};

export const createGameStartPacket = (gameId, timestamp) => {
  const protoMessages = getProtoMessages();

  const start = protoMessages.gameNotification.Start;

  const payload = { gameId, timestamp };
  const message = start.create(payload);

  const startPacket = start.encode(message).finish();
  return makeNotofication(startPacket, PACKET_TYPE.GAME_START);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();

  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);

  const pingPacket = ping.encode(message).finish();
  return makeNotofication(pingPacket, PACKET_TYPE.PING);
};
