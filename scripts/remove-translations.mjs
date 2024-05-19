import * as fs from 'fs';
import * as path from 'path';

function removeTranslationFields(translationDataString, messagesDir) {
  const translationData = JSON.parse(translationDataString);

  Object.entries(translationData).forEach(([lang, data]) => {
    const filePath = path.join(messagesDir, `${lang}.json`);

    if (fs.existsSync(filePath)) {
      const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const updatedData = removeFields(existingData, data);
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    }
  });
}

function removeFields(existingData, fieldsToRemove) {
  const updatedData = { ...existingData };

  Object.entries(fieldsToRemove).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      updatedData[key] = removeFields(updatedData[key], value);
      if (Object.keys(updatedData[key]).length === 0) {
        delete updatedData[key];
      }
    } else {
      delete updatedData[key];
    }
  });

  return updatedData;
}

// 使用示例
const translationDataString = `{
  "en": {
    "home": {
      "title1": "I am title"
    }
  },
  "zh": {
    "home": {
      "title1": "我是标题"
    }
  }
}`;

const messagesDir = './messages';
removeTranslationFields(translationDataString, messagesDir);