import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';

// const appID = '#app-root-2023-benin_companies';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';
// https://www.npmjs.com/package/react-countup
import CountUp from 'react-countup';

// Load helpers.
import formatNr from './helpers/FormatNr.js';
import easingFn from './helpers/EasingFn.js';
// import roundNr from './helpers/RoundNr.js';

function App() {
  // Data states.
  const [data, setData] = useState(false);
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  useEffect(() => {
    const data_file = (window.location.href.includes('unctad.org')) ? '/sites/default/files/data-file/2023-benin_companies.json' : './assets/data/data.json';
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setData(JSON.parse(body)));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        chartRef.current.querySelector('.table').style.opacity = 1;
      }, 300);
    }
  }, [isVisible]);

  return (
    <div className="app">
      <div ref={chartRef}>
        {(isVisible) && (
          <table className="table">
            <thead>
              <tr>
                {
                data && data.head.map((el, i) => <th key={el} className={(i > 0) ? 'number' : ''}>{el}</th>)
              }
              </tr>
            </thead>
            <tbody>
              {
                data && data.body.map(el => (
                  <tr key={el[0]}>
                    <td>{el[0]}</td>
                    <td className="number">{formatNr(el[1], ' ')}</td>
                    <td className="number">{formatNr(el[2], ' ')}</td>
                    <td className="number percentage">
                      <CountUp
                        duration={4}
                        easingFn={easingFn}
                        end={el[3]}
                        prefix="+"
                        separator=" "
                        suffix="%"
                        useEasing
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
