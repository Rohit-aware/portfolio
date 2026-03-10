import React, { memo, useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { SKILLS_DATA } from '@/features/skills/constants/skills'
import RevealWrapper from '@/shared/components/RevealWrapper'
import { cn } from '@/shared/utils/cn'
import {
  TIER_ORDER, TIER_STYLE, NODE_RADIUS,
  RING_RADII, RING_SPEED, BASE_SPEED, HIT_RADIUS, SVG_SIZE,
} from '@/features/skills/constants/tierConfig'
import SmartTooltip, { type SkillNode, type FloatTooltip } from '@/features/skills/components/SmartTooltip'
import OrbitRingSwatch from '@/features/skills/components/OrbitRingSwatch'

const CX = SVG_SIZE / 2
const CY = SVG_SIZE / 2

const buildNodes = (): readonly SkillNode[] => {
  const nodes: SkillNode[] = []
  TIER_ORDER.forEach((tier, ringIdx) => {
    const skills = SKILLS_DATA.flatMap(g =>
      g.skills.filter(s => s.tier === tier).map(s => ({ name: s.name, category: g.category as string }))
    )
    const step = (2 * Math.PI) / skills.length
    const offset = ringIdx * 0.55
    skills.forEach((s, i) => {
      nodes.push({ name: s.name, tier, category: s.category, angle: i * step + offset, ring: ringIdx })
    })
  })
  return nodes
}

const ALL_NODES: readonly SkillNode[] = buildNodes()

const ConstellationSkills: React.FC = memo(() => {
  const [floatTip, setFloatTip] = useState<FloatTooltip | null>(null)
  const rotationRef = useRef<number>(0)
  const isPausedRef = useRef<boolean>(false)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const loop = (now: number): void => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now
      const dt = Math.min(now - lastTimeRef.current, 32)
      lastTimeRef.current = now
      if (!isPausedRef.current) {
        rotationRef.current += dt * BASE_SPEED
        setTick(t => t + 1)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const getPos = useCallback((node: SkillNode) => {
    const r = RING_RADII[node.ring] ?? 88
    const spd = RING_SPEED[node.ring] ?? 1
    const ang = node.angle + rotationRef.current * spd
    return { x: CX + r * Math.cos(ang), y: CY + r * Math.sin(ang) }
  }, [])

  const handleEnter = useCallback((node: SkillNode, x: number, y: number): void => {
    isPausedRef.current = true
    setFloatTip({ node, svgX: x, svgY: y })
  }, [])

  const handleLeave = useCallback((): void => {
    isPausedRef.current = false
    lastTimeRef.current = 0
    setFloatTip(null)
  }, [])

  const tierCounts = useMemo(
    () => TIER_ORDER.map(tier => ({
      tier,
      count: SKILLS_DATA.flatMap(g => g.skills).filter(s => s.tier === tier).length,
    })),
    [],
  )

  void tick

  return (
    <section id="skills" aria-labelledby="skills-heading-c" className="section-padding">
      <div className="section-container">
        <RevealWrapper>
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Skills</p>
            <h2 id="skills-heading-c" className="heading-lg text-foreground">Skill Constellation</h2>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              hover a node · tooltip appears beside it · rotation pauses
            </p>
          </div>

          {/* SVG + sidebar — stack vertically on mobile, side-by-side on xl */}
          <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6 w-full">

            {/* SVG container — aspect-ratio:1/1 keeps it square as width shrinks */}
            <div
              className="relative w-full xl:w-[420px] shrink-0 mx-auto xl:mx-0"
              style={{ aspectRatio: '1 / 1', maxWidth: 420 }}
            >
              <svg
                viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                className="w-full h-full"
                role="img"
                aria-label="Interactive skill constellation. Hover nodes to inspect skills."
              >
                <defs>
                  {TIER_ORDER.map(tier => (
                    <filter key={tier} id={`glow-${tier}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  ))}
                </defs>

                {/* Orbit rings */}
                {TIER_ORDER.map((tier, i) => (
                  <circle key={`ring-${tier}`} cx={CX} cy={CY} r={RING_RADII[i]}
                    fill="none" stroke={TIER_STYLE[tier].ringStroke} strokeWidth="1"
                    strokeDasharray={i === 0 ? '5 5' : i === 1 ? '3 6' : '2 9'} />
                ))}

                {/* Centre node */}
                <circle cx={CX} cy={CY} r={24} fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary) / 0.22)" strokeWidth="1" />
                <circle cx={CX} cy={CY} r={14} fill="hsl(var(--primary) / 0.13)" />
                <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle"
                  fill="hsl(var(--primary))" fontSize="9" fontWeight="700" fontFamily="monospace">RA</text>

                {/* Expert spokes */}
                {ALL_NODES.filter(n => n.tier === 'expert').map(n => {
                  const pos = getPos(n)
                  return (
                    <line key={`spoke-${n.name}`}
                      x1={CX} y1={CY} x2={pos.x} y2={pos.y}
                      stroke="hsl(var(--primary) / 0.07)" strokeWidth="1" />
                  )
                })}

                {/* Skill nodes */}
                {TIER_ORDER.map(tier =>
                  ALL_NODES.filter(n => n.tier === tier).map(n => {
                    const pos = getPos(n)
                    const isHov = floatTip?.node.name === n.name
                    const sty = TIER_STYLE[tier]
                    const nr = NODE_RADIUS[tier]
                    return (
                      <g key={n.name}
                        onMouseEnter={() => handleEnter(n, pos.x, pos.y)}
                        onMouseLeave={handleLeave}
                        role="button"
                        aria-label={`${n.name} — ${sty.label}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <circle cx={pos.x} cy={pos.y} r={HIT_RADIUS} fill="transparent" />
                        {isHov && (
                          <>
                            <circle cx={pos.x} cy={pos.y} r={nr + 10}
                              fill="none" stroke={sty.glowColor} strokeWidth="1" opacity="0.4" />
                            <circle cx={pos.x} cy={pos.y} r={nr + 5}
                              fill={sty.nodeFill} opacity="0.12" />
                          </>
                        )}
                        <circle cx={pos.x} cy={pos.y}
                          r={isHov ? nr + 2.5 : nr}
                          fill={sty.nodeFill} stroke={sty.nodeStroke} strokeWidth="1.5"
                          filter={isHov ? `url(#glow-${tier})` : undefined} />
                      </g>
                    )
                  })
                )}

                {floatTip && <SmartTooltip ft={floatTip} />}
              </svg>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4 w-full xl:w-64 shrink-0">
              <div className="card-glass p-5 space-y-3">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Orbit Key</p>
                {tierCounts.map(({ tier, count }) => (
                  <div key={tier} className="flex items-center gap-3">
                    <OrbitRingSwatch tier={tier} size={32} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{TIER_STYLE[tier].label}</p>
                      <p className="text-xs text-muted-foreground font-mono">{count} skill{count !== 1 ? 's' : ''}</p>
                    </div>
                    <span className={cn(
                      'text-lg font-bold font-mono tabular-nums',
                      tier === 'expert' ? 'text-primary' : '',
                      tier === 'proficient' ? 'text-sky-400' : '',
                      tier === 'familiar' ? 'text-muted-foreground' : '',
                    )}>{count}</span>
                  </div>
                ))}
              </div>

              <div className="card-glass p-5 space-y-2.5">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">By Domain</p>
                {SKILLS_DATA.map(g => (
                  <div key={g.category} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground w-28 shrink-0 truncate">{g.category}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden">
                      <div className="h-full rounded-full bg-primary/60 transition-all duration-500"
                        style={{ width: `${Math.min((g.skills.length / 7) * 100, 100)}%` }} />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-4 text-right shrink-0">{g.skills.length}</span>
                  </div>
                ))}
              </div>

              {!floatTip && (
                <div className="card-glass p-4 flex items-center gap-3 animate-fade-in">
                  <div className="w-6 h-6 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                  </div>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    Hover any dot to see skill details inline
                  </p>
                </div>
              )}
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
})

ConstellationSkills.displayName = 'ConstellationSkills'
export default ConstellationSkills
