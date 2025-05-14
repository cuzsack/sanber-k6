import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = {
vus: 3, // Virtual user
duration: '5s', // Durasi pengujian
};

export default function () {
    const resp = http.get('https://kasirdemo.vercel.app/')
    sleep(1);
    check(resp, {
        'status is 200': (r) => r.status === 200,
    });
}

export function handleSummary(data) {
    return {
        './report/report.html': htmlReport(data),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}