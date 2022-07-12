// Selectors
var from = document.querySelector('.foreign_input');
var to = document.querySelector('.translated_input');
var translateBtn = document.querySelector('.t_btn');
var autoLanguage = document.querySelector('.select_from');
var insertLanguage = document.querySelector('.select_to');
var translated = document.querySelector('.translated_input');
// Event Listeners
translateBtn.addEventListener('click', allInOne);
function allInOne() {
    var foreign = from.value;
    fetchDetection(foreign)
}
// Suported Leanguage
var leanguages = {
    Afrikaans:"af",Albanian:"sq",Amharic:"am",Arabic:"ar",Armenian:"hy",Azerbaijani:"az",Basque:"eu",Belarusian:"be",Bengali:"bn",Bosnian:"bs",Bulgarian:"bg",Catalan:"ca",Cebuano:"ceb",ChineseS:"zh-CN",Chinese:"zh-TW",Corsican:"co",Croatian:"hr",Czech:"cs",Danish:"da",Dutch:"nl",English:"en",Esperanto:"eo",Estonian:"et",Finnish:"fi",French:"fr",Frisian:"fy",Galician:"gl",Georgian:"ka",German:"de",Greek:"el",Gujarati:"gu",HaitianCreole:"ht",Hausa:"ha",Hawaiian:"haw",Hebrew:"iw",Hindi:"hi",Hmong:"hmn",Hungarian:"hu",Icelandic:"is",Igbo:"ig",Indonesian:"id",Irish:"ga",Italian:"it",Japanese:"ja",Javanese:"jv",Kannada:"kn",Kazakh:"kk",Khmer:"km",Kinyarwanda:"rw",Korean:"ko",Kurdish:"ku",Kyrgyz:"ky",Lao:"lo",Latin:"la",Latvian:"lv",Lithuanian:"lt",Luxembourgish:"lb",Macedonian:"mk",Malagasy:"mg",Malay:"ms",Malayalam:"ml",Maltese:"mt",Maori:"mi",Marathi:"mr",Mongolian:"mn",Myanmar:"my",Nepali:"ne",Norwegian:"no",Nyanja:"ny",Odia:"or",Pashto:"ps",Persian:"fa",Polish:"pl",Portuguese:"pt",Punjabi:"pa",Romanian:"ro",Russian:"ru",Samoan:"sm",ScotsGaelic:"gd",Serbian:"sr",Sesotho:"st",Shona:"sn",Sindhi:"sd",Sinhala:"si",Slovak:"sk",Slovenian:"sl",Somali:"so",Spanish:"es",Sundanese:"su",Swahili:"sw",Swedish:"sv",Tagalog:"tl",Tajik:"tg",Tamil:"ta",Tatar:"tt",Telugu:"te",Thai:"th",Turkish:"tr",Turkmen:"tk",Ukrainian:"uk",Urdu:"ur",Uyghur:"ug",Uzbek:"uz",Vietnamese:"vi",Welsh:"cy",Xhosa:"xh",Yiddish:"yi",Yoruba:"yo",Zulu:"zu",
}
// create option in html for evry suported leanguage
var suportedLanguages = Object.keys(leanguages);
suportedLanguages.forEach((lang) => {
    var option =  document.createElement('option')
    option.classList.add('options')
    option.innerHTML = `${lang}`;
    insertLanguage.appendChild(option)
})
// Leanguage detection
const detection = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '54b34002bemsh83765f641ced1d4p10956ejsn932c47e21a92',
		'X-RapidAPI-Host': 'google-translate78.p.rapidapi.com'
	},
	body: '{"text":"hello, how are you?"}'
};

async function fetchDetection (e){
    // Change body with input text
    detection.body = `{"text":"${e}"}`
    // post input text and get respont with var data
    var response =  await fetch('https://google-translate78.p.rapidapi.com/language_detect', detection)
    var data = await response.json();
    // insert detected language initial
    var detectedLanguageinitial = data.language_detection.language
    // this function will find key in object with it value
    function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
    // use function above to find leanguage with it initial  
    var detectedLanguage = getKeyByValue(leanguages,detectedLanguageinitial)
    // change language name in translator
    autoLanguage.innerHTML = detectedLanguage;
    // create inserted leanguage
    var toLanguage = insertLanguage.value;
    var toLanguageInitial = leanguages[toLanguage]
    fetchTranslate(from.value,detectedLanguageinitial,toLanguageInitial);
}
// Translate
const translate = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '54b34002bemsh83765f641ced1d4p10956ejsn932c47e21a92',
		'X-RapidAPI-Host': 'google-translate78.p.rapidapi.com'
	},
	body: '{"text":"hello, how are you?","source":"en","target":"fr"}'
};
async function fetchTranslate(foreign,from,to,){
    translate.body = `{"text":"${foreign}","source":"${from}","target":"${to}"}`
    var response =  await fetch('https://google-translate78.p.rapidapi.com/translate', translate)
    var data = await response.json();
    translated.value = data.translations.translation; 
}
