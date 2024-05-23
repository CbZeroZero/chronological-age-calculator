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
  {}



const parentNode = 'howToCalculateChronoAge';
mergeMessages(inputMessages, parentNode);