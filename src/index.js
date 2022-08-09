/**
 * This script is supposed to be executed periodically.
 * 
 * It'll fetch all new advertisements from JobSoul,
 * then send a private notification with the new ones, if any.
 */

const fetch = require('node-fetch');
const { parse } = require('node-html-parser');

(async () => {
    const req = await fetch("http://www.jobsoul.it/SoulWeb/ricercaTirocini.action", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "upgrade-insecure-requests": "1",
            "Referer": "http://www.jobsoul.it/SoulWeb/ricercaTirocini.action",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "ricercaLibera=&sedeTirocinio=ROMA&orderBy=&numeroPagina=1&universita=26&area=EE1B7093-6FAA-4576-A139-2CA95E644C25&tipoTirocinio=C&rimborsoSpese=",
        "method": "POST"
    });

    const document = parse(await req.text());
    const jobDivs = document.querySelectorAll('.grid_24.ol');
    const jobs = [...jobDivs].map(jobDiv => ({
        id: 'https://www.jobsoul.it/SoulWeb/' + jobDiv.querySelector('.ol-title').getAttribute('href'),
        title: jobDiv.querySelector('.ol-title').textContent.trim(),
        company: jobDiv.querySelector('.ol-attr > b').textContent.trim(),
        compensation: jobDiv.querySelector('.ol-attr').textContent.split('//')[2].trim(),
        duration: jobDiv.querySelector('.ol-attr').textContent.split('//')[3].trim(),
    }));

    console.log(jobs);
})().catch(err => console.error(err));