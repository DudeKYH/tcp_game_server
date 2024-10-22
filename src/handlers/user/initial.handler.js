import {
  HANDLER_IDS,
  RESPONSE_SUCCESS_CODE,
} from "../../constants/handlerIds.js";
import { createResponse } from "../../utils/response/createResponse.js";

const initialHandler = async (socket, userId, payload) => {
  const { deviceId } = payload;

  addUser(socket, deviceId);

  const initialResponse = createResponse(
    HANDLER_IDS.INITIAL,
    RESPONSE_SUCCESS_CODE,
    { userId: deviceId },
    deviceId,
  );

  // 뭔가 처리가 끝났을 때 보내는 Response
  socket.write(initialResponse);
};

export default initialHandler;
