export const themes = {
  default: {
    '--primary-color': '#1e3a5f',
    '--secondary-color': '#3c607a', // more contrast than #4e8e8b
    '--accent-color': '#3b7a6e',
    '--background-color': '#121a22',
    '--card-background-color': '#1d2d44',
    '--text-color': '#d1d9e6',
    '--button-background': '#5c9dbd',
    '--button-hover': '#4c8b9e',
    '--error-color': '#e16b6b',
    '--success-color': '#76c7a5',
    '--overlay-color': 'rgba(18, 26, 34, 0.7)',
  },
  glacierFade: {
    '--primary-color': '#1d252c',             // cold slate
    '--secondary-color': '#33444d',           // glacial depth
    '--accent-color': '#80e1dd',              // aurora teal
    '--background-color': '#12181d',
    '--card-background-color': '#1c2329',
    '--text-color': '#dff7f5',
    '--button-background': '#5dd9d4',
    '--button-hover': '#4bc2be',
    '--error-color': '#ee9090',
    '--success-color': '#a3e7cb',
    '--overlay-color': 'rgba(18, 24, 29, 0.7)'
  },
  black: {
  '--primary-color':      '#151d2a',   // Brighter deep blue/gray for UI highlights
  '--secondary-color':    '#2d5fa7',   // Bright blue accent, stands out on black
  '--accent-color':       '#3fcfff',   // Vibrant cyan for links, accents
  '--background-color':   '#000000',   // Pure black
  '--card-background-color': '#11151c', // Slightly lighter than black for cards
  '--text-color':         '#f8faff',   // Bright white with subtle blue hint for comfort
  '--button-background':  '#288aff',   // Bright, saturated blue for CTA buttons
  '--button-hover':       '#50a7ff',   // Lighter blue for hover effect
  '--error-color':        '#ff4949',   // Vivid error red
  '--success-color':      '#31ec89',   // Bright green for success
  '--overlay-color':      'rgba(0, 0, 0, 0.76)', // Slightly more opaque overlay for clarity
  },
  carbon: {
  '--primary-color': '#1a1a1a',              // matte charcoal, carbon fiber base
  '--secondary-color': '#2b2b2b',            // darkened steel gray
  '--accent-color': '#4682b4',               // steel blue accent (subtle highlight)
  '--background-color': '#0e0e0f',           // deep carbon fiber black
  '--card-background-color': '#1c1d1f',      // slightly lifted gray for cards
  '--text-color': '#d4d4d4',                 // soft light gray for legibility
  '--button-background': '#3a75a3',          // carbon blue button
  '--button-hover': '#32618a',               // darker hover state
  '--error-color': '#d04f4f',                // restrained red
  '--success-color': '#5fa88d',              // carbon teal
  '--overlay-color': 'rgba(14, 14, 15, 0.7)' // aligned with true black bg
  },
  charcoal: {
  /* — Base tones — */
  '--primary-color':           '#474d56',   // slightly lighter charcoal
  '--secondary-color':         '#40444b',   // mid-gray UI elements
  '--background-color':        '#2c2f33',   // lighter backdrop
  '--card-background-color':   '#34373d',   // gentle contrast panels

  /* — Text & icons — */
  '--text-color':              '#ffffff',   // full white for max legibility
  '--link-color':              '#aeb7f5',   // softer pale blue
  '--overlay-color':           'rgba(44,47,51,0.85)',

  /* — Buttons & accents — */
  '--accent-color':            '#99a9f9',   // lighter, airy blue
  '--button-background':       '#6a75f8',   // brightened button fill
  '--button-hover':            '#5865f2',   // deep hover state

  /* — Feedback states — */
  '--error-color':             '#ff7b7b',   // softer but clear red
  '--success-color':           '#69f292',   // fresh mint green
},
  solarizedNight: {
  '--primary-color':      '#073642',
  '--secondary-color':    '#268bd2',
  '--accent-color':       '#b58900',
  '--background-color':   '#00212b',
  '--card-background-color': '#083040',
  '--text-color':         '#fdf6e3',
  '--button-background':  '#268bd2',
  '--button-hover':       '#479fe6',
  '--error-color':        '#dc322f',
  '--success-color':      '#859900',
  '--overlay-color':      'rgba(7, 54, 66, 0.87)',
  },
  obsidianPetal: {
    '--primary-color': '#18171d',             // near black
    '--secondary-color': '#312c3f',           // muted violet charcoal
    '--accent-color': '#d7a3f3',              // orchid shimmer
    '--background-color': '#0e0d11',
    '--card-background-color': '#201c29',
    '--text-color': '#e8e1f2',
    '--button-background': '#b37edf',
    '--button-hover': '#9e6ccc',
    '--error-color': '#f59bb3',
    '--success-color': '#b4edcc',
    '--overlay-color': 'rgba(14, 13, 17, 0.7)'
  },
    sunsetSerotonin: {
    '--primary-color': '#2e1b1f',             // dusk plum
    '--secondary-color': '#523434',           // rich crimson
    '--accent-color': '#f58b8b',              // sunset rose
    '--background-color': '#1a1214',
    '--card-background-color': '#2a1c1f',
    '--text-color': '#fce9e9',
    '--button-background': '#ff7171',
    '--button-hover': '#e45959',
    '--error-color': '#ff4c4c',
    '--success-color': '#f5b97f',
    '--overlay-color': 'rgba(26, 18, 20, 0.7)'
  },
  velvetAsh: {
  '--primary-color': '#1a1715',              // dark velvet
  '--secondary-color': '#2f2926',            // burned ash gray
  '--accent-color': '#c97465',               // muted crimson-peach
  '--background-color': '#0e0c0b',
  '--card-background-color': '#221d1a',
  '--text-color': '#e7deda',
  '--button-background': '#b36050',
  '--button-hover': '#944e40',
  '--error-color': '#c96363',
  '--success-color': '#c6a779',
  '--overlay-color': 'rgba(14, 12, 11, 0.7)'
},
porcelainBloom: {
  '--primary-color': '#f1f0f2',              // porcelain white
  '--secondary-color': '#dedcdf',            // matte ceramic
  '--accent-color': '#ae94e6',               // soft iris bloom
  '--background-color': '#eae8ee',
  '--card-background-color': '#f6f5f8',
  '--text-color': '#3a3544',
  '--button-background': '#c7afe9',
  '--button-hover': '#a991d3',
  '--error-color': '#e57b91',
  '--success-color': '#a6d6bb',
  '--overlay-color': 'rgba(255, 255, 255, 0.65)'
},
neonRitual: {
  '--primary-color': '#120011',              // pure void
  '--secondary-color': '#3a003a',            // saturated royal purple
  '--accent-color': '#ff4fbd',               // electric magenta
  '--background-color': '#0a000b',
  '--card-background-color': '#1a0022',
  '--text-color': '#fef3fc',
  '--button-background': '#d800a6',
  '--button-hover': '#b4008d',
  '--error-color': '#ff6a6a',
  '--success-color': '#58e0d6',
  '--overlay-color': 'rgba(10, 0, 11, 0.7)'
},
mossCircuit: {
  '--primary-color': '#1c2a20',              // dark moss base
  '--secondary-color': '#3c4d3c',            // faded foliage
  '--accent-color': '#a2c98f',               // lichen green highlight
  '--background-color': '#111a12',
  '--card-background-color': '#1d2c1b',
  '--text-color': '#e5f0dd',
  '--button-background': '#7cb072',
  '--button-hover': '#67955f',
  '--error-color': '#d3766e',
  '--success-color': '#a9d4a0',
  '--overlay-color': 'rgba(17, 26, 18, 0.7)'
}
};
