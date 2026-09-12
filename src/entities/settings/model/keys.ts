export const settingsKeys = {
  all: ['settings'],
  telegramSettings: () => [...settingsKeys.all, 'telegram-settings']
} as const;