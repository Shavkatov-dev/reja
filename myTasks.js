// 1- masala 
// asyns va awaitdan foydalanib 1. suv qaynatilmoqda.... 
// 3secunddan keyin , suv qaynadi , choyni damlang.... 
// 3 secunddan keyin , choy tayyor boldi deb consolega chiqaring

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async function makeTea() {
//   console.log("suv qaynatilmoqda...");
//   await wait(3000);

//   console.log("suv qaynadi , choyni damlang");
//   await wait(3000);

//   console.log("choy tayyor boldi ");
// }

// makeTea();


// // 2- masala 
// // 2 sekund => "Telefon zaryadga qo‘yildi..."
// // 3 sekund => "50% zaryad oldi..."
// // 2 sekund =>"100% bo‘ldi, zaryaddan olishingiz mumkin!!"

// async function chargeTel() {
//   await wait(2000);
//   console.log("Telefon zaryadga qo‘yildi...");

//   await wait(3000);
//   console.log("50% zaryad oldi...");

//   await wait(2000);
//   console.log("100% bo‘ldi, zaryaddan olishingiz mumkin!!");
// }

// chargeTel();


// 3- masala 
// consolega 1.  Serverga murojaat qilindi...
// (2 sekund kutadi)
//  2. Ma'lumot yuklanmoqda...
// (2 sekund kutadi)
// 3. Ma'lumot yuklandi: { id: 1, name: 'Boburbek', status: 'active' } va songida
// consolega  
// console.log("Ma'lumot yuklandi: ", data);
//   console.log(data.name, " Hush kelibsiz");
// ko'rinishida  ishlaydigan cod 

// function getDataFromServer() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({ id: 1, name: "Boburbek", status: "active" });
//     }, 2000);
//   });
// }

// async function loadData() {
//   console.log("Serverga murojaat qilindi...");
//   await wait(2000);

//   console.log("Ma'lumot yuklanmoqda...");
//   const data = await getDataFromServer();

//   console.log("Ma'lumot yuklandi:", data);
//   console.log(`${data.name} Xush kelibsiz. Sizning IDingiz: ${data.id}, va sizning profilingiz ${data.status} holatda!`);
// }

// loadData();


// try...catch nima?

// 👉 try...catch – bu xatoliklarni (error) tutish va ularni boshqarish uchun ishlatiladi.
// Normal holatda kodda xato bo‘lsa, dastur to‘xtab qoladi. Lekin try...catch ishlatilsa, biz xatoni “ushlab” olamiz va dastur davom etadi.  




// try {
//   let b = c + 5; //  c o'zgaruvchi e'lon qilinmagan
//   console.log(b);
// } catch (error) {
//   console.log("Xatolik yuz berdi:", error.message); // bu yerda c elon qilinmagani uchun tryda xatolik yuz berdi shuning uchun catch ishladi 

// // } 
// // Xatolik yuz berdi: c is not defined 





//4- masala  
// quyidagi 5 ta foydalanuvchi orasidan boburbek ismli foydalanuvvchi bor bolsa uni malumotlarini chiqarsin 
// agar yoq bolsa foydalanuvchi malumotlari topilmadi deb chiqarsin 
// bor holatni ham yoq holatni ham  ishlatib koring
// async await try catchlardan foydalaning 
// server foydalanuvchi malumotlarini 1 sekunddan keyin beradi

// [
//   { id: 1, name: "Ali", age: 25, city: "Tashkent" },
//   { id: 2, name: "Doston", age: 30, city: "Samarkand" },
//   { id: 3, name: "Boburbek", age: 22, city: "Busan" },
//   { id: 4, name: "Laylo", age: 28, city: "Fergana" },
//   { id: 5, name: "Nodir", age: 27, city: "Bukhara" },
// ];

const users = [
  { id: 1, name: "Ali", age: 25, city: "Tashkent" },
  { id: 2, name: "Doston", age: 30, city: "Samarkand" },
  { id: 3, name: "Boburbek", age: 22, city: "Busan" },
  { id: 4, name: "Laylo", age: 28, city: "Fergana" },
  { id: 5, name: "Nodir", age: 27, city: "Bukhara" },
];

function fetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => resolve(users), 1000);
  });
}

async function findUser(name) {
  try {
    const data = await fetchUsers();
    const user = data.find(u => u.name === name);

    if (!user) {
      throw new Error("foydalanuvchi malumotlari topilmadi");
    }

    console.log("foydalanuvchi malumotlari:", user);
  } catch (error) {
    console.log(error.message);
  }
}

findUser("Boburbek");




//5- masala  Promise bilan ishlash
// 0–9 oralig‘ida tasodifiy son chiqaring.
// Agar u juft bo‘lsa resolve, toq bo‘lsa reject.
// .then() va .catch() bilan natijani chiqaring. 

const randomGen = new Promise((resolve, reject) => {
  const num = Math.floor(Math.random() * 10);
  console.log("random raqam:", num);

  if (num % 2 === 0) {
    resolve("random raqam juft son!!! ");
  } else {
    reject("random raqam toq son!!!");
  }
});

randomGen
  .then(result => console.log(result))
  .catch(error => console.log(error));



// 6- masala 
//Bizda getUser degan funksiyamiz bor.
// Bu funksiya serverga ulanayotgandek qilib ishlaydi.
// Agar true berilsa — foydalanuvchi ma’lumotini qaytaradi.
// Agar false berilsa — xato (reject) qaytaradi.

//   bu holatni async / await va try...catch orqali hal qiling

function getUser(isSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve({ id: 1, name: "Boburbek" });
      } else {
        reject("Failed to get user");
      }
    }, 1000);
  });
}

async function handleUser(status) {
  try {
    const user = await getUser(status);
    console.log("User data:", user);
  } catch (error) {
    console.log("Error:", error);
  }
}

handleUser(true);
handleUser(false);


// 7- masala 
// Non tayyorlanmoqda ... 
// 2secunddan song 
// Tuxum qovurilmoqda ...
// Va yana 2 secunddan keyin 
// Nonushta tayyor marhamat, Yoqimli ishtaha 


// 8- masala  7- masalaga qoshimcha shartlar berilgan  
// Non tayyorlanmoqda ... 
// 2secunddan song 
// Tuxum qovurilmoqda ...
// Va yana 2 secunddan keyin 
// Nonushta tayyor marhamat, Yoqimli ishtaha  

// async function makeBreakfast() {
//   console.log("Non tayyorlanmoqda ...");
//   await wait(2000);

//   console.log("Tuxum qovurilmoqda ...");
//   await wait(2000);

//   console.log("Nonushta tayyor marhamat, Yoqimli ishtaha");
// }

// makeBreakfast();


// huddi shu masalaga qoshimcha shart
//Tuxum bor bo‘lsa → “🍳 Tuxum qovurilmoqda...”  yani yuqoridagi jarayon davom etadi 
// Tuxum tugagan bo‘lsa → “🍓 Murabbo bilan non tayyorlanmoqda...”
// Har bosqich orasida 2 soniya kutish.
// Yakunda: “☕️ Nonushta tayyor!”