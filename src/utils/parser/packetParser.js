import { getProtoTypeNameByHandlerId } from "../../handlers/index.js";
import { getProtoMessages } from "../../init/loadProtos.js";

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  // 공통 패킷 구조를 디코딩
  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (err) {
    console.error(err);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.clientVersion;
  const sequence = packet.sequence;

  if (clientVersion !== config.client.clientVersion) {
    console.error(`클라이언트 버전이 일치하지 않습니다.`);
  }

  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    console.error(`알 수 없는 핸들러 ID: ${handlerId}`);
  }

  const [namespace, typeName] = protoTypeName.split(".");
  const PayloadType = protoMessages[namespace][typeName];

  let payload;

  try {
    payload = PayloadType.decode(packet.payload);
  } catch (err) {
    console.error(e);
  }

  // verify 과정은 이미 위의 decode 함수 내부에서 자체적으로 수행되지만, 우선 구현은 해놓는다.
  const errorMessage = PayloadType.verify(payload);
  if (errorMessage) {
    console.error(errorMessage);
  }

  // 필드가 비어있는 경우 = 필수 필드가 누락된 경우
  const expectedFields = Object.keys(PayloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter(
    (field) => !actualFields.includes(field),
  );

  if (missingFields.length > 0) {
    console.error(`필수 필드가 누락되었습니다: ${missingFields.join(", ")}`);
  }

  return { handlerId, userId, payload, sequence };
};
