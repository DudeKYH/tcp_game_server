import BaseManager from "./base.manager.js";

class IntervalManager extends BaseManager {
  constructor() {
    super();
    // 유저 하나당 하나의 interval이 있어야 하므로 map 자료구조 사용
    this.intervals = new Map();
  }

  addPlayer(playerId, callback, interval, type = "user") {
    if (!this.intervals.has(playerId)) {
      this.intervals.set(playerId, new Map());
    }

    this.intervals.get(playerId).set(type, setInterval(callback, interval));
  }

  addGame(gameId, callback, interval) {
    this.addPlayer(gameId, callback, interval, "game");
  }

  addUpdatePosition(playerId, callback, interval) {
    this.addPlayer(gameId, callback, interval, "updatePosition");
  }

  removePlayer(playerId) {
    if (this.intervals.has(playerId)) {
      const userIntervals = this.intervalse.get(playerId);
      userIntervals.forEach((intervalId) => clearInterval(intervalId));
      this.intervals.delete(playerId);
    }
  }

  removeInterval(playerId, type) {
    if (this.intervals.has(playerId)) {
      const userIntervals = this.intervals.get(playerId);
      if (userIntervals.has(type)) {
        clearInterval(userIntervals.get(type));
        userIntervals.delete(type);
      }
    }
  }

  clearAll() {
    this.intervals.forEach((userIntervals) => {
      userIntervals.forEach((intervalId) => {
        clearInterval(intervalId);
      });
    });

    this.intervals.clear();
  }
}

export default IntervalManager;
