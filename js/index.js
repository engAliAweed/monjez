let liaddser = document.getElementById('liaddser');
let lireser = document.getElementById('lireser');
let liregis = document.getElementById('liregis');
let lilogin = document.getElementById('lilogin'); 
let btnexit = document.getElementById('btnexit'); 
let service = false;
let bool = false;
let registers = false;
let pService = {};//كائن لتخزين المستخدم
let sService = {}; //كائن لتخزين الخدمات  المضافة
let reserv = {}; //كائن لتخزين الحجوزات

if (localStorage.getItem('registers') === 'true') {
    registers = true;
}

if (localStorage.getItem('service') === 'true') {
    service = true;
}

//----------------------------------------------------------------------------

let sun = document.getElementById("sun")
let moon = document.getElementById("moon")
function toggleMode() {
  

    document.body.classList.toggle("dark-mode");
    sun.classList.toggle('hidden');
    moon.classList.toggle('hidden');
}




//-------------------------------------------------------------------------------------------
// تحديد منشي الحساب
let btnprov = document.getElementById('btnprov'); 
let btncust = document.getElementById('btncust');   

function addprov() {
    
    document.getElementById('sercust').style.display = "none";
    document.getElementById('btnprov').style.display = "none";
    document.getElementById('btncust2').style.display = "none";

    document.getElementById('btncust').style.display = "inline-block";
    document.getElementById('btnprov2').style.display = "inline-block";
    document.getElementById('serprov').style.display = "block";
    service = true;
  

}
function addcust() {
    document.getElementById('btnprov2').style.display = "none";
    document.getElementById('btncust').style.display = "none";
    document.getElementById('serprov').style.display = "none";
    document.getElementById('btnprov').style.display = "inline-block";
    document.getElementById('btncust2').style.display = "inline-block";
    document.getElementById('sercust').style.display = "block";
    service = false;
   
}
//------------------------------------------------------------------------------------------

//تخزين مستخدمين

let Users ;
if (localStorage.users != null) {
    Users = JSON.parse(localStorage.users)

} else { 
 Users =[];
}

function addUsers(event) {
    event.preventDefault(); 
    if (service) {

         pService = {
            pName: document.getElementById('pName').value,
            pService: service,
            pEmail: document.getElementById('pEmail').value,
            pPassword: document.getElementById('pPassword').value,
            pDescription: document.getElementById('pDescription').value,
            pLocation: document.getElementById('pLocation').value,
            pPhone: document.getElementById('pPhone').value,

        }


        if (!pService.pName || !pService.pEmail || !pService.pPassword || !pService.pDescription || !pService.pLocation || !pService.pPhone) {
            alert("يرجى ملء جميع الحقول المطلوبة");
            return;
        }
        console.log(pService);
        Users.push(pService);
        localStorage.setItem('users', JSON.stringify(Users) )
        alert(` تم انشاء الحساب  !  
             قم بتسجيل الدخول`);
        window.location.href = "login.html";


    } else {
         pService = {
            pName: document.getElementById('cName').value,
            pService: service,
            pEmail: document.getElementById('cEmail').value,
            pPassword: document.getElementById('cPassword').value,
            cPay: document.getElementById('cPayment').value,
            pLocation: document.getElementById('cLocation').value,
            pPhone: document.getElementById('cPhone').value,

                    }

            if (!pService.pName||!pService.pEmail||!pService.pPassword||!pService.cPay ||!pService.pLocation || !pService.pPhone) {
                alert("يرجى ملء جميع الحقول المطلوبة");
                return;
            }

        Users.push(pService);
        localStorage.setItem('users', JSON.stringify(Users))
        alert(` تم انشاء الحساب  !  
              قم بتسجيل الدخول`);
        window.location.href = "login.html";

    }
    
}

 //--------------------------------------------------------------------------------------------
//تاكيد الدخول 

function logins(event) {
    event.preventDefault(); 
    let logEmail = document.getElementById('logEmail').value;
    let logPassword = document.getElementById('logPassword').value;

    let found = false; 

    for (let i = 0; i < Users.length; i++) {
        if (Users[i].pEmail === logEmail && Users[i].pPassword === logPassword) {
            alert(`${Users[i].pName} مرحبًا بك!`);
            found = true;
            registers = true;

            localStorage.setItem('registers', 'true');
            localStorage.setItem('service', Users[i].pService ? 'true' : 'false');

            window.location.href = "index.html";
            return; 
        }
    }


    if (!found) {
        
        if (confirm("الحساب غير موجود. هل تريد إنشاء حساب جديد؟")) {
            window.location.href = "Register.html"; 
        }
    }
}

//---------------------------------------------------------------------------------------

//لي التحكم في التخصص الظاهر

let fieldSelect = document.getElementById("field");
let fieldDoc = document.getElementById("fielddoc");
let fieldPro = document.getElementById("fieldpro");
let fieldEng = document.getElementById("fieldeng");
let fieldTeach = document.getElementById("fieldteach");
let field = "";

function hideAllSpecialties() {
    fieldDoc.style.display = "none";
    fieldPro.style.display = "none";
    fieldEng.style.display = "none";
    fieldTeach.style.display = "none";
}

if (document.title ==="addService") { 
hideAllSpecialties();
}
if (document.title === "addService") {
    fieldSelect.onchange = () => {
        hideAllSpecialties();
        switch (fieldSelect.value) {
            case "طب":
                fieldDoc.style.display = "block";
                field = "طب";
                break;
            case "برمجة":
                fieldPro.style.display = "block";
                field = "برمجة";
                break;
            case "انشاء":
                fieldEng.style.display = "block";
                field = "انشاء";
                break;
            case "تعليم":
                fieldTeach.style.display = "block";
                field = "تعليم";
                break;
        }
    }
};

//---------------------------------------------------
//لتخزين الخدمه المضافة
let programs;
if (localStorage.program != null) {
    programs = JSON.parse(localStorage.program)

} else {
    programs = [
        { name: "م.أحمد جمال", specializ: "ويب", typeServ: "تصميم موقع", Description: "مطور واجهات أمامية", Location: "طرابلس", Price: "100", Time: "2025-09-10", Date:"13:15", img: "img/photo_30_2025-08-23_05-23-15.jpg" },
        { name: "م.سارة علي", specializ: "تطبيقات", typeServ: "تطوير تطبيق", Description: "متخصصة تطبيقات موبايل", Location: "بنغازي", Price: "150", Time: "2025-10-01", Date: "10:15", img: "img/photo_35_2025-08-23_05-23-15.jpg" },
        { name: "م.محمود سامي", specializ: "قواعد بيانات", typeServ: "تصميم قاعدة بيانات", Description: "خبير قواعد بيانات", Location: "مصراتة", Price: "120", Time: "2025-09-25", Date: "08:15", img: "img/photo_31_2025-08-23_05-23-15.jpg" },
        { name: "م.نور الهدى", specializ: "منظومات", typeServ: "برمجة نظام", Description: "مهندسة نظم معلومات", Location: "سبها", Price: "180", Time: "2025-11-05", Date: "15:00", img: "img/photo_35_2025-08-23_05-23-15.jpg" },
        { name: "م.مودة ياسين", specializ: "ويب", typeServ: "موقع تفاعلي", Description: "خبير React وVue", Location: "الزاوية", Price: "130", Time: "2025-10-20", Date: "11:00", img: "img/photo_9_2025-08-23_05-23-15.jpg" },
        { name: "م.مصطفي عادل", specializ: "قواعد بيانات", typeServ: "تحليل بيانات", Description: "محللة بيانات", Location: "طرابلس", Price: "110", Time: "2025-09-15", Date: "16:15", img: "img/photo_12_2025-08-23_05-23-15.jpg" },
        { name: "م.خالد فتحي", specializ: "منظومات", typeServ: "تطوير ERP", Description: "مطور أنظمة مؤسسات", Location: "البيضاء", Price: "160", Time: "2025-11-18", Date: "14:30", img: "img/photo_11_2025-08-23_05-23-15.jpg" },
        { name: "م.رنا عبد الله", specializ: "تطبيقات", typeServ: "تصميم UI/UX", Description: "مصممة واجهات استخدام", Location: "زليتن", Price: "95", Time: "2025-09-30", Date: "12:15", img: "img/photo_1_2025-08-16_16-28-58.jpg" },
        { name: "م.سليم ناصر", specializ: "منظومات", typeServ: "تكامل أنظمة", Description: "مبرمج نظم متكاملة", Location: "درنة", Price: "170", Time: "2025-12-01", Date: "09:30", img: "img/photo_11_2025-08-23_05-23-15.jpg" },
        { name: "م.سميرة حسين", specializ: "ويب", typeServ: "موقع WordPress", Description: "مطورة مواقع ووردبريس", Location: "طرابلس", Price: "90", Time: "2025-10-10", Date: "12:00", img: "img/photo_32_2025-08-23_05-23-15.jpg" }
    ];
}

let doctors;
if (localStorage.doctor != null) {
    doctors = JSON.parse(localStorage.doctor)

} else {
    doctors = [
        { name: "د.سالم عبد الله", specializ: "جراحة عامة", typeServ: "كشف جراحي", Description: "طبيب جراحة عامة", Location: "طرابلس، مستشفى الأمل", Price: "40", Time: "2025-09-20", Date: "08:15", img: "img/photo_1_2025-08-23_05-23-15.jpg" },
        { name: "د.محمد عبد القادر", specializ: "مخ واعصاب", typeServ: "جلسة تقييم", Description: "خبيرة بالأمراض العصبية", Location: "بنغازي، عيادة العافية", Price: "55", Time: "2025-08-28", Date: "13:15", img: "img/photo_2025-08-23_06-23-56.jpg" },
        { name: "د.نجلاء حسين", specializ: "عظام", typeServ: "جلسة علاج", Description: "متخصص في إصابات العظام", Location: "طرابلس، المركز الطبي", Price: "45", Time: "2025-12-20", Date: "12:00", img: "img/photo_6_2025-08-23_05-23-15.jpg" },
        { name: "د.طارق محمد", specializ: "جراحة عامة", typeServ: "كشف", Description: "جراح عام معتمد", Location: "زليتن، مستشفى النور", Price: "35", Time: "2025-09-05", Date: "09:15", img: "img/photo_3_2025-08-23_05-23-15.jpg" },
        { name: "د.عبد الرحمن خالد", specializ: "قلب", typeServ: "فحص ECG", Description: "متخصص في القلب والشرايين", Location: "درنة، عيادة الرحمة", Price: "28", Time: "2025-11-10", Date: "09:15", img: "img/photo_4_2025-08-23_05-23-15.jpg" },
        { name: "د.ليلى محمد", specializ: "قلب", typeServ: "كشف عام", Description: "أخصائية في أمراض القلب", Location: "بنغازي، مصحة الشفاء", Price: "30", Time: "2025-11-01", Date: "13:30", img: "img/photo_28_2025-08-23_05-23-15.jpg" },
        { name: "د.علي صالح", specializ: "اطفال", typeServ: "كشف عام", Description: "استشاري في امراض الاطفال", Location: "طرابلس، مصحة السندان", Price: "25", Time: "2025-12-12", Date: "09:15", img: "img/photo_26_2025-08-23_05-23-15.jpg" },
        { name: "د.فاطمة عمر", specializ: "عظام", typeServ: "كشف وفحص", Description: "أخصائية في مشاكل العظام", Location: "مصراتة، عيادة الحياة", Price: "35", Time: "2025-10-05", Date: "13:00", img: "img/photo_29_2025-08-23_05-23-15.jpg" },
        { name: "د.يوسف حسن", specializ: "مخ واعصاب", typeServ: "استشارة عصبية", Description: "استشارية أمراض الأعصاب", Location: "سبها، مركز الأعصاب", Price: "50", Time: "2025-12-01", Date: "14:15", img: "img/photo_25_2025-08-23_05-23-15.jpg" },
        { name: "د.آمنة عبد العزيز", specializ: "اطفال", typeServ: "استشارة أطفال", Description: "أخصائية رعاية الأطفال", Location: "طبرق، مستوصف المدينة", Price: "20", Time: "2025-10-15", Date: "12:15", img: "img/photo_28_2025-08-23_05-23-15.jpg" }
          ];

}

let engineers;
if (localStorage.engineer != null) {
    engineers = JSON.parse(localStorage.engineer)

} else {
    engineers = [
        { name: "م.محمد علي", specializ: "بناء", typeServ: "تنفيذ مشروع", Description: "مهندس بناء خبرة أكثر من 15 سنة", Location: "طرابلس - السراج", Price: "500", Time: "2025-09-01", Date: "12:15", img: "img/photo_39_2025-08-23_05-23-15.jpg" },
        { name: "م.فاطمة عادل", specializ: "تصميم الديكورات", typeServ: "تصميم داخلي", Description: "مهندسة ديكور محترفة", Location: "بنغازي - الفويهات", Price: "350", Time: "2025-09-10", Date: "08:15", img: "img/photo_38_2025-08-23_05-23-15.jpg" },
        { name: "م.أحمد يوسف", specializ: "كهرباء", typeServ: "تمديدات كهربائية", Description: "فني كهرباء معتمد", Location: "مصراتة - الزهور", Price: "400", Time: "2025-10-01", Date: "13:00", img: "img/photo_41_2025-08-23_05-23-15.jpg" },
        { name: "م.ابراهيم ناصر", specializ: "سباكة", typeServ: "صيانة سباكة", Description: "فنية سباكة منزلية وتجارية", Location: "سبها - وسط المدينة", Price: "300", Time: "2025-11-01", Date: "09:15", img: "img/photo_37_2025-08-23_05-23-15.jpg" },
        { name: "م.سالم إبراهيم", specializ: "بناء", typeServ: "بناء دور", Description: "مقاول إنشائي بخبرة واسعة", Location: "زليتن - شارع الجلاء", Price: "600", Time: "2025-09-20", Date: "15:15", img: "img/photo_36_2025-08-23_05-23-15.jpg" },
        { name: "م.عبد الله عمر", specializ: "كهرباء", typeServ: "صيانة كهرباء", Description: "مهندس كهرباء صناعية", Location: "البيضاء - شارع طرابلس", Price: "420", Time: "2025-10-18", Date: "13:15", img: "img/photo_40_2025-08-23_05-23-15.jpg" },
        { name: "م.مسعود محمود", specializ: "سباكة", typeServ: "تركيب أنظمة مياه", Description: "مهندسة أنظمة صحية", Location: "طرابلس - الهضبة", Price: "310", Time: "2025-10-25", Date: "16:15", img: "img/photo_37_2025-08-23_05-23-15.jpg" },
        { name: "م.نادر سالم", specializ: "بناء", typeServ: "مشروع كامل", Description: "خبير في تنفيذ الأبنية الحديثة", Location: "بنغازي - طريق المطار", Price: "700", Time: "2025-11-10", Date: "14:15", img: "img/photo_39_2025-08-23_05-23-15.jpg" },
        { name: "م.هدى عبد الله", specializ: "تصميم الديكورات", typeServ: "تصميم غرف", Description: "متخصصة ديكور داخلي للمنازل", Location: "طبرق", Price: "360", Time: "2025-12-12", Date: "17:15", img: "img/photo_33_2025-08-23_05-23-15.jpg" },
        { name: "م.رغد حسين", specializ: "تصميم الديكورات", typeServ: "ديكور خارجي", Description: "خبيرة تصميم واجهات", Location: "درنة", Price: "380", Time: "2025-12-05", Date: "12:40", img: "img/photo_34_2025-08-23_05-23-15.jpg" },

    ];
}

let teachs;
if (localStorage.teach != null) {
    teachs = JSON.parse(localStorage.teach)

} else {
    teachs =  [
        { name: "أ.محمد علي", specializ: "فيزياء", typeServ: "دورة فيزياء", Description: "مدرس فيزياء بخبرة 10 سنوات", Location: "بنغازي - حي دبي", Price: "45", Time: "2025-10-01", Date: "13:15", img: "img/photo_13_2025-08-23_05-23-15.jpg" },
        { name: "أ.احمد عبد الرحمن", specializ: "كيمياء", typeServ: "شرح تفاعلي", Description: "خبيرة في الكيمياء العضوية", Location: "مصراتة - طريق الجامعة", Price: "50", Time: "2025-09-20", Date: "15:15", img: "img/photo_20_2025-08-23_05-23-15.jpg" },
        { name: "أ.سالم يوسف", specializ: "اللغةالعربية", typeServ: "تقوية لغوية", Description: "مدرس لغة عربية للمرحلة الإعدادية", Location: "الزاوية", Price: "35", Time: "2025-10-05", Date: "14:15", img: "img/photo_17_2025-08-23_05-23-15.jpg" },
        { name: "أ.هبة عبد السلام", specializ: "اللغةالانجليزية", typeServ: "تحضير TOEFL", Description: "مدرسة إنجليزية معتمدة", Location: "سبها - شارع المدارس", Price: "60", Time: "2025-11-01", Date: "09:15", img: "img/photo_22_2025-08-23_05-23-15.jpg" },
        { name: "أ.ياسين الطاهر", specializ: "رياضيات", typeServ: "حل تمارين", Description: "محلل رياضيات وخبير أولمبياد", Location: "درنة", Price: "45", Time: "2025-09-25", Date: "15:15", img: "img/photo_14_2025-08-23_05-23-15.jpg" },
        { name: "أ.سمية حسن", specializ: "فيزياء", typeServ: "دروس مسجلة", Description: "مدرسة فيزياء للثانوية", Location: "طبرق", Price: "40", Time: "2025-10-18", Date: "11:15", img: "img/photo_18_2025-08-23_05-23-15.jpg" },
        { name: "أ.رنا إبراهيم", specializ: "اللغةالانجليزية", typeServ: "محادثة وتواصل", Description: "مدرسة محادثة إنجليزية", Location: "بنغازي", Price: "55", Time: "2025-11-10", Date: "14:15", img: "img/photo_21_2025-08-23_05-23-15.jpg" },
        { name: "أ.مروان عبد الباسط", specializ: "كيمياء", typeServ: "فهم الأساسيات", Description: "أستاذ كيمياء جامعي", Location: "البيضاء", Price: "50", Time: "2025-10-30", Date: "14:15", img: "img/photo_15_2025-08-23_05-23-15.jpg" },
        { name: "أ.خديجة أحمد", specializ: "رياضيات", typeServ: "درس خصوصي", Description: "مدرسة رياضيات للثانوي", Location: "طرابلس - حي الأندلس", Price: "40", Time: "2025-09-15", Date: "16:15", img: "img/photo_19_2025-08-23_05-23-15.jpg" },
        { name: "أ.عبير حسن", specializ: "اللغةالعربية", typeServ: "تأسيس قواعد", Description: "مدرس قواعد لغة عربية", Location: "طرابلس - سوق الجمعة", Price: "30", Time: "2025-08-28", Date: "15:15", img: "img/photo_23_2025-08-23_05-23-15.jpg" },

    ];
}

let reservation;
if (localStorage.reservation != null) {
    reservation = JSON.parse(localStorage.reservation)

} else {
    reservation = [];
}

function addServProv() {

    let sName = document.getElementById("sName");
    let specialty = "";
    let typServ = document.getElementById("typServ");
    let sDescription = document.getElementById("sDescription");
    let sPrice = document.getElementById("sPrice");
    let sLocation = document.getElementById("sLocation");
    let sTime = document.getElementById("sTime");
    let sDate = document.getElementById("sDate");
    let imgs = '';
    switch (fieldSelect.value) {
        case "طب":
            specialty = fieldDoc.value;
            imgs = "img/photo_3_2025-08-23_18-09-16.jpg";
            break;
        case "برمجة":
            specialty = fieldPro.value;
            imgs = "img/photo_4_2025-08-23_18-09-16.jpg";
            break;
        case "انشاء":
            specialty = fieldEng.value;
            imgs = "img/photo_2_2025-08-23_18-09-16.jpg";
            break;
        case "تعليم":
            imgs = "img/photo_1_2025-08-23_18-09-16.jpg";
            specialty = fieldTeach.value;
            break;
    }

    if (!sName.value || !specialty|| !typServ.value || !sDescription.value || !sPrice.value || !sLocation.value || !sTime.value) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return;
    }

    sService = {

        name: sName.value,
        specializ: specialty,
        typeServ: typServ.value,
        Description: sDescription.value,
        Price: sPrice.value,
        Location: sLocation.value,
        Time: sTime.value,
        Date: sDate.value,
        img: imgs ,

    }

    switch (fieldSelect.value) {
        case "برمجة":
            programs.push(sService);
            localStorage.setItem('program', JSON.stringify(programs))

            break;
        case "طب":
            doctors.push(sService);
            localStorage.setItem('doctor', JSON.stringify(doctors))

            break;
        case "انشاء":
            engineers.push(sService);
            localStorage.setItem('engineer', JSON.stringify(engineers))

            break;
        case "تعليم":
            teachs.push(sService);
            localStorage.setItem('teach', JSON.stringify(teachs))

            break;
    }
    alert("تم الاضافة بنجاح");
    clear();
    window.location.href = "index.html";
   
}

//لتفريغ الحقول
function clear() {
    
    sName.value = '';
    fieldSelect.value = '';
    specialty = '';
    typServ.value = '';
    sDescription.value = '';
    sPrice.value = '';
    sLocation.value = '';
    sTime.value = '';
    hideAllSpecialties();

}

//--------------------------------------------------------------------------------------

function showService(arr,filer ) {
    let cards = '';
    for (let i = 0; i < arr.length; i++) {
        if (filer === "الكل") {
            cards += `
           <div class="card custom-card m-3 p-0    text-center align-items-center" style="width: 20rem;">
  <div class="image-container">
    <img src="${arr[i].img}" class="card-img-top" />
  </div>
  <div class="card-body">
    <h4 class="card-title">${arr[i].name}</h4>
    <h6 class="card-subtitle mb-2 text-body-secondary">${arr[i].specializ}</h6>
    <p class="card-text ">${arr[i].Description}</p>
    <button class="btn btn-outline-primary text-center d-block mx-auto show-offcanvas-btn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasScrolling"
                    data-index="${i}">
              عرض
            </button>
  </div>
</div>
        `
        }
        if (arr[i].specializ === filer) {
            cards += `
         <div class="card custom-card m-3 p-0    text-center align-items-center" style="width: 20rem;">
  <div class="image-container">
    <img src="${arr[i].img}" class="card-img-top" />
  </div>
  <div class="card-body">
    <h4 class="card-title">${arr[i].name}</h4>
    <h6 class="card-subtitle mb-2 text-body-secondary">${arr[i].specializ}</h6>
    <p class="card-text">${arr[i].Description}</p>
    <button class="btn btn-outline-primary text-center d-block mx-auto show-offcanvas-btn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasScrolling"
                    data-index="${i}">
              عرض
            </button>
  </div>
</div>
        `

        }
      
    }
    if (bool) {
    document.getElementById("servContainers").innerHTML = cards;
}
}


let arrService = '';
let rFields = '';

document.addEventListener('DOMContentLoaded', function () {
    let filters = document.getElementById("filters");
    hiden(registers, service)
    switch (document.title) {
       
        case "programpage":
            arrService = programs;
            rFields = 'برمجة';
            bool = true;
            break;
        case "doctorpage":
            arrService = doctors;
            rFields = 'طب';
            bool = true;
            break;
        case "teacherpage":
            arrService = teachs;
            rFields = 'تعليمي';
            bool = true;
            break;
        case "enginerpage":
            arrService = engineers;
            rFields = 'انشائي';
            bool = true;
            break;
        case "reservationpage":
            showReserva(reservation);

            break;
       
    }
    showService(arrService, "الكل");

    if (filters) {
        filters.addEventListener("change", function () {

            const selectedValue = filters.value;
            if (selectedValue === "الكل") {
                showService(arrService, "الكل");
                return;
            }
            
            showService(arrService, selectedValue);
        });
    }


});

//-----------------------------------------------------


function addReservation(i) {
    if (registers) {
        reserv = {
            name: arrService[i].name,
            types: arrService[i].typeServ,
            field: rFields,
            special: arrService[i].specializ,
            dates: arrService[i].Time,
            times: arrService[i].Date,
            condition: "في الانتظار",
            cod: "bg-warning",


        }


        reservation.push(reserv);
        localStorage.setItem('reservation', JSON.stringify(reservation))
        alert("تم الحجز بنجاح");
    } else {


        if (confirm(`يجب تسجيل الدخول اولا
        هل تريد التسجيل `)) {
            window.location.href = "login.html";
        }
    }
}

function showReserva(arr) {
    let rTable = '';
    
        for (let i = 0; i < arr.length; i++) {

            rTable += `
             <tr>
             <td>${arr[i].types}</td>
             <td> ${arr[i].name}</td>
              <td>${arr[i].field}</td>
                <td>${arr[i].special}</td>
                 <td>${arr[i].dates}</td>
                  <td>${arr[i].times}</td>
               <td><span class="badge ${arr[i].cod} text-white">${arr[i].condition}</span></td>
               <td>
               <button  onclick="sure(${i})" class="btn btn-success btn-sm m-1">تأكيد</button>
                 <button onclick="cancel(${i})" class="btn btn-danger btn-sm">إلغاء</button>
                  </td>
                 </tr>
        `
        }

        document.getElementById("bTable").innerHTML = rTable;
   

    
}
function sure(i) {
    reservation[i].condition = "ثم التاكيد";
    reservation[i].cod = "bg-success";
    showReserva(reservation);
    localStorage.setItem("reservation", JSON.stringify(reservation));
}
function cancel(i) {
    reservation[i].condition = "ثم الالغاء";
    reservation[i].cod = "bg-danger";
    showReserva(reservation);
    localStorage.setItem("reservation", JSON.stringify(reservation));
}

//-------------------------------------------------------

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("show-offcanvas-btn")) {
        // استخرج اسم المصفوفة و رقم العنصر
       
        const index = e.target.getAttribute("data-index");

        //// تأكد أن المصفوفة موجودة في النطاق العام (global)
        //const dataArray = arrService;
        //if (!dataArray || !dataArray[index]) {
        //    console.warn("العنصر غير موجود أو المصفوفة غير معرفة.");
        //    return;
        //}

        const item = arrService[index];

        // تحديث العنوان والمحتوى في offcanvas
        document.getElementById("offcanvasScrollingLabel").innerText = item.specializ;

        document.getElementById("offcanvasContent").innerHTML = `
        <div class="image-container">
                <img src="${item.img}" alt="${item.name}" class="img-fluid rounded mt-3" />
           
        </div>
          <div class="my-3">
              <label class="form-label fs-3  ">الاسم: </label>
              <span class=" fs-4 fw-bold  ">${item.name}</span>
            </div>
            <div class="my-3">
              <label class="form-label fs-4  ">نوع الخدمة: </label>
              <span class=" fs-5  ">${item.typeServ}</span>
            </div>
            <div class="mb-3">
              <label class="form-label fs-4">التخصص: </label>
              <span class=" fs-5  "> ${item.specializ}</span>
            </div>
            <div class="mb-3">
              <label class="form-label fs-4">الوصف:   </label>
              <span class=" fs-5  ">${item.Description}</span>
            </div>
            <div class="mb-3">
              <label class="form-label fs-4">السعر:   </label>
              <span class=" fs-5 ">${item.Price}   دينار  </span>
            </div>
            <div class="mb-3">
              <label class="form-label fs-4">العنوان:   </label>
              <span class=" fs-5  ">${item.Location}</span>
            </div>
            <div class="mb-3">
              <label class="form-label fs-4">الوقت المتاح:  </label>
               <span class=" fs-5 mx-2  ">${item.Date}</span>
              <span class=" fs-5  ">${item.Time}</span>
             

            </div>
             <button onclick="addReservation(${index})" class="btn btn-outline-primary px-2 fs-5 d-block mx-auto"> حجز </button>

        
           ` ;
    }
});

function hiden(registers, service) {
    if (registers) {
        if (service) {
            liaddser.style.display = "inline-block";
            lireser.style.display = "inline-block";
            btnexit.style.display = "inline-block";
            lilogin.style.display = "none";
            liregis.style.display = "none";

        } else {
            liaddser.style.display = "none";
            lireser.style.display = "inline-block";
            btnexit.style.display = "inline-block";
            lilogin.style.display = "none";
            liregis.style.display = "none";

        }


    } else {
        liaddser.style.display = "none";
        lireser.style.display = "none";
        btnexit.style.display = "none";
        lilogin.style.display = "inline-block";
        liregis.style.display = "inline-block";
    }
}


hiden(registers, service);

btnexit.addEventListener('click', () => {
    localStorage.removeItem('registers');
    localStorage.removeItem('service');
    window.location.href = "index.html";
});























