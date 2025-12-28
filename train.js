console.log("Jack Ma Maslahatlari:");
const list = [
    "yaxshi talaba bo'ling",                            //0-20
    "to'g'ri boshliq tanlang va koproq xato qiling",    //20-30
    "o'zingizga ishlashni boshlang",                    //30-40
    "siz kuchli bo'lgan narslarni qiling",              //40-50
    "yoshlarga investitsiya qiling",                    //50-60
    "endi dam oling foydasi yo'q endi"                  //60~
];

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


async function maslahatBer(a) {
    if (typeof a !== "number") throw new Error("Insert a number");
    else if (a<=20) return list[0];
    else if (a>20 && a<=30) return list[1];
    else if (a>30 && a<=40) return list[2];
    else if (a>40 && a<=50) return list[3];
    else if (a>50 && a<=60) return list[4];
    else{
        return new Promise((resolve, reject) => {
            setTimeout (() => {
                resolve(list[5]);
            }, 5000);
        });    
        // setTimeout(function () {
        //     return list[5];;
        // }, 5000);
    }
}

//them, catch
// console.log('Passed here 0');
// maslahatBer(25).then(data  => {
//     console.log("javob", data);
// }).catch(err => {
//     console.log("error:", err);
// });
// console.log("passed here 1");

async function run() {
    let javob = await maslahatBer(20);
    console.log(javob);
    javob = await maslahatBer(31);
    console.log(javob);
    javob = await maslahatBer(42);
    console.log(javob);
}
run;