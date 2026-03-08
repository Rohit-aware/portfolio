export interface TerminalCommand {
  readonly label:   string
  readonly section: string
}

export const TERMINAL_COMMANDS: readonly TerminalCommand[] = [
  { label: './projects',   section: 'projects'   },
  { label: './experience', section: 'experience' },
  { label: './skills',     section: 'skills'     },
  { label: './contact',    section: 'contact'    },
] as const
