// ! For resuming and pausing the timer

var Timer = function (callback, delay) {
  var timerId,
    start,
    remaining = delay;

  this.pause = function () {
    window.clearTimeout(timerId);
    remaining -= Date.now() - start;
  };

  this.resume = function () {
    start = Date.now();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
};
