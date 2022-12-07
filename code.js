import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";

import {
    getDatabase,
    ref,
    set,
    get,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-0bgqTgRYPdvRuPTfePJudvTl87Q_C6Y",
    authDomain: "stevejobs-509fa.firebaseapp.com",
    databaseURL: "https://stevejobs-509fa-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "stevejobs-509fa",
    storageBucket: "stevejobs-509fa.appspot.com",
    messagingSenderId: "416431698299",
    appId: "1:416431698299:web:1168d970865923a7fb8dde",
    measurementId: "G-78PS6F5PPN"
  };

const app = initializeApp(firebaseConfig);
getAnalytics(app);

var indexes;
var data;
var count = 0;
var index;

// fill_db();

// use only at first
function fill_db()
{
    const boys_prof = `מציל, מעצב שיער, רואה חשבון, עורך דין, רופא, טייס, מורה, בעל פיצוציה, אברך, מוסכניק, קצב, כדורגלן, עובד זבל, מנתח, דוגמן, מהנדס, מתכנת, טכנאי, שרברב, נהג מונית, אב בית, קבלן, אדריכל, מורה לספורט, מדריך טיולים, טבח, שף, כדורסלן, זמר, ראפר, חקלאי, שוטר, ספר, סטנדאפיסט, מאמן כושר, עיתונאי, שופט, איש צבא, חוקר פרטי, צייר, צלם, מאבטח, מנכ"ל, אחמ"ש, שליח, מלצר, מקעקע, רופא שיניים, רוקח, נגר, פסיכולוג, קואוצ'ר, בנקאי, ברמן`.split(', ');
    const girls_prof = `מזכירה, גננת, סייעת, אחות, רואת חשבון, עורכת דין, רופאה, מורה, קוסמטיקאית, מנתחת, דוגמנית, מהנדסת, מתכנתת, עקרת בית, אדריכלית, מדריכת טיולים, טבחית, שפית, זמרת, שוטרת, ספרית, סטנדאפיסטית, דיאטנית, עיתונאית, שופטת, ציירת, צלמת, מנכ"לית, אחמ"שית, מלצרית, מארחת, מקעקעת, רופאת שיניים, רוקחת, עובדת סוציאלית, מורה לחינוך מיוחד, אשת שיווק, קופאית, שדכנית, מנהלת בית ספר, ספרנית, פסיכולוגית, יועצת בית ספר, קונדיטורית, סטייליסטית, כוכבת רשת, בנקאית, ברמנית`.split(', ');
    var boys_names = `משה, נתאי, נדב, ליאב, יאיר, יהונתן, נועם, נעם, אורי, יונתן, אוריה, אסף, אסי, הרצל, נחום, אבי, אברהם, אביגדור, אלי, אליהו, אלכס, שרגא, אליעזר, דימה, בוריס, סרגיי, מוחמד, אחמד, מחמוד, שמעון, אוהד, יואב, ידידיה, יוסף, יוסי, יוני, מרדכי, אשר, מוטי, יוחנן, יוחאי, אפרים, אפי, ברוך, צור, אריאל, יהלי, אייל, אלישע, יוסוף, עמית, נתי, מתי, מתתיהו, נתנאל, אמציה, ירון, ירין, יניב, אלירן, נהוראי, מנחם, דולב, עומר, עומרי, נטע, אריק, יצחק, איציק, אברם, סלומון, יוגב, צבי, צביקה, קובי, יעקב, שלמה, שמואל, שמוליק, נחמן, עידן, גיא, מוסטפא`.split(', ');
    var girls_names = `ספיר, נופר, אורטל, זהבה, לימור, חנה, לאה, שרה, יפה, רבקה, אור, דבורה, רותי, מרים, רבקה, רחל, נועה, עמית, דניאלה, מזל, אסתר, אסתי, ליטל, מיטל, אביטל, אביגיל, ירוס, ליאת, אפרת, בת אל, ליאור, סיון, שוהם, שהם, יעל, שבות, יסכה, עדן, מבשרת, רעות, אוריה, הלל, זוהר, הדר, אדר, שירי, שירה, שיר, שיראל, אדוה, ימית, גל, הודיה, אודיה, דניאל, תהל, ציפי, ציפורה, מרגלית, מלכה, מלי, מגי, ג'מילה, יסמין, אמירה, בלה, קסנדרה, קסניה, ילנה, מירי, מרים, אדל, תמר, מיה, מאיה, ליבי, איילה, איילת, פאטמה, היבה`.split(', ');
    let boys_shuffled = boys_names
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
    let girls_shuffled = girls_names
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
   
    var data = {};
    var count = 0;
    boys_shuffled.forEach(i => {
        var tmp_data = {};
        boys_prof.forEach(j => {
            tmp_data[j] = {'saw': 0, 'clicked': 0};
        });
        tmp_data['count'] = 0;
        tmp_data['name'] = i;
        data[count] = tmp_data;
        count += 2; // every even number is boy and odd is girl
    });
    count = 1;
    girls_shuffled.forEach(i => {
        var tmp_data = {};
        girls_prof.forEach(j => {
            tmp_data[j] = {'saw': 0, 'clicked': 0};
        });
        tmp_data['count'] = 0;
        tmp_data['name'] = i;
        data[count] = tmp_data;
        count += 2;
    });
    data['count'] = 0;

    const qRef = ref(getDatabase());
    set(qRef, data);
}

function showLoader() {
    document.querySelector(".loader-circle").hidden = false;
    document.querySelector(".loader-line").hidden = false;
    document.querySelector(".loader-clock").hidden = false;
    document.querySelector(".loader-text").hidden = false;
    document.querySelector(".dark-screen").hidden = false;
}

function hideLoader() {
    document.querySelector(".loader-circle").hidden = true;
    document.querySelector(".loader-line").hidden = true;
    document.querySelector(".loader-clock").hidden = true;
    document.querySelector(".loader-text").hidden = true;
    document.querySelector(".dark-screen").hidden = true;
}

async function showResult(profession)
{
    showLoader();

    var qRef = ref(getDatabase(), ''+index);
    var snapshot = await get(qRef);
    var data = snapshot.val();
    data['count']++;
    data[profession]['clicked']++;
    var clicked = [];
    var sum = 0;
    for (var i = 0; i < 4; i++)
    {
        const curr = document.getElementById((i+1).toString()).innerHTML;
        data[curr]['saw']++;

        clicked.push(data[curr]['clicked']);
        sum += data[curr]['clicked'];
    }
    for (var i = 0; i < 4; i++)
    {
        document.getElementById((i+1).toString()).innerHTML += ' (' + (100 * clicked[i] / sum).toFixed(0) + '%)';
    }
    
    set(qRef, data);
    qRef = ref(getDatabase(), '/count');
    snapshot = await get(qRef);
    data = snapshot.val();
    set(qRef, data+1);
    hideLoader();
}

function get4Random()
{
    var res = [];
    var keys = Object.keys(data);
    var arr = [];
    while(arr.length < 4) {
        var r = Math.floor(Math.random() * (keys.length-2));
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    for (var i = 0; i < 4; i++)
    {
        res.push(keys[arr[i] + 2]);
    }
    return res;
}

// if there's no enough data, i want to give the professions with
// the lowest saw values.
function get4MinSaw()
{
    var res = {};
    var keys = Object.keys(data);
    for (let i = 0; i < 4; i++)
    {
        var key = keys[i+2];
        res[key] = data[key]['saw'];
    }
    for (let i of keys)
    {
        const max = Math.max(...Object.values(res));
        if (data[i]['saw'] < max)
        {
            for (let j in res)
            {
                if (res[j] === max && !(i in res)) 
                {
                    delete res[j];
                    break;
                }
            }
            res[i] = data[i]['saw'];
        }
    }
    return Object.keys(res);
}

// if there's enough data.
// קופי פייסט מוגזם.
function getTop4()
{
    var res = {};
    var keys = Object.keys(data);
    for (let i = 0; i < 4; i++)
    {
        var key = keys[i+2];
        res[key] = data[key]['clicked'] / data[key]['saw'];
    }
    for (let i of keys)
    {
        const min = Math.min(...Object.values(res));
        if (data[i]['result'] / data[i]['saw'] > min)
        {
            var min_name;
            for (let j in res)
            {
                if (res[j] === min && !(i in res)) 
                {
                    min_name = j;
                    break;
                }
            }
            delete res[min_name];
            res[i] = data[i]['clicked'] / data[i]['saw'];
        }
    }
    return Object.keys(res);
}

function endGame()
{
    document.querySelector('.game').classList.add('hidden');
    document.querySelector('.end').classList.remove('hidden');
}

async function nextName()
{
    const index_of_index = Math.floor(Math.random() * indexes.length);
    index = indexes[index_of_index];
    const qRef = ref(getDatabase(), ''+index);
    indexes.splice(index_of_index, 1);
    if (!indexes.length)
    {
        count++;
        const qRef = ref(getDatabase(), ''+(count+1) * 10);
        const snapshot = await get(qRef);
        const data = snapshot.val();
        if (!data)
        {
            endGame();
        }
        indexes = Array.from({length: 10}, (_, i) => (count*10 + i));
    }
    var snapshot = await get(qRef);
    data = snapshot.val();
    document.getElementById('name').innerHTML = 'מה ' + data['name'] + ' יותר:';
    var small = false;
    var big = false;
    for (let i in data)
    {
        if (data[i]['saw'] > 5)
            big = true;
        if (data[i]['saw'] < 5)
            small = true;
    }
    // if the db is small for this profession
    var res;
    if (!big)
        res = get4Random();
    else if (big && small)
        res = get4MinSaw();
    else
        res = getTop4();
    for (let i = 0; i < 4; i++)
    {
        document.getElementById((i+1).toString()).innerText = res[i];
    }
    hideLoader();
}

async function start()
{
    showLoader();
    document.querySelector('.start').classList.add('hidden');
    document.querySelector('.main').classList.remove('hidden');
    
    indexes = [...Array(Math.floor(10)).keys()];
    
    nextName();
}

window.start = start;
window.showResult = showResult;
window.nextName = nextName;