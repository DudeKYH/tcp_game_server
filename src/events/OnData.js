import { config } from "../config/config.js";

export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength =
    config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    // 아직 전체 패킷이 도착하지 않았다.
    if (socket.buffer.length < length) {
      break;
    }
    const packet = socket.buffer.slice(totalHeaderLength, length);
    socket.buffer = socket.buffer.slice(length);
    console.log(`length: ${length}, packetType: ${packetType}`);
    console.log(`packet: ${packet}`);
  }
};
