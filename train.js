// F-TASK

// Shunday findDoublers function tuzing, unga faqat bitta string argument pass bolib,
// agar stringda bir hil harf qatnashgan bolsa true, qatnashmasa false qaytarishi kerak.
// MASALAN: getReverse("hello") return true return qiladi.

function findDoublers(str) {
  const count = {};

  for (const char of str) {
    if (count[char]) 
      return true;
    count[char] = 1;
  }
  return false;
}
const result = findDoublers("mittgroup");
console.log(result);


// E-TASK
// Shunday function tuzing, u bitta string argumentni qabul qilib osha stringni
// teskari qilib return qilsin.
// MASALAN: getReverse("hello") return qilsin "olleh".

// function getReverse(str) {
//   return str.split("").reverse().join("");
// }

// console.log(getReverse("hello")); 
// console.log(getReverse("aziza"));


// D-TASK

// Shunday class tuzing tuzing nomi Shop, va uni constructoriga 3 hil mahsulot pass bolsin,
// hamda classning 3ta methodi bolsin, biri qoldiq, biri sotish va biri qabul.
// Har bir method ishga tushgan vaqt ham log qilinsin.
// MASALAN: const shop = new Shop(4, 5, 2); 
// shop.qoldiq() => return hozir 20:40da 4ta non, 5ta lagmon va 2ta cola mavjud!
// shop.sotish('non', 3) & 
// shop.qabul('cola', 4) &
// shop.qoldiq() => return hozir 20:50da 1ta non, 5ta lagmon va 6ta cola mavjud!

// class Shop {
//     constructor(non, lagmon, cola) {
//         this.non = non;
//         this.lagmon = lagmon;
//         this.cola = cola;
//     }
//     time() {
//         const now = new Date();
//         return `${now.getHours()}:${now.getMinutes()}`;
//     }

//     qoldiq(product, quantity){
//         return `Hozir ${this.time()}da ${this.non}ta non, ${this.lagmon}ta lagmon va ${this.cola}ta cola mavjud!`;
//     };
//     sotish(product, quantity){
//         if(this[product] >= quantity) {
//             this[product] -= quantity;
//             console.log(`${this.time()}da ${quantity}ta ${product} sotildi`);
//         } else {
//             console.log(`${this.time()}da yetarli ${product} yuq`);
//         }
//     };
//     qabul(product, quantity) {
//         this[product] += quantity;
//         console.log(`${this.time()}da ${quantity}ta ${product} qabul qilindi`);
//     };
// };

// const shop = new Shop(4, 5, 2);

// console.log(shop.qoldiq());

// shop.sotish('non', 3);
// shop.qabul('cola', 4);

// console.log(shop.qoldiq());



// C-TASK

// Shunday function tuzing, u 2ta string parametr ega bolsin,
// hamda agar har ikkala string bir hil harflardan iborat bolsa true
// aks holda false qaytarsin.
// MASALAN checkContent("mitgroup", "gmtiprou") return qiladi true.

// function checkContent(a, b) {
//     if(a.length !== b.length ) // harflar soni teng busagina taqqoslab kursin
//         return false; 
//     let store = {}; // a ning char lari soni uchun object 

//     for (let char of a) {
//         store[char] = (store[char] || 0) + 1;
        
//     };
    
//     for (let char of b) {
//             if (!store[char]) return false; // store dagi key 'b' ning char iga teng bulmasa, 0da hamfalse
//             store[char]--;
//     };

//         return true;
//     }
//     const result = checkContent("mitgroup", "groupmit");
//     console.log(result);
// Task-B
// Shunday function tuzing, u 1ta string parametrga ega bolsin, 
// hamda osha stringda qatnashgan raqamlarni sonini bizga return qilsin.
//  MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return qiladi.\n\n@MITASK

// function countDigits(param) {
//     let count = 0;
//     for(const char of param) {
//         if(char >= '0' && char <= '9') { // char - bu string, shuning uchun raqamla "" ichida
//             count++;
//         }
//     }

//     console.log(count);
// }

// countDigits("sdoufhj3874yghn34y78fgh3984ndf29786rfg8e3bngyt34");

// TASK-A
// function letterCount(letter, word) {
//     let acc = 0;
//     for (const char of word) {
//         if (char === letter) {
//             acc++;
//         }
//     }
//     return acc;
// }


// letterCount("e", "engineer");


// console.log("Jack Ma Maslahatlari:");
// const list = [
//     "yaxshi talaba bo'ling",                            //0-20
//     "to'g'ri boshliq tanlang va koproq xato qiling",    //20-30
//     "o'zingizga ishlashni boshlang",                    //30-40
//     "siz kuchli bo'lgan narslarni qiling",              //40-50
//     "yoshlarga investitsiya qiling",                    //50-60
//     "endi dam oling foydasi yo'q endi"                  //60~
// ];

// function maslahatBer(a, callback) {
//     if (typeof a !== "number") callback("Insert a number", null);
//     else if (a<=20) callback(null, list[0]);
//     else if (a>20 && a<=30) callback(null, list[1]);
//     else if (a>30 && a<=40) callback(null, list[2]);
//     else if (a>40 && a<=50) callback(null, list[3]);
//     else if (a>50 && a<=60) callback(null, list[4]);
//     else{
//         setTimeout(function () {
//             callback(null, list[5]);
//         }, 5000);
//     }
// }




// console.log('Passed here 0');
// maslahatBer(40, (err, data) => {
//     if(err) console.log('ERROR', err);
//     else {
//         console.log("javob:", data);
//     }
// });
// console.log("passed here 1");


// async function maslahatBer(a) {
//     if (typeof a !== "number") throw new Error("Insert a number");
//     else if (a<=20) return list[0];
//     else if (a>20 && a<=30) return list[1];
//     else if (a>30 && a<=40) return list[2];
//     else if (a>40 && a<=50) return list[3];
//     else if (a>50 && a<=60) return list[4];
//     else{
//         return new Promise((resolve, reject) => {
//             setTimeout (() => {
//                 resolve(list[5]);
//             }, 5000);
//         });    
//         // setTimeout(function () {
//         //     return list[5];;
//         // }, 5000);
//     }
// }

// call via then, catch
// console.log('Passed here 0');
// maslahatBer(25)
    // .then(data  => {
    //     console.log("javob", data);
// })
//      .catch(err => {
//      console.log("error:", err);
// });
// console.log("passed here 1");

// async function run() {
//     let javob = await maslahatBer(20);
//     console.log(javob);
//     javob = await maslahatBer(31);
//     console.log(javob);
//     javob = await maslahatBer(42);
//     console.log(javob);
// }
// run;