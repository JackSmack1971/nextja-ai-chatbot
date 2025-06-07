'use client';

import { type ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  CheckCircleFillIcon,
  ChevronDownIcon,
  SettingsIcon,
} from './icons';
import { toast } from './toast';
import { Textarea } from './ui/textarea';
import { useLocalStorage } from 'usehooks-ts';

const DEFAULT_SYSTEM_PROMPT = 'You are a friendly assistant! Keep your responses concise and helpful.';

export function SystemPromptSettings({
  chatId,
  className,
}: {
  chatId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useLocalStorage(
    `system-prompt-${chatId}`,
    DEFAULT_SYSTEM_PROMPT
  );
  const [editedPrompt, setEditedPrompt] = useState(systemPrompt);

  const handleSave = () => {
    setSystemPrompt(editedPrompt);
    setOpen(false);
    toast({
      type: 'success',
      description: 'System prompt updated successfully',
    });
  };

  const handleReset = () => {
    setEditedPrompt(DEFAULT_SYSTEM_PROMPT);
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    setOpen(false);
    toast({
      type: 'success',
      description: 'System prompt reset to default',
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button
          data-testid="system-prompt-settings"
          variant="outline"
          className="hidden md:flex md:px-2 md:h-[34px]"
        >
          <SettingsIcon />
          Settings
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[400px] p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-md font-medium">System Prompt</h3>
          <p className="text-xs text-muted-foreground">
            Customize how the AI responds by changing the system prompt.
          </p>
          <Textarea 
            value={editedPrompt} 
            onChange={(e) => setEditedPrompt(e.target.value)}
            placeholder="Enter system prompt..."
            className="min-h-[150px]"
          />
          <div className="flex justify-end mt-2">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}