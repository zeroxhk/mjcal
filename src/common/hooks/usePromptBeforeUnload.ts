import { useEventListener } from 'usehooks-ts';

export const usePromptBeforeUnload = (
  message: string,
  { active = true }: { active?: boolean } = {},
) =>
  useEventListener('beforeunload', e => {
    if (!active) return;

    e.preventDefault();
    e.returnValue = message;
    return message;
  });
