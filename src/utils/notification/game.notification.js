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

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();

  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);

  const pingPacket = ping.encode(message).finish();
  return makeNotofication(pingPacket, PACKET_TYPE.PING);
};
