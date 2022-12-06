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

var gender;
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
   
    var res = {};
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
        data['count'] = 0;
        count++;
    });

    res['boys'] = data;
    count = 0;
    data = {};
    
    girls_shuffled.forEach(i => {
        var tmp_data = {};
        girls_prof.forEach(j => {
            tmp_data[j] = {'saw': 0, 'clicked': 0};
        });
        tmp_data['count'] = 0;
        tmp_data['name'] = i;
        data[count] = tmp_data;
        data['count'] = 0;
        count++;
    });
    res['girls'] = data;

    const qRef = ref(getDatabase());
    set(qRef, res);
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

    var qRef = ref(getDatabase(), `${gender}/${index}`);
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
        document.getElementById((i+1).toString()).innerHTML += ' (' + (100 * clicked[i] / sum) + '%)';
    }
    
    set(qRef, data);
    qRef = ref(getDatabase(), gender + '/count');
    snapshot = await get(qRef);
    data = snapshot.val();
    hideLoader();
    set(qRef, data+1);
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
        const max = Math.max(Object.values(res));
        if (data[i]['saw'] < max)
        {
            var max_name;
            for (let j in res)
            {
                if (res[j] === max) 
                {
                    max_name = j;
                    break;
                }
            }
            res.delete(max_name);
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
        const min = Math.min(Object.values(res));
        if (data[i]['result'] / data[i]['saw'] > min)
        {
            var min_name;
            for (let j in res)
            {
                if (res[j] === min) 
                {
                    min_name = j;
                    break;
                }
            }
            res.delete(min_name);
            res[i] = data[i]['clicked'] / data[i]['saw'];
        }
    }
    return Object.keys(res);
}

async function nextName()
{
    const index_of_index = Math.floor(Math.random() * indexes.length);
    index = indexes[index_of_index];
    const qRef = ref(getDatabase(), gender + '/' + index);
    indexes.splice(index_of_index, 1);
    if (!indexes.length)
    {
        count++;
        const qRef = ref(getDatabase(), gender + '/' + (count+1) * 10);
        const snapshot = await get(qRef);
        const data = snapshot.val();
        if (!data)
        {
            return;
            // finish game, the names has done
        }
        indexes = Array.from({length: 10}, (_, i) => (count*10 + i));
    }
    var snapshot = await get(qRef);
    data = snapshot.val();
    document.getElementById('name').innerHTML = 'מה ' + data['name'] + ' יותר:';
    var small = false;
    for (let i in data)
    {
        if (data[i]['saw'] < 5) {
            small = true;
            break;
        }
    }
    // if the db is small for this profession
    var res = small ? get4MinSaw(data) : getTop4(data);
    for (let i = 0; i < 4; i++)
    {
        document.getElementById((i+1).toString()).innerText = res[i];
    }
    hideLoader();
}

async function start(gender1)
{
    showLoader();
    gender = gender1;
    document.querySelector('.start-container').classList.add('hidden');
    document.querySelector('.main-container').classList.remove('hidden');
    
    indexes = [...Array(Math.floor(10)).keys()];
    
    nextName();
}

window.start = start;
window.showResult = showResult;
window.nextName = nextName;