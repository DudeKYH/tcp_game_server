export const onEnd = (socket) => () => {
  console.log(`클라이언트 연결이 종료되었습니다.`);

  // 세션에서 유저 삭제
  removeUser(socket);
};
