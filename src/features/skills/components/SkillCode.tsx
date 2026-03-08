import React, { memo } from 'react'
import { SKILLS_DATA } from '@/features/skills/constants/skills'
import { TIER_TOKENS, VSCODE_TOKENS } from '@/features/skills/constants/terminal'
import CodeLine from '@/features/skills/components/CodeLine'
import type { SkillCategory } from '@/types'

interface SkillCodeProps {
  readonly category: SkillCategory
  readonly revealed: number
}

const SkillCode: React.FC<SkillCodeProps> = memo(({ category, revealed }) => {
  const group = SKILLS_DATA.find(g => g.category === category)
  if (!group) return null

  const varName = category.replace(/[^a-zA-Z]/g, '').toLowerCase() + 'Skills'

  type Line = { content: React.ReactNode }
  const lines: Line[] = []

  lines.push({ content: <span className={VSCODE_TOKENS.comment}>{'// ' + category + ' — tech stack'}</span> })
  lines.push({ content: <span className={VSCODE_TOKENS.comment}>{'//'}</span> })

  lines.push({ content: <>
    <span className={VSCODE_TOKENS.keyword}>export const </span>
    <span className={VSCODE_TOKENS.prop}>{varName}</span>
    <span className={VSCODE_TOKENS.punct}> = {'{'}</span>
  </> })

  group.skills.forEach(skill => {
    const tok     = TIER_TOKENS[skill.tier]
    const propKey = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '_')
    lines.push({ content: <>
      <span className="pl-4" />
      <span className={VSCODE_TOKENS.prop}>{propKey}</span>
      <span className={VSCODE_TOKENS.punct}>: </span>
      <span className={VSCODE_TOKENS.string}>'{skill.name}'</span>
      <span className={VSCODE_TOKENS.punct}>,</span>
      <span className="ml-3" style={{ color: tok.comment }}>{'// ' + tok.badge}</span>
    </> })
  })

  lines.push({ content: <>
    <span className={VSCODE_TOKENS.punct}>{'} '}</span>
    <span className={VSCODE_TOKENS.keyword}>as const</span>
  </> })
  lines.push({ content: <></> })

  lines.push({ content: <>
    <span className={VSCODE_TOKENS.keyword}>type </span>
    <span className={VSCODE_TOKENS.type}>{category.replace(/[^a-zA-Z]/g, '')}Tier</span>
    <span className={VSCODE_TOKENS.punct}> = </span>
    <span className={VSCODE_TOKENS.string}>'expert'</span>
    <span className={VSCODE_TOKENS.punct}> | </span>
    <span className={VSCODE_TOKENS.string}>'proficient'</span>
    <span className={VSCODE_TOKENS.punct}> | </span>
    <span className={VSCODE_TOKENS.string}>'familiar'</span>
  </> })

  return (
    <div className="space-y-0">
      {lines.map((line, i) => (
        <CodeLine key={i} lineNum={i + 1} visible={i < revealed}>
          {line.content}
        </CodeLine>
      ))}
      {revealed < lines.length && (
        <div className="flex gap-0">
          <span className="select-none w-10 text-right pr-4 text-xs text-[#4a4a5a]">
            {revealed + 1}
          </span>
          <span className="w-2 h-4 bg-primary/80 animate-blink mt-1" aria-hidden="true" />
        </div>
      )}
    </div>
  )
})

SkillCode.displayName = 'SkillCode'
export default SkillCode
