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
  "it": {
    "title": "Calcolatore dell'Età Cronologica | Rapido e Preciso",
    "description": "Calcola la tua età cronologica dalla tua data di nascita. Scopri la tua età in anni, mesi e giorni sulla base di qualsiasi data",
    "h1": "Calcolatore dell'Età Cronologica",
    "h2": "Che cos'è l'Età Cronologica",
    "h2Des1": "L'età cronologica significa l'età o il tempo trascorso dal momento in cui una persona nasce fino al momento in cui le viene chiesta l'età. È la misura dell'età in anni, mesi e giorni che si dà comunemente quando ci viene chiesto l'età.",
    "h2Des2": "Mentre l'età cronologica non può essere invertita, l'età biologica/epigenetica può esserlo.",
    "h2-2": "Come Calcolare l'Età Cronologica",
    "h2-2Des1": "L'età cronologica viene calcolata prendendo la differenza tra il giorno, il mese e l'anno di nascita e il giorno, il mese e l'anno in cui viene chiesta. Viene calcolata nella maggior parte dei test psicologici in base alla data in cui il test è stato eseguito e alla data di nascita.",
    "h2-3": "Età Biologica vs Età Cronologica",
    "h2-3Des1": "L'età cronologica è il numero di anni che sei stato vivo, mentre l'età biologica si riferisce a quanto sono vecchie le tue cellule e i tuoi tessuti in base alle prove fisiologiche.",
    "h2-3Des2": "L'età biologica può essere più giovane o più vecchia della tua età cronologica, a seconda del tuo stile di vita, della genetica e di altri fattori.",
    "h2-4": "Età Ossea vs Età Cronologica",
    "h2-4Des1": "L'età ossea è l'età delle ossa di una persona, che può essere diversa dalla sua età cronologica. Viene determinata facendo una radiografia della mano e del polso sinistri e confrontandola con un atlante dello sviluppo osseo.",
    "h2-5": "Età Mentale ed Età Cronologica",
    "h2-5Des1": "L'età mentale è un concetto legato all'intelligenza. Esamina come un individuo specifico, a un'età specifica, si comporta intellettualmente, rispetto alla prestazione intellettuale media per l'effettiva età cronologica di quell'individuo."
  },
  "ko": {
    "title": "연령 계산기 | 빠르고 정확한",
    "description": "생년월일로 나이를 계산합니다. 연, 월, 일 단위로 나이를 계산할 수 있습니다",
    "h1": "연령 계산기",
    "h2": "연령이란 무엇인가",
    "h2Des1": "연령이란 태어난 시점부터 현재까지 경과된 기간을 뜻합니다. 일반적으로 나이를 물었을 때 답하는 연, 월, 일 단위의 나이를 의미합니다.",
    "h2Des2": "연령은 역전될 수 없지만, 생물학적/후성 연령은 역전될 수 있습니다.",
    "h2-2": "연령 계산 방법",
    "h2-2Des1": "연령은 출생일과 현재일자의 년, 월, 일 차이를 계산해서 구합니다. 대부분의 심리 검사에서는 검사일과 생년월일 차이로 연령을 계산합니다.",
    "h2-3": "생물학적 연령 vs 연령",
    "h2-3Des1": "연령은 태어난 이후 경과한 년수인 반면, 생물학적 연령은 생리학적 증거에 따른 세포와 조직의 나이를 뜻합니다.",
    "h2-3Des2": "생물학적 연령은 생활 습관, 유전적 요인 등에 따라 연령보다 어릴 수도 있고 많을 수도 있습니다.",
    "h2-4": "골격 연령 vs 연령",
    "h2-4Des1": "골격 연령은 개인의 뼈 나이로, 연령과 다를 수 있습니다. 왼손과 손목 X-ray를 찍은 후 뼈 발달 차트와 비교하여 산정합니다.",
    "h2-5": "지능 연령과 연령",
    "h2-5Des1": "지능 연령은 지능과 관련된 개념으로, 특정 연령에서 그 개인의 지능이 같은 연령대 평균 지능과 비교해 어떤 수준인지를 봅니다."
  }
}

const parentNode = 'home';
mergeMessages(inputMessages, parentNode);