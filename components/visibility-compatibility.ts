'use client';

// 提供与原visibility-selector兼容的类型定义和函数，但实际上不执行任何可见性控制
export type VisibilityType = 'private' | 'public';

export const DEFAULT_VISIBILITY: VisibilityType = 'private';

export function useChatVisibility({ chatId, initialVisibilityType }: { 
  chatId: string; 
  initialVisibilityType: VisibilityType 
}) {
  return {
    visibilityType: DEFAULT_VISIBILITY,
    setVisibilityType: (_: VisibilityType) => {}
  };
}