import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = {
  scenarios: {
    constant_rate_test: {
      executor: 'constant-arrival-rate',
      rate: 25, // iterations per timeUnit
      timeUnit: '500ms', // time unit
      duration: '1m', // total duration of test
      preAllocatedVUs: 10, // initial VUs to allocate
      maxVUs: 1000, // max VUs to allow
    },
  },
};

export default function () {
    const resp = http.get('http://test.k6.io/');
    sleep(1);
    check(resp, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 400ms': (r) => r.timings.duration < 400,
    });
}

export function handleSummary(data) {
    return {
        './report/reportScenario.html': htmlReport(data),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}