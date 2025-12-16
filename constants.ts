// API Configuration
export const API_KEY = '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';
export const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
export const MODEL_NAME = 'google/gemma-3n-e2b-it:free';

// Spec: Fallback answers (Offline mode)
export const FALLBACK_ANSWERS = [
  "現在不是時機。",
  "放手去做。",
  "時間會證明一切。",
  "答案在你心中。",
  "結果將出乎意料。",
  "再等一會兒。",
  "這無關緊要。",
  "別傻了。",
  "你心裡早有答案。",
  "相信你的直覺。"
];

// Spec: Prompt Template
// Using a combined prompt strategy because the model doesn't support system roles well.
export const PROMPT_TEMPLATE = `你是一本神秘的「解答之書」。不管使用者問什麼，你都只能給出一句簡短、神秘、像預言一樣的繁體中文回答。不要解釋原因，不要像個助手，只要給出結果或啟發。字數限制在 15 字以內。

關鍵行為準則：
1. 非對話性：不要說「你好」或反問。
2. 去脈絡化：回答必須是「通用的」或「象徵性的」。
3. 簡潔性：10-20 個中文字。
4. 權威感：使用肯定句。

使用者的問題是：{{User_Input}}`;

export const DEFAULT_QUERY_PLACEHOLDER = "[使用者正在心中默念一個問題]";