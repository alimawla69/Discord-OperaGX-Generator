const axios = require('axios');
const fs = require('fs');
const crypto= require('crypto');
const readline = require('readline');

const a = '\x1b[31m(-)\x1b[0m';
const b = '\x1b[34m(+)\x1b[0m';
const c = '\x1b[32m(+)\x1b[0m';
const d = '\x1b[33m(!)\x1b[0m';

class E {
    constructor() {
        this.f = 0;
    }
}

const g = new E();

function h() {
    const i = new Date().toLocaleTimeString();
    const j = `[${'\x1b[90m'}${i}${'\x1b[0m'}]`;
    return j;
}

async function k(l) {
    while (true) {
      

        try {
            let p;
            if (l !== null) {
                const [q, r] = l.split('@');
                const [s, t] = q.split(':');
                const [u, v] = r.split(':');
                p = await axios.post('https://api.discord.gx.games/v1/direct-fulfillment',  {
                    partnerUserId: crypto.randomUUID(),
                 }, {
                    headers: { "Origin": "https://www.opera.com",},
                    proxy: {
                        host: u,
                        port: v,
                        auth: {
                            username: s,
                            password: t
                        }
                    },
                    timeout: 5000
                });
            } else {
                p =  await axios.post('https://api.discord.gx.games/v1/direct-fulfillment', {
                    partnerUserId: crypto.randomUUID(),
                 },{ headers: {
                    "Origin": "https://www.opera.com",
                  },});
            }

            if (p.status === 200) {
                const w = p.data.token;
                if (w) {
                    g.f += 1;
                    console.log(`${h()} ${c} Generated Promo Link: https://discord.com/billing/partner-promotions/1180231712274387115/${w}`);
                    fs.appendFileSync("promos.txt", `https://discord.com/billing/partner-promotions/1180231712274387115/${w}\n`);
                }
            } else if (p.status === 429) {
                console.log(`${h()} ${d} You are being rate-limited!`);
            } else {
                console.log(`${h()} ${a} Request failed : ${p.status}`);
            }
        } catch (x) {
            console.log(`${h()} ${a} Request Failed: ${x.message}`);
        }
    }
}

async function run() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const z = await new Promise((resolve) => {
        rl.question(`${h()} ${b} Enter Number Of Threads : `, (answer) => {
            resolve(parseInt(answer));
            rl.close();
        });
    });

    const aa = fs.readFileSync("proxies.txt", "utf-8").split('\n').filter(Boolean);

    const ab = [];
    for (let ac = 0; ac < z; ac++) {
        const ad = aa.length > 0 ? aa[Math.floor(Math.random() * aa.length)] : null;
        const ae = k(ad);
        ab.push(ae);
    }

    await Promise.all(ab);
}

run();
