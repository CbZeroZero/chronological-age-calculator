import fs from 'fs';
import path from 'path';

const messagesDir = './messages';

function mergeMessages(messages, parentNode = '') {
  for (const [lang, langMessages] of Object.entries(messages)) {
    const filePath = path.join(messagesDir, `${lang}.json`);

    let fileContent = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    if (parentNode) {
      if (!fileContent[parentNode]) {
        fileContent[parentNode] = {};
      }

      fileContent[parentNode] = {
        ...fileContent[parentNode],
        ...langMessages,
      };
    } else {
      fileContent = {
        ...fileContent,
        ...langMessages,
      };
    }

    fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
  }
}

const inputMessages =
{
  "zh": {
    "january": "一月",
    "february": "二月",
    "march": "三月",
    "april": "四月",
    "may": "五月",
    "june": "六月",
    "july": "七月",
    "august": "八月",
    "september": "九月",
    "october": "十月",
    "november": "十一月",
    "december": "十二月"
  },
  "es": {
    "january": "enero",
    "february": "febrero",
    "march": "marzo",
    "april": "abril",
    "may": "mayo",
    "june": "junio",
    "july": "julio",
    "august": "agosto",
    "september": "septiembre",
    "october": "octubre",
    "november": "noviembre",
    "december": "diciembre"
  },
  "pt": {
    "january": "janeiro",
    "february": "fevereiro",
    "march": "março",
    "april": "abril",
    "may": "maio",
    "june": "junho",
    "july": "julho",
    "august": "agosto",
    "september": "setembro",
    "october": "outubro",
    "november": "novembro",
    "december": "dezembro"
  },
  "de": {
    "january": "Januar",
    "february": "Februar",
    "march": "März",
    "april": "April",
    "may": "Mai",
    "june": "Juni",
    "july": "Juli",
    "august": "August",
    "september": "September",
    "october": "Oktober",
    "november": "November",
    "december": "Dezember"
  },
  "fr": {
    "january": "janvier",
    "february": "février",
    "march": "mars",
    "april": "avril",
    "may": "mai",
    "june": "juin",
    "july": "juillet",
    "august": "août",
    "september": "septembre",
    "october": "octobre",
    "november": "novembre",
    "december": "décembre"
  },
  "it": {
    "january": "gennaio",
    "february": "febbraio",
    "march": "marzo",
    "april": "aprile",
    "may": "maggio",
    "june": "giugno",
    "july": "luglio",
    "august": "agosto",
    "september": "settembre",
    "october": "ottobre",
    "november": "novembre",
    "december": "dicembre"
  },
  "ja": {
    "january": "1月",
    "february": "2月",
    "march": "3月",
    "april": "4月",
    "may": "5月",
    "june": "6月",
    "july": "7月",
    "august": "8月",
    "september": "9月",
    "october": "10月",
    "november": "11月",
    "december": "12月"
  },
  "ko": {
    "january": "1월",
    "february": "2월",
    "march": "3월",
    "april": "4월",
    "may": "5월",
    "june": "6월",
    "july": "7월",
    "august": "8월",
    "september": "9월",
    "october": "10월",
    "november": "11월",
    "december": "12월"
  }
}





const parentNode = 'calclator';
mergeMessages(inputMessages, parentNode);