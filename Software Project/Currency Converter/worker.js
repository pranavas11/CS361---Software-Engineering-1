const { time } = require('console');
const fs = require('fs');
const zmq = require("zeromq");
const sock = zmq.socket('pull');

const fileReturn = {};

const currencyInfoCheck = {
    "USD": "The United States dollar is the official currency of the United States and several other countries. The Coinage Act of 1792 introduced the U.S. dollar. The U.S. dollar was originally defined under a bimetallic standard of 23.22 grains (1.505 g) fine gold. The Gold Standard Act of 1900 linked the dollar solely to gold. From 1934, its equivalence to gold was revised to $35 per troy ounce. Since 1971 all links to gold have been repealed.",
    "GBP": "Sterling (ISO code: GBP) is the official currency of the United Kingdom and its associated territories. The pound (sign: £) is the main unit of sterling, and the currency itself may be referred by the term British pound, although this is not an official name of the currency. One pound sterling is subdivided into 100 pence sterling. Sterling is the world's oldest currency that is still in use and that has been in continuous use since its inception.",
    "EUR": "The euro (symbol: €; code: EUR) is the official currency of 19 out of the 27 member states of the European Union. This group of states is known as the eurozone or, officially, the euro area, and includes about 349 million citizens as of 2019. The euro is divided into 100 cents. The euro is the second-largest reserve currency as well as the second-most traded currency in the world after the United States dollar.",
    "CAD": "The Canadian dollar (symbol: $; code: CAD) is the currency of Canada. It is abbreviated with the dollar sign $, or sometimes CA$, Can$ or C$ to distinguish it from other dollar-denominated currencies. It is divided into 100 cents (¢). Owing to the image of a common loon on its back, the dollar coin, and sometimes the unit of currency itself, are sometimes referred to as the loonie by English-speaking Canadians and foreign exchange traders and analysts.",
    "AUD": "The Australian dollar (sign: $; code: AUD) is the currency of Australia, including its external territories: Christmas Island, Cocos (Keeling) Islands, and Norfolk Island. It is officially used as currency by three independent Pacific Island states: Kiribati, Nauru, and Tuvalu. Within Australia, it is almost always abbreviated with the dollar sign ($), with A$ or AU$ sometimes used to distinguish it from other dollar-denominated currencies.",
    "INR": "The Indian rupee (symbol: ₹; code: INR) is the official currency of India. The rupee is subdivided into 100 paise (singular: paisa), though as of 2019, coins of denomination of 1 rupee is the lowest value in use. The issuance of the currency is controlled by the Reserve Bank of India. The Reserve Bank manages currency in India and derives its role in currency management on the basis of the Reserve Bank of India Act, 1934.",
    "NZD": "The New Zealand dollar (sign: $, NZ$; code: NZD) is the official currency and legal tender of New Zealand, the Cook Islands, Niue, the Ross Dependency, Tokelau, and a British territory, the Pitcairn Islands. Within New Zealand, it is almost always abbreviated with the dollar sign ($). In the context of currency trading, the New Zealand dollar is sometimes informally called the 'Kiwi' or 'Kiwi dollar'.",
    "JPY": "The yen (symbol: ¥; code: JPY; also abbreviated as JP¥) is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar (US$) and the euro. It is also widely used as a third reserve currency after the US dollar and the euro. The New Currency Act of 1871 introduced Japan's modern currency system, with the yen defined as 1.5 g of gold, and divided decimally into 100 sen or 1,000 rin.",
    "BRL": "The Brazilian real (sign: R$; code: BRL) is the official currency of Brazil. It is subdivided into 100 centavos. The Central Bank of Brazil is the central bank and the issuing authority. The real replaced the cruzeiro real in 1994. The current real was introduced in 1994 at 1 real = 2,750 cruzeiros reais. As of April 2019, the real was the twentieth most traded currency.",
    "RUB": "The Ruble (code: RUB) is the official currency of the Russian Federation. The Ruble is subdivided into 100 kopecks (sometimes written as copeck or kopek). The first Russian ruble (code: RUR) replaced the Soviet ruble (code: SUR) in September 1993 at parity or 1 SUR = 1 RUR. In 1998, preceding the financial crisis, the current ruble was redenominated with the new code 'RUB' and was exchanged at the rate of 1 RUB = 1,000 RUR.",
    "KWD": "The Kuwaiti dinar (code: KWD) is the currency of Kuwait. It is sub-divided into 1,000 fils. As of 2022, the Kuwaiti dinar is the currency with the highest value per base unit, with KD 1 equalling US$3.32, just ahead of the Bahraini dinar with BD 1 equalling US$2.65. The dinar was introduced in 1961 to replace the Gulf rupee, equal to the Indian rupee.",
    "JOD": "The Jordanian dinar (code: JOD; unofficially abbreviated as JD) has been the currency of Jordan since 1950. The dinar is divided into 10 dirhams, 100 qirsh (also called piastres) or 1000 fulus. It is pegged to the US dollar. The Central Bank of Jordan commenced operations in 1964 and became the sole issuer of Jordanian currency, in place of the Jordan Currency Board. The Jordanian dinar is also widely used in the West Bank alongside the Israeli shekel.",
    "BHD": "The dinar (code: BHD) is the currency of Bahrain. It is divided into 1000 fils. The Bahraini dinar is abbreviated د.ب (Arabic) or BD (Latin). It is usually represented with three decimal places denoting the fils. The name dinar derives from the Roman denarius. As of December 2021, the Bahraini dinar is the second highest-valued currency unit, at 2.65 United States dollars per unit (the highest-valued unit is the Kuwaiti dinar at $3.32).",
    "OMR": "The Omani Rial (code: OMR) is the currency of Oman. It is divided into 1000 baisa. From 1973 to 1986, the rial was pegged to the U.S. dollar at 1 Omani rial = US$2.895. The rate was changed in 1986 to 1 Omani rial = US$2.6008, which translates to approximately US$1 = 0.384497 rial. The Central Bank of Oman buys U.S. dollars at 0.384 Omani rial, and sell U.S. dollars at 0.385 Omani rial. It is the third-highest-valued currency unit in the world.",
    "CNY": "The renminbi (abbreviation: RMB; code: CNY) is the official currency of the People's Republic of China and one of the world's reserve currencies, ranking as the eighth most traded currency in the world as of April 2019. One yuan divides into 10 jiao, and a jiao in turn divides into 10 fen. The renminbi is issued by the People's Bank of China, the monetary authority of China."
};

const timeout = setTimeout(run, 1000);

async function run() {
    sock.connect("tcp://127.0.0.1:7000");
    console.log("Connected to server!");
    sock.on('message', function(msg) {
        //console.log(msg.toString());
        fileReturn[JSON.parse(msg.toString()).currency1] = currencyInfoCheck[JSON.parse(msg.toString()).currency1];
        fileReturn[JSON.parse(msg.toString()).currency2] = currencyInfoCheck[JSON.parse(msg.toString()).currency2];

        fs.writeFile('./data.json', JSON.stringify(fileReturn, null, 4), err => {
            if (err) {
                console.error(err);
                return;
            } else {
                console.log("\nCurrency information is successfully written to \"data.json\".");
            }
        })
    });
}