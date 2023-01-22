import React, { useEffect, useState } from "react";
import ConfettiGenerator from "confetti-js";
import generatedGitInfo from "./generatedGitInfo.json";

function App() {
  const [password, setPassword] = useState("");

  const [useGradient, setUseGradient] = useState(false);
  const [gradientColorA, setGradientColorA] = useState("#001a40");
  const [gradientColorB, setGradientColorB] = useState("#0043a6");
  const [gradientAngle, setGradientAngle] = useState(90);

  useEffect(() => {
    console.log(useGradient);
    document.body.style.background = useGradient
      ? `linear-gradient(${gradientAngle}deg, ${gradientColorA}, ${gradientColorB})`
      : "#001a40";
  }, [useGradient, gradientColorA, gradientColorB, gradientAngle]);

  const [enableConfetti, setEnableConfetti] = useState(false);
  const [maxConfetti, setMaxConfetti] = useState(80);
  const [confettiSize, setConfettiSize] = useState(1);
  const [confettiSpeed, setConfettiSpeed] = useState(25);
  const [confettiRotation, setConfettiRotation] = useState(false);
  const [confettiProps, setConfettiProps] = useState(
    '["circle","square","triangle","line"]'
  ); //poopy

  useEffect(() => {
    const confettiSettings = {
      target: "confetti",
      max: maxConfetti,
      size: confettiSize,
      clock: confettiSpeed,
      rotate: confettiRotation,
      props:
        JSON.parse(confettiProps).length > 0
          ? JSON.parse(confettiProps)
          : JSON.parse('["circle","square","triangle","line"]'),
    };
    const confetti = new ConfettiGenerator(confettiSettings);

    if (enableConfetti) {
      confetti.render();
    }

    return () => confetti.clear();
  }, [
    enableConfetti,
    maxConfetti,
    confettiSize,
    confettiSpeed,
    confettiRotation,
    confettiProps,
  ]);

  console.log(generatedGitInfo)

  return (
    <div className='App'>
      <h1>
        happy holidays <span className='secondary'>[redacted]</span> :3
      </h1>
      <h2>Git Info:</h2>
      <p>Source: {generatedGitInfo.gitSource}</p>
      <p>Branch: {generatedGitInfo.gitBranch}</p>
      <p>Commit: {generatedGitInfo.gitCommitHash}</p>
      <details>
        <summary>Page Options (click to expand :D)</summary>
        <h2>Gradient Settings</h2>
        <input
          onChange={(e) => {
            setUseGradient(e.target.checked);
          }}
          type='checkbox'
          id='gradient-bg'
          name='gradient-bg'
          value='gradient-bg'
        />
        <label htmlFor='gradient-bg'>
          {" "}
          soopa doopa kewl gradient background
        </label>
        <br />
        <br />

        <label htmlFor='gradient-a'>Color 1</label>
        <br />
        <input
          onChange={(e) => {
            setGradientColorA(e.target.value);
            console.log(e.target.value);
          }}
          type='color'
          id='gradient-a'
          name='gradient-a'
          defaultValue='#001a40'
        />
        <br />
        <br />

        <label htmlFor='gradient-b'>Color 2</label>
        <br />
        <input
          onChange={(e) => {
            setGradientColorB(e.target.value);
            console.log(e.target.value);
          }}
          type='color'
          id='gradient-b'
          name='gradient-b'
          defaultValue='#0043a6'
        />
        <br />
        <br />

        <label htmlFor='gradient-angle'>Gradient Angle</label>
        <br />
        <input
          onInput={(e) => {
            setGradientAngle(e.target.valueAsNumber);
            console.log(e.target.valueAsNumber);
          }}
          type='range'
          min='0'
          max='360'
          defaultValue='50'
          id='gradient-angle'
        ></input>
        <br />
        <br />

        <h2>Flashbang :D</h2>
        <button
          onClick={(e) => {
            document.getElementById("flashbang").style.animationName = "flash";
            e.target.disabled = true;
            setTimeout(() => {
              document.getElementById("flashbang").style.animationName = "";
              e.target.disabled = false;
            }, 7000);
          }}
          id='flashbang-button'
        >
          OwO whats this?
        </button>

        <h2>Confetti Settings</h2>
        <input
          onChange={(e) => {
            setEnableConfetti(e.target.checked);
          }}
          type='checkbox'
          id='enable-confetti'
          name='enable-confetti'
          value='enable-confetti'
        />
        <label htmlFor='enable-confetti'> enable covfefe</label>
        <br />
        <br />

        <label htmlFor='max-confetti'>Max Confetti</label>
        <br />
        <input
          onInput={(e) => {
            setMaxConfetti(e.target.valueAsNumber);
            console.log(e.target.valueAsNumber);
          }}
          type='range'
          min='1'
          max='2000'
          defaultValue='80'
          id='max-confetti'
        ></input>
        <br />
        <br />

        <label htmlFor='confetti-size'>Confetti Size</label>
        <br />
        <input
          onInput={(e) => {
            setConfettiSize(e.target.valueAsNumber / 10);
            console.log(e.target.valueAsNumber);
          }}
          type='range'
          min='10'
          max='20'
          defaultValue='10'
          id='confetti-size'
        ></input>
        <br />
        <br />

        <label htmlFor='confetti-speed'>Confetti Speed</label>
        <br />
        <input
          onInput={(e) => {
            setConfettiSpeed(e.target.valueAsNumber);
            console.log(e.target.valueAsNumber);
          }}
          type='range'
          min='10'
          max='500'
          defaultValue='25'
          id='confetti-speed'
        ></input>
        <br />
        <br />

        <input
          onChange={(e) => {
            setConfettiRotation(e.target.checked);
          }}
          type='checkbox'
          id='rotate-confetti'
          name='rotate-confetti'
          value='rotate-confetti'
        />
        <label htmlFor='rotate-confetti'> rotate the confetti</label>
        <br />
        <br />

        <input
          onChange={(e) => {
            let prev = JSON.parse(confettiProps);

            if (prev.includes(e.target.value) && !e.target.checked) {
              prev.splice(prev.indexOf(e.target.value), 1);
            } else if (!prev.includes(e.target.value) && e.target.checked) {
              prev.push(e.target.value);
            }

            setConfettiProps(JSON.stringify(prev));

            setConfettiRotation(e.target.value, e.target.checked);
          }}
          type='checkbox'
          defaultChecked
          id='confetti-circle'
          name='confetti-circle'
          value='circle'
        />
        <label htmlFor='confetti-circle'> enable circles</label>
        <br />
        <br />

        <input
          onChange={(e) => {
            let prev = JSON.parse(confettiProps);

            if (prev.includes(e.target.value) && !e.target.checked) {
              prev.splice(prev.indexOf(e.target.value), 1);
            } else if (!prev.includes(e.target.value) && e.target.checked) {
              prev.push(e.target.value);
            }

            setConfettiProps(JSON.stringify(prev));

            setConfettiRotation(e.target.value, e.target.checked);
          }}
          type='checkbox'
          defaultChecked
          id='confetti-square'
          name='confetti-square'
          value='square'
        />
        <label htmlFor='confetti-square'> enable squares</label>
        <br />
        <br />

        <input
          onChange={(e) => {
            let prev = JSON.parse(confettiProps);

            if (prev.includes(e.target.value) && !e.target.checked) {
              prev.splice(prev.indexOf(e.target.value), 1);
            } else if (!prev.includes(e.target.value) && e.target.checked) {
              prev.push(e.target.value);
            }

            setConfettiProps(JSON.stringify(prev));

            setConfettiRotation(e.target.value, e.target.checked);
          }}
          type='checkbox'
          defaultChecked
          id='confetti-triangle'
          name='confetti-triangle'
          value='triangle'
        />
        <label htmlFor='confetti-triangle'> enable triangles</label>
        <br />
        <br />

        <input
          onChange={(e) => {
            let prev = JSON.parse(confettiProps);

            if (prev.includes(e.target.value) && !e.target.checked) {
              prev.splice(prev.indexOf(e.target.value), 1);
            } else if (!prev.includes(e.target.value) && e.target.checked) {
              prev.push(e.target.value);
            }

            setConfettiProps(JSON.stringify(prev));

            setConfettiRotation(e.target.value, e.target.checked);
          }}
          type='checkbox'
          defaultChecked
          id='confetti-line'
          name='confetti-line'
          value='line'
        />
        <label htmlFor='confetti-line'> enable lines</label>
        <br />
        <br />
      </details>

      {password === "ilikemen" ? (
        <main>
          <h2>to: [redacted]</h2>
          <h2>from: piero</h2>
          <section>
            <p>i removed the card lol, nice try</p>
          </section>
        </main>
      ) : (
        <main>
          <br />
          <label htmlFor='password'>Enter the super secret password:</label>
          <input
            id='password'
            defaultValue={""}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </main>
      )}

      <div id='flashbang'></div>
      <canvas id='confetti'></canvas>
    </div>
  );
}

export default App;
