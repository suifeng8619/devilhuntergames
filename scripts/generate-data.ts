/**
 * Data Generation Script
 * Converts DEVIL_HUNTER_COMPLETE_DATA.md into structured JSON files
 *
 * Run: npx ts-node scripts/generate-data.ts
 */

import fs from 'fs'
import path from 'path'
import type { Contract, Talent, Hybrid, Raid, Code } from '../types'

// Output directory
const DATABASE_DIR = path.join(process.cwd(), 'content', 'database')

// Ensure directory exists
if (!fs.existsSync(DATABASE_DIR)) {
  fs.mkdirSync(DATABASE_DIR, { recursive: true })
}

// =============================================================================
// CONTRACTS DATA
// =============================================================================

const contracts: Contract[] = [
  // S-Tier Contracts
  {
    id: 'future-devil',
    name: 'Future Devil',
    tier: 'S',
    emoji: '🔮',
    rating: {
      pvp: 'S+',
      pve: 'A',
    },
    description: 'See 2 seconds into the future - broken in PvP',
    whyTier: '2-second prediction makes this META-defining. See attacks before they land.',
    abilities: [
      {
        name: 'Future Sight',
        description: 'Predict enemy actions 2 seconds ahead',
        cooldown: 'Passive',
      },
      {
        name: 'Perfect Dodge',
        description: 'Trigger invincibility frames based on prediction',
        cooldown: '5s',
      },
      {
        name: 'Counter Window',
        description: '+50% damage on counter attacks within 0.5s of prediction',
      },
    ],
    sideEffects: [
      {
        effect: 'Blindness',
        severity: 'Minor',
        description: 'Cosmetic screen edge blur - habit makes it ignorable',
      },
    ],
    acquisition: [
      {
        method: 'NPC Quest',
        cost: '30 eye items',
        difficulty: 'Medium',
        soloable: true,
        notes: 'HQ Floor 0 NPC',
      },
      {
        method: 'Contract Dealer',
        cost: '3,000 Yen per roll',
        dropRate: 0.03,
        difficulty: 'Easy',
        soloable: true,
        notes: '~3% chance, expect 10-15 rolls',
      },
      {
        method: 'Encounter',
        cost: 'Free',
        difficulty: 'Easy',
        soloable: true,
        notes: 'Choose "lose eyesight" option',
      },
    ],
    meta: {
      usageRate: '68% of high-end PvP players',
      winRate: '72%',
      newbieFriendly: 4,
      skillCeiling: 'Very High',
      communityRating: 'PvP must-have, but needs practice',
    },
    synergiesWith: ['ghost-devil', 'violence-devil'],
    recommendedBuilds: ['ghost-walker', 'future-tactician'],
  },
  {
    id: 'ghost-devil',
    name: 'Ghost Devil',
    tier: 'S',
    emoji: '👻',
    rating: {
      pvp: 'S+',
      pve: 'B',
    },
    description: 'Invisible grabs that cannot be dodged - perfect combo starter',
    whyTier: 'Invisible grab attacks are unavoidable, guaranteeing combo initiation in PvP',
    abilities: [
      {
        name: 'Ghost Grab',
        description: 'Invisible grab - enemy cannot see or dodge',
        cooldown: '8s',
        damage: 'Medium',
      },
      {
        name: 'Phase Through',
        description: 'Pass through walls and obstacles',
        cooldown: '12s',
      },
    ],
    acquisition: [
      {
        method: 'Yakuza Raid',
        dropRate: 0.10,
        difficulty: 'Hard',
        soloable: false,
        notes: 'RAID EXCLUSIVE - Farm repeatedly for 10% drop',
      },
    ],
    meta: {
      usageRate: '55% of top PvP players',
      newbieFriendly: 6,
      skillCeiling: 'Medium',
      communityRating: 'Best combo starter in game',
    },
    synergiesWith: ['future-devil', 'mantis-devil'],
    counters: ['predictable-opponents'],
    recommendedBuilds: ['ghost-walker', 'ghost-stealth'],
  },
  {
    id: 'mantis-devil',
    name: 'Mantis Devil',
    tier: 'S',
    emoji: '🦗',
    rating: {
      pvp: 'S',
      pve: 'A',
    },
    description: 'Move during attack animations - unstoppable combos',
    whyTier: 'Unique movement during animations creates unstoppable pressure. Back damage bonus.',
    abilities: [
      {
        name: 'Blade Flurry',
        description: 'Move while attacking - maintain mobility',
        cooldown: '6s',
        damage: 'High',
      },
      {
        name: 'Back Strike',
        description: '+30% damage when attacking from behind',
      },
      {
        name: 'Wall Phase',
        description: 'Exploit terrain glitches',
      },
    ],
    acquisition: [
      {
        method: 'Contract Dealer',
        cost: '3,000 Yen per roll',
        dropRate: 0.03,
        difficulty: 'Easy',
        soloable: true,
      },
      {
        method: 'Encounter',
        cost: 'Free',
        difficulty: 'Medium',
        soloable: true,
        notes: 'Forest/Jungle areas',
      },
    ],
    meta: {
      usageRate: '45% of competitive players',
      newbieFriendly: 5,
      skillCeiling: 'High',
      communityRating: 'High skill ceiling, massive payoff',
    },
    synergiesWith: ['future-devil'],
    recommendedBuilds: ['mantis-assassin'],
  },
  {
    id: 'violence-devil',
    name: 'Violence Devil (Barrage)',
    tier: 'S',
    emoji: '💪',
    rating: {
      pvp: 'A',
      pve: 'S+',
    },
    description: 'Highest close-range DPS - melts bosses',
    whyTier: 'Unmatched sustained DPS. Unstoppable during barrage attack.',
    abilities: [
      {
        name: 'Violence Barrage',
        description: 'Rapid punches - cannot be interrupted',
        cooldown: '10s',
        damage: 'Very High',
      },
      {
        name: 'Hyper Armor',
        description: 'Cannot be staggered during attack',
      },
    ],
    acquisition: [
      {
        method: 'NPC Quest',
        cost: 'Free',
        difficulty: 'Easy',
        soloable: true,
        notes: 'Violence Devil NPC questline',
      },
    ],
    meta: {
      usageRate: '60% of PvE players',
      newbieFriendly: 8,
      skillCeiling: 'Low',
      communityRating: 'Best boss killer, PvE essential',
    },
    synergiesWith: ['future-devil'],
    recommendedBuilds: ['violence-tank', 'pve-farmer'],
  },

  // A-Tier Contracts
  {
    id: 'blood-devil-scythe',
    name: 'Blood Devil (Scythe)',
    tier: 'A',
    emoji: '🩸',
    rating: {
      pvp: 'A',
      pve: 'A',
    },
    description: 'Long range versatile weapon',
    whyTier: 'Great range and damage, but overshadowed by S-tiers in pure damage',
    abilities: [
      {
        name: 'Blood Scythe',
        description: 'Long-range sweeping attacks',
        cooldown: '7s',
        damage: 'High',
      },
    ],
    acquisition: [
      {
        method: 'Contract Dealer',
        cost: '3,000 Yen',
        dropRate: 0.05,
        difficulty: 'Easy',
        soloable: true,
      },
    ],
    meta: {
      newbieFriendly: 7,
      skillCeiling: 'Medium',
    },
  },
  {
    id: 'snake-devil',
    name: 'Snake Devil',
    tier: 'A',
    emoji: '🐍',
    rating: {
      pvp: 'A',
      pve: 'B',
    },
    description: 'Floor ambush attacks and devouring moves',
    whyTier: 'Unique ambush mechanics, strong in 1v1 situations',
    abilities: [
      {
        name: 'Snake Ambush',
        description: 'Attack from underground',
        cooldown: '10s',
        damage: 'High',
      },
      {
        name: 'Devour',
        description: 'Grab and consume enemy',
        cooldown: '15s',
      },
    ],
    acquisition: [
      {
        method: 'Encounter',
        cost: 'Free',
        difficulty: 'Medium',
        soloable: true,
        notes: 'Cave near Yakuza base - requires membership',
      },
    ],
    meta: {
      newbieFriendly: 5,
      skillCeiling: 'High',
    },
  },

  // B-Tier Contracts
  {
    id: 'fox-devil',
    name: 'Fox Devil',
    tier: 'B',
    emoji: '🦊',
    rating: {
      pvp: 'B',
      pve: 'A',
    },
    description: 'Best FREE beginner contract',
    whyTier: 'Solid all-around contract. Free and easy to get. Perfect for new players.',
    abilities: [
      {
        name: 'Fox Summon',
        description: 'Summon fox spirit for multi-target attacks',
        cooldown: '8s',
        damage: 'Medium',
      },
    ],
    acquisition: [
      {
        method: 'Encounter',
        cost: 'Free',
        difficulty: 'Easy',
        soloable: true,
        notes: 'Chinatown Shrine - guaranteed spawn',
      },
    ],
    meta: {
      usageRate: '80% of new players',
      newbieFriendly: 10,
      skillCeiling: 'Low',
      communityRating: 'Perfect starter contract',
    },
    recommendedBuilds: ['beginner-human'],
  },
  {
    id: 'leech-devil',
    name: 'Leech Devil',
    tier: 'B',
    emoji: '🩸',
    rating: {
      pvp: 'B',
      pve: 'A',
    },
    description: 'Life steal sustain for long fights',
    whyTier: 'Great sustain, allows extended farming without healing items',
    abilities: [
      {
        name: 'Life Drain',
        description: 'Heal based on damage dealt',
        cooldown: 'Passive',
      },
    ],
    acquisition: [
      {
        method: 'Encounter',
        cost: 'Free',
        difficulty: 'Easy',
        soloable: true,
        notes: 'City spawns',
      },
    ],
    meta: {
      newbieFriendly: 9,
      skillCeiling: 'Low',
    },
  },
]

// =============================================================================
// TALENTS DATA
// =============================================================================

const talents: Talent[] = [
  {
    id: 'ghost-walk',
    name: 'Ghost Walk',
    tier: 'S',
    emoji: '👻',
    effect: 'Invisibility after perfect dodge',
    whyTier: 'Free repositioning and ambush potential. Dominates PvP.',
    slotCost: {
      slots: 2,
    },
    source: {
      devilType: 'Ghost Devil',
      bodyPart: "Ghost Devil's Arm",
      killRequirement: 25,
      farmLocation: 'Yakuza Raid',
    },
    bestFor: ['PvP', 'Mobility'],
    activation: 'On Dodge',
    activationDetails: 'Perfect dodge triggers 5s invisibility',
    meta: {
      usageRate: '70% of Fiend PvP players',
      mandatory: true,
      newbieFriendly: 6,
      skillCeiling: 'High',
    },
    recommendedBuilds: ['fiend-ghost', 'fiend-pvp'],
  },
  {
    id: 'stone-skin',
    name: 'Stone Skin',
    tier: 'S',
    emoji: '🪨',
    effect: 'Permanent damage reduction',
    whyTier: 'Always-on defense. Mandatory for tank builds and PvE.',
    slotCost: {
      slots: 2,
    },
    source: {
      devilType: 'Stone Devil',
      bodyPart: 'Stone Appendages',
      killRequirement: 25,
      farmLocation: 'Rocky Quarry',
    },
    bestFor: ['PvE', 'Tank'],
    statsImpact: {
      defense: '+30%',
    },
    activation: 'Passive',
    meta: {
      usageRate: '85% of Fiend players',
      mandatory: true,
      newbieFriendly: 10,
      skillCeiling: 'Low',
    },
    recommendedBuilds: ['fiend-tank', 'pve-farmer'],
  },
  {
    id: 'life-leech',
    name: 'Life Leech',
    tier: 'A',
    emoji: '🩸',
    effect: 'Heal on hit - sustain builds',
    whyTier: 'Excellent sustain for extended fights and farming',
    slotCost: {
      slots: 1,
    },
    source: {
      devilType: 'Leech Devil',
      bodyPart: 'Leech Mouth',
      killRequirement: 25,
      farmLocation: 'City spawns',
    },
    bestFor: ['PvE', 'Support'],
    statsImpact: {
      regeneration: '+2% of damage dealt',
    },
    activation: 'On Hit',
    meta: {
      usageRate: '50% of Fiend players',
      mandatory: false,
      newbieFriendly: 9,
      skillCeiling: 'Low',
    },
  },
  {
    id: 'borrowed-life',
    name: 'Borrowed Life',
    tier: 'A',
    emoji: '🧠',
    effect: 'Survive lethal damage once',
    whyTier: 'Second chance mechanic. Get out of jail free card.',
    slotCost: {
      slots: 2,
    },
    source: {
      devilType: 'Zombie Devil',
      bodyPart: 'Zombie Brain',
      killRequirement: 25,
      farmLocation: 'Graveyard Raid',
    },
    bestFor: ['PvP', 'PvE'],
    activation: 'Conditional',
    activationDetails: 'Triggers at 0 HP once per life',
    meta: {
      usageRate: '40% of Fiend players',
      mandatory: false,
      newbieFriendly: 8,
      skillCeiling: 'Medium',
    },
  },
]

// =============================================================================
// HYBRIDS DATA
// =============================================================================

const hybrids: Hybrid[] = [
  {
    id: 'katana-hybrid',
    name: 'Katana Hybrid',
    tier: 'S',
    rarity: 'Very Rare',
    emoji: '🗡️',
    description: 'Transform into samurai demon with devastating speed',
    transformationForm: 'Samurai demon form with katana mastery',
    whyTier: 'Fastest attack speed in game. Devastating combos. Excellent mobility.',
    rating: {
      pvp: 'S+',
      pve: 'S',
    },
    transformation: {
      activationKey: 'L',
      duration: '60 seconds',
      cooldown: '180 seconds',
      healthBoost: '+50%',
      damageBoost: '+80%',
      speedBoost: '+40%',
      regeneration: '5% per second',
      uniqueMechanics: [
        'Fastest attack speed in game',
        'Perfect dodge cancels into attacks',
        'Extended combo chains',
      ],
      abilities: [
        {
          name: 'Blade Rush',
          key: 'Z',
          description: '10-hit rapid katana combo',
          damage: 'Very High',
          cooldown: '8s',
        },
        {
          name: 'Iai Slash',
          key: 'X',
          description: 'Instant draw attack - massive damage',
          damage: 'Extreme',
          cooldown: '15s',
        },
        {
          name: 'Shadow Step',
          key: 'C',
          description: 'Teleport behind enemy',
          cooldown: '10s',
        },
      ],
    },
    acquisition: {
      method: 'Raid Drop',
      raidName: 'Katana Raid',
      dropRate: 0.05,
      availability: 'Always',
      requirements: [
        {
          item: 'Surgery Kit',
          itemRarity: 'Very Rare',
        },
        {
          item: "Katana Devil's Heart",
          itemRarity: 'Very Rare',
        },
      ],
      averageTimeToObtain: '20 hours (60+ raids average)',
      communitySuccessRate: '15% of players who attempt',
    },
    warnings: [
      {
        type: 'Irreversible',
        message: 'Cannot switch paths once you become Hybrid',
        severity: 'Critical',
      },
      {
        type: 'Time',
        message: '20+ hours expected to obtain 5% drop',
        severity: 'High',
      },
    ],
    meta: {
      usageRate: '15% of high-level players',
      recommendationLevel: 'Highly Recommended',
      skillCeiling: 'Very High',
      newbieFriendly: 3,
    },
    playstyle: 'Hyper-aggressive speed demon',
    strengths: [
      'Fastest attack speed',
      'Devastating combo potential',
      'Excellent mobility',
      'High burst damage',
    ],
    weaknesses: [
      'No sustain outside transformation',
      'Transformation downtime',
      'Requires high skill',
      'Squishy when not transformed',
    ],
    alternativeTo: ['chainsaw-hybrid'],
  },
  {
    id: 'chainsaw-hybrid',
    name: 'Chainsaw Hybrid',
    tier: 'S',
    rarity: 'Event Only',
    emoji: '⛓️',
    description: 'Transform into Chainsaw Devil (Denji reference)',
    transformationForm: 'Chainsaw head and arms - iconic anime look',
    whyTier: 'Insane DPS. Iconic pull-start animation. Best PvE hybrid.',
    rating: {
      pvp: 'S',
      pve: 'S+',
    },
    transformation: {
      activationKey: 'L',
      duration: '60 seconds',
      cooldown: '180 seconds',
      healthBoost: '+60%',
      damageBoost: '+100%',
      regeneration: '7% per second',
      uniqueMechanics: [
        'Highest single-target DPS',
        'Pull-start animation',
        'Chain attacks pierce armor',
      ],
      abilities: [
        {
          name: 'Chainsaw Barrage',
          key: 'Z',
          description: 'Rapid chainsaw slashes',
          damage: 'Extreme',
          cooldown: '6s',
        },
        {
          name: 'Heart Rip',
          key: 'X',
          description: 'Grab and rip out heart',
          damage: 'Massive',
          cooldown: '20s',
        },
      ],
    },
    acquisition: {
      method: 'Event',
      eventName: 'Chainsaw Man Crossover',
      availability: 'Event Only',
      requirements: [
        {
          item: 'Event Surgery Kit',
          itemRarity: 'Legendary',
        },
      ],
      averageTimeToObtain: 'Event participation only',
    },
    warnings: [
      {
        type: 'Irreversible',
        message: 'One-time permanent choice',
        severity: 'Critical',
      },
      {
        type: 'Time',
        message: 'Only available during special events',
        severity: 'Critical',
      },
    ],
    meta: {
      usageRate: '5% of players (event-locked)',
      recommendationLevel: 'Highly Recommended',
      skillCeiling: 'Medium',
      newbieFriendly: 5,
    },
    playstyle: 'Berserk damage dealer',
    strengths: [
      'Highest PvE DPS',
      'Iconic design',
      'Strong regeneration',
      'Armor pierce',
    ],
    weaknesses: [
      'Event-exclusive',
      'Short range',
      'Transformation reliant',
    ],
  },
]

// =============================================================================
// RAIDS DATA
// =============================================================================

const raids: Raid[] = [
  {
    id: 'yakuza-raid',
    name: 'Yakuza Raid',
    difficulty: 'Hard',
    emoji: '🚬',
    location: 'Yakuza Base (restricted area)',
    locationDetails: 'Requires Yakuza clan membership (20 hearts to join)',
    bossName: 'Yakuza Boss',
    bossLevel: 25,
    requirements: {
      fearLevel: 20,
      players: {
        min: 1,
        max: 6,
        recommended: 3,
      },
      specialRequirement: 'Yakuza clan member (20 hearts)',
    },
    guaranteedDrops: [
      {
        item: 'Ghost Devil Contract',
        dropRate: 0.10,
        rarity: 'Very Rare',
        exclusive: true,
      },
      {
        item: 'Ghost Devil Body Parts',
        dropRate: 1.0,
        rarity: 'Uncommon',
      },
      {
        item: 'Yakuza Weapons',
        dropRate: 0.25,
        rarity: 'Rare',
      },
    ],
    rewards: {
      yen: '30,000-50,000',
      xp: 'High',
    },
    strategy: {
      teamComposition: '2-3 DPS + 1 Support',
      requiredDPS: 'High',
      difficulty: 'Hard',
      soloable: false,
      tips: [
        'Ghost Devil contract is raid-exclusive',
        'Farm repeatedly for 10% drop',
        'High DPS essential',
        'Learn boss patterns',
      ],
      avoid: [
        'Going solo',
        'Low damage builds',
      ],
    },
    meta: {
      popularityRating: 9,
      farmWorthiness: 10,
      newbieFriendly: 5,
      timeToComplete: '15-20 minutes',
    },
    relatedContracts: ['ghost-devil'],
    relatedTalents: ['ghost-walk'],
  },
  {
    id: 'zombie-raid',
    name: 'Zombie Raid',
    difficulty: 'Medium',
    emoji: '🧟',
    location: 'Graveyard District',
    bossName: 'Zombie Horde',
    bossLevel: 15,
    requirements: {
      fearLevel: 10,
      players: {
        min: 1,
        max: 6,
        recommended: 2,
      },
    },
    guaranteedDrops: [
      {
        item: 'Zombie Devil Contract',
        dropRate: 0.15,
        rarity: 'Rare',
      },
      {
        item: 'Zombie Devil Body Parts',
        dropRate: 0.80,
        rarity: 'Common',
      },
    ],
    rewards: {
      yen: '15,000-25,000',
    },
    strategy: {
      difficulty: 'Medium',
      soloable: true,
      tips: [
        'Great for farming Fiend body parts',
        'Borrowed Life talent unlocked here',
        'AoE attacks very effective',
      ],
      avoid: [
        'Single-target only builds',
      ],
    },
    meta: {
      popularityRating: 8,
      farmWorthiness: 8,
      newbieFriendly: 9,
      timeToComplete: '10-15 minutes',
    },
    relatedTalents: ['borrowed-life'],
  },
  {
    id: 'katana-raid',
    name: 'Katana Raid',
    difficulty: 'Very Hard',
    emoji: '🗡️',
    location: 'Samurai Temple (hidden)',
    locationDetails: 'Secret location - requires temple discovery',
    bossName: 'Katana Devil',
    bossLevel: 30,
    bossHealth: '500,000 HP',
    bossAbilities: [
      'Instant-kill slash (perfect dodge required)',
      'Multi-phase fight',
      'Speed increases each phase',
    ],
    requirements: {
      fearLevel: 25,
      players: {
        min: 2,
        max: 6,
        recommended: 4,
      },
    },
    guaranteedDrops: [
      {
        item: 'Katana Hybrid Surgery',
        dropRate: 0.05,
        rarity: 'Legendary',
        exclusive: true,
      },
      {
        item: 'Legendary Katana Weapons',
        dropRate: 0.15,
        rarity: 'Very Rare',
      },
    ],
    rewards: {
      yen: '75,000-150,000',
      xp: 'Very High',
    },
    strategy: {
      teamComposition: '3 DPS + 1 Tank/Support',
      requiredDPS: 'Very High',
      difficulty: 'Very Hard',
      soloable: false,
      tips: [
        'One of best Hybrid types (S-tier)',
        'Extremely rare 5% drop',
        'Master dodging - boss has instant-kill',
        'Future Devil prediction essential',
      ],
      avoid: [
        'Low skill players',
        'Undergeared teams',
      ],
    },
    meta: {
      popularityRating: 10,
      farmWorthiness: 10,
      newbieFriendly: 2,
      timeToComplete: '20-30 minutes',
    },
    relatedHybrids: ['katana-hybrid'],
  },
]

// =============================================================================
// CODES DATA
// =============================================================================

const codes: Code[] = [
  {
    id: '75klikes',
    code: '75KLIKES',
    status: 'New',
    rewards: [
      { type: 'Yen', amount: '200,000' },
      { type: 'Fiend Reroll' },
      { type: 'Clan Reroll' },
    ],
    totalValue: '200K+ Yen equivalent',
    caseSensitive: true,
    redeemable: 'Once',
    description: 'Latest code - massive Yen reward',
  },
  {
    id: 'shutdownsorry',
    code: 'SHUTDOWNSORRY',
    status: 'New',
    rewards: [
      { type: 'Yen', amount: 'Various' },
    ],
    caseSensitive: true,
    redeemable: 'Once',
    description: 'Compensation for server downtime',
  },
  {
    id: '50klikes',
    code: '50KLIKES',
    status: 'Active',
    rewards: [
      { type: 'SP Reset' },
      { type: 'Clan Reroll' },
      { type: 'Fiend Reroll' },
    ],
    caseSensitive: true,
    redeemable: 'Once',
  },
  {
    id: 'melo150k',
    code: 'MELO150K',
    status: 'Active',
    rewards: [
      { type: 'Yen', amount: '75,000' },
      { type: 'Fiend Reroll' },
      { type: 'Clan Reroll' },
      { type: 'Contract', item: 'Eraser Devil' },
    ],
    totalValue: '75K Yen + Contract',
    caseSensitive: true,
    redeemable: 'Once',
  },
  {
    id: 'release2026',
    code: 'RELEASE2026',
    status: 'Active',
    rewards: [
      { type: 'Yen', amount: '35,000' },
      { type: 'Fiend Reroll' },
      { type: 'Clan Reroll' },
    ],
    caseSensitive: true,
    redeemable: 'Once',
  },
  {
    id: '20klikes',
    code: '20KLIKES',
    status: 'Active',
    rewards: [
      { type: 'Yen', amount: '50,000' },
      { type: 'Fiend Reroll' },
      { type: 'Clan Reroll' },
      { type: 'Contract', item: 'Eraser Devil' },
    ],
    caseSensitive: true,
    redeemable: 'Once',
  },
  {
    id: '10klikes',
    code: '10KLIKES',
    status: 'Active',
    rewards: [
      { type: 'Yen', amount: '25,000' },
      { type: 'Fiend Reroll' },
      { type: 'Clan Reroll' },
    ],
    caseSensitive: true,
    redeemable: 'Once',
  },
]

// =============================================================================
// WRITE JSON FILES
// =============================================================================

function writeJSON(filename: string, data: any) {
  const filePath = path.join(DATABASE_DIR, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  console.log(`✓ Generated ${filename}`)
}

// Main execution
console.log('🔄 Generating structured data files...\n')

writeJSON('contracts.json', contracts)
writeJSON('talents.json', talents)
writeJSON('hybrids.json', hybrids)
writeJSON('raids.json', raids)
writeJSON('codes.json', codes)

console.log('\n✅ All data files generated successfully!')
console.log(`📁 Output directory: ${DATABASE_DIR}`)
console.log('\nGenerated files:')
console.log(`  - contracts.json (${contracts.length} contracts)`)
console.log(`  - talents.json (${talents.length} talents)`)
console.log(`  - hybrids.json (${hybrids.length} hybrids)`)
console.log(`  - raids.json (${raids.length} raids)`)
console.log(`  - codes.json (${codes.length} codes)`)
