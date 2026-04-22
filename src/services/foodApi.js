import axiosInstance from './axiosInstance';

export async function searchRecipesByIngredient(
  ingredient,
  start = 1,
  end = 20,
) {
  const key = import.meta.env.VITE_FOOD_API_KEY;
  const url = `https://openapi.foodsafetykorea.go.kr/api/${key}/COOKRCP01/json/${start}/${end}/RCP_PARTS_DTLS=${encodeURIComponent(ingredient)}`;
  const { data } = await axiosInstance.get(url);
  return data.COOKRCP01?.row || [];
}

function splitIngredients(text) {
  const result = [];
  let current = '';
  let depth = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') {
      depth++;
      current += ch;
    } else if (ch === ')') {
      depth--;
      current += ch;
    } else if (ch === ',' && depth === 0) {
      if (current.trim()) result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

export function parseIngredients(partsText, recipeName = '') {
  if (!partsText) return [];

  const nameNorm = recipeName.trim().replace(/\s/g, '');
  const normalized = partsText.replace(/\n/g, ',');

  const sectionTitles = [
    '재료',
    '고명',
    '양념',
    '소스',
    '드레싱',
    '토핑',
    '육수',
    '반죽',
    '튀김옷',
    '절임',
    '밑간',
    '국물',
  ];

  return (
    splitIngredients(normalized)
      .map((s) => s.trim())
      .filter((s) => {
        if (!s) return false;
        return s.replace(/\s/g, '') !== nameNorm;
      })
      .map((s) => {
        if (nameNorm && s.replace(/\s/g, '').startsWith(nameNorm)) {
          return s.slice(recipeName.trim().length).trim();
        }
        return s;
      })
      .filter((s) => !sectionTitles.includes(s))
      // '재료 피망(5g)' 처럼 섹션 제목이 앞에 붙은 경우 제거
      .map((s) => {
        for (const title of sectionTitles) {
          if (s.startsWith(title + ' ')) {
            return s.slice(title.length).trim();
          }
        }
        return s;
      })
      .filter(
        (s) => !s.startsWith('-') && !s.startsWith('•') && !s.startsWith('·'),
      )
      .filter((s) => !s.includes(':'))
      .filter(Boolean)
  );
}

export function extractIngredientName(ingredient) {
  return ingredient
    .replace(/\(.*?\)/g, '')
    .replace(
      /\s*\d+(\.\d+)?\/?\d*\s*(g|kg|ml|l|T|t|개|마리|컵|큰술|작은술|인분|장|줄|쪽|봉|통|팩|조각|적당량|약간|조금|뚝|토막|포기|단|줌|꼬집|방울|알|병|캔|봉지|cm|mm).*/i,
      '',
    )
    .trim();
}

export function parseManualSteps(recipe) {
  const steps = [];
  for (let i = 1; i <= 20; i++) {
    const padded = String(i).padStart(2, '0');
    const desc = recipe[`MANUAL${padded}`];
    const image = recipe[`MANUAL_IMG${padded}`];
    if (desc && desc.trim()) {
      steps.push({ step: i, desc: desc.trim(), image: image || '' });
    }
  }
  return steps;
}
