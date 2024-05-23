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
    "description": "学习如何快速准确地计算年龄。获取逐步说明和便捷工具以精确计算年龄。",
    "tableOfContents": "目录"
  },
  "es": {
    "description": "Aprende a calcular la edad cronológica de manera rápida y precisa. Obtén instrucciones paso a paso y herramientas útiles para un cálculo preciso de la edad.",
    "tableOfContents": "Tabla de Contenidos"
  },
  "pt": {
    "description": "Aprenda a calcular a idade cronológica de forma rápida e precisa. Obtenha instruções passo a passo e ferramentas práticas para um cálculo preciso da idade.",
    "tableOfContents": "Índice"
  },
  "de": {
    "description": "Erfahren Sie, wie Sie das chronologische Alter schnell und genau berechnen können. Erhalten Sie Schritt-für-Schritt-Anleitungen und praktische Werkzeuge für eine präzise Altersberechnung.",
    "tableOfContents": "Inhaltsverzeichnis"
  },
  "fr": {
    "description": "Apprenez à calculer l'âge chronologique rapidement et précisément. Obtenez des instructions étape par étape et des outils pratiques pour un calcul précis de l'âge.",
    "tableOfContents": "Table des Matières"
  },
  "it": {
    "description": "Impara a calcolare l'età cronologica in modo rapido e preciso. Ottieni istruzioni passo passo e strumenti utili per un calcolo preciso dell'età.",
    "tableOfContents": "Indice"
  },
  "ja": {
    "description": "年齢を迅速かつ正確に計算する方法を学びましょう。正確な年齢計算のためのステップバイステップの手順と便利なツールを手に入れましょう。",
    "tableOfContents": "目次"
  },
  "ko": {
    "description": "연령을 빠르고 정확하게 계산하는 방법을 배우십시오. 정확한 연령 계산을 위한 단계별 지침과 유용한 도구를 제공받으세요.",
    "tableOfContents": "목차"
  }
}




const parentNode = 'howToCalculateChronoAge';
mergeMessages(inputMessages, parentNode);