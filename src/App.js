import "./App.css";
import { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";

function App() {
  // ! Defining states
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isCounting, setIsCounting] = useState(false);
  const [currentMins, setCurrentMins] = useState(sessionLength);
  const [currentSecs, setCurrentSecs] = useState(0);
  const [currentLabel, setCurrentLabel] = useState("Session");
  // ! __________________________________________________________________
  var interval;
  // ! Updating all values
  var numOfSecondsSession = currentMins * 60 + currentSecs;
  useEffect(() => {
    var numOfSecondsSession = currentMins * 60 + currentSecs - 1;
    var sessionOrBreak = 1;
    var x = document.getElementById("beep");
    if (numOfSecondsSession >= 0 && isCounting === true) {
      const interval = setInterval(() => {
        if (numOfSecondsSession >= 0 && isCounting === true) {
          var m = Math.floor(numOfSecondsSession / 60);
          var s = numOfSecondsSession % 60;
          numOfSecondsSession -= 1;
          setCurrentMins(m);
          setCurrentSecs(s);
        } else if (sessionOrBreak === 1) {
          x.play();
          setCurrentLabel("Break");
          setCurrentMins(breakLength);
          setCurrentSecs(0);
          sessionOrBreak = 0;
          numOfSecondsSession = breakLength * 60;
        } else if (sessionOrBreak === 0) {
          x.play();
          setCurrentLabel("Session");
          setCurrentMins(breakLength);
          setCurrentSecs(0);
          numOfSecondsSession = sessionLength * 60;
          sessionOrBreak = 1;
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [isCounting]);

  useEffect(() => {
    if (currentLabel === "Session") {
      document.body.style.backgroundImage =
        "url('https://wallpaperaccess.com/full/2040033.jpg')";
    } else {
      document.body.style.backgroundImage =
        "url('https://community.paraplegie.ch/images/blog/2019-08-20-meditation_think_its_just_for_monks/meditation_cover.jpg')";
    }
  }, [currentLabel]);
  // ! __________________________________________________________________
  // ! Resetting all values
  const handleResetting = () => {
    var x = document.getElementById("beep");
    x.pause();
    x.currentTime = 0;
    setIsCounting(false);
    setCurrentLabel("Session");
    setCurrentMins(25);
    setCurrentSecs(0);
    setSessionLength(25);
    setBreakLength(5);
    clearInterval(interval);
  };
  // ! __________________________________________________________________
  // ! Updating values based on session length increment or decrement
  useEffect(() => {
    setCurrentMins(sessionLength);
    setCurrentSecs(0);
  }, [sessionLength]);
  // ! __________________________________________________________________
  // ! Handling break increment and decrement
  const handleBreakDecrement = () =>
    breakLength > 1 && setBreakLength((prevBreakLength) => prevBreakLength - 1);
  const handleBreakIncrement = () =>
    breakLength < 60 &&
    setBreakLength((prevBreakLength) => prevBreakLength + 1);
  // ! __________________________________________________________________
  // ! Handling session increment and decrement
  const handleSessionDecrement = () =>
    sessionLength > 1 &&
    setSessionLength((prevSessionLength) => prevSessionLength - 1);
  const handleSessionIncrement = () =>
    sessionLength < 60 &&
    setSessionLength((prevSessionLength) => prevSessionLength + 1);
  // ! __________________________________________________________________
  // ! For parsing number of input seconds to 'mm:ss' format
  const handleCounterSecs = (numOfSecs) => {
    return ("0" + (numOfSecs % 60)).slice(-2);
  };
  const handleCounterMins = (numOfSecs) => {
    return ("0" + Math.floor(numOfSecs / 60)).slice(-2);
  };
  // ! __________________________________________________________________
  // ! For showing time
  const timeShowUpdate = () => {
    setIsCounting((prevIsCounting) => !prevIsCounting);
  };
  // ! __________________________________________________________________
  return (
    <div>
      <div>
        <h1 className="designBy">
          Designed and coded by{" "}
          <a
            href="https://www.linkedin.com/in/davor-jovanovi%C4%87/"
            rel="noreferrer"
            target="_blank"
          >
            DavorJ
          </a>
        </h1>
      </div>
      <div
        id="allElementContainer"
        style={
          currentMins === 0
            ? { border: "2px solid red" }
            : { border: "2px solid white" }
        }
      >
        <div className="clockTitle">Pomodoro Clock</div>
        <div id="breakAndSessionDuration">
          <div id="break-label" className="breakAndSessionLabels">
            <p className="durationLabels">Break duration</p>
            <div className="incrementDecrement">
              <div
                id="break-decrement"
                onClick={isCounting ? null : handleBreakDecrement}
              >
                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
              </div>
              <div id="break-length">{breakLength}</div>
              <div
                id="break-increment"
                onClick={isCounting ? null : handleBreakIncrement}
              >
                <i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div id="session-label" className="breakAndSessionLabels">
            <p className="durationLabels">Session duration</p>
            <div className="incrementDecrement">
              <div
                id="session-decrement"
                onClick={isCounting ? null : handleSessionDecrement}
              >
                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
              </div>
              <div id="session-length">{sessionLength}</div>
              <div
                id="session-increment"
                onClick={isCounting ? null : handleSessionIncrement}
              >
                <i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="bottomSection">
          <div
            className="currentSecsAndLabel"
            style={
              currentMins === 0
                ? { color: "red", border: "2px solid red" }
                : { color: "white", border: "2px solid white" }
            }
          >
            <div id="timer-label">{currentLabel}</div>
            <div id="time-left">
              {handleCounterMins(numOfSecondsSession) +
                ":" +
                handleCounterSecs(numOfSecondsSession)}
            </div>
          </div>
          <div className="onOffReset">
            <div
              id="start_stop"
              onClick={timeShowUpdate}
              style={isCounting ? { color: "green" } : { color: "white" }}
            >
              <i className="fa fa-power-off fa-3x" aria-hidden="true"></i>
            </div>
            <div id="reset" onClick={handleResetting}>
              <i className="fa fa-refresh fa-3x" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <audio
          id="beep"
          src="http://soundbible.com/mp3/foghorn-daniel_simon.mp3"
        ></audio>
      </div>
    </div>
  );
}
export default App;
