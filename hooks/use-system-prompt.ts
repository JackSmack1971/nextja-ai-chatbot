'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const DEFAULT_SYSTEM_PROMPT = 'You are a friendly assistant! Keep your responses concise and helpful.';

export function useSystemPrompt(chatId: string) {
  const [systemPrompt, setSystemPrompt] = useLocalStorage(
    `system-prompt-${chatId}`,
    DEFAULT_SYSTEM_PROMPT
  );

  return {
    systemPrompt,
    setSystemPrompt,
  };
}