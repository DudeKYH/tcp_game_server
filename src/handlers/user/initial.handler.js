import {
  HANDLER_IDS,
  RESPONSE_SUCCESS_CODE,
} from "../../constants/handlerIds.js";
import {
  craeteUser,
  findUserByDeviceId,
  updateUserLogin,
} from "../../db/user/user.db.js";
import { addUser } from "../../session/user.session.js";
import { createResponse } from "../../utils/response/createResponse.js";

const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId } = payload;

  let user = await findUserByDeviceId(deviceId);

  if (!user) {
    user = await craeteUser(deviceId);
  } else {
    await updateUserLogin(user.id);
  }

  addUser(socket, user.id);

  const initialResponse = createResponse(
    HANDLER_IDS.INITIAL,
    RESPONSE_SUCCESS_CODE,
    { userId: user.id },
    deviceId,
  );

  // 뭔가 처리가 끝났을 때 보내는 Response
  socket.write(initialResponse);
};

export default initialHandler;
