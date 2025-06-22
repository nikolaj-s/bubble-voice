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
  light: {
    '--primary-color': '#e0e0e0',
    '--secondary-color': '#999999', // more visible thanrgb(193, 193, 193)
    '--accent-color': '#a1a1a1',
    '--background-color': '#f7f7f7',
    '--card-background-color': '#ffffff',
    '--text-color': '#1a1a1a',
    '--button-background': '#d0d0d0',
    '--button-hover': '#b8b8b8',
    '--error-color': '#e16b6b',
    '--success-color': '#76c7a5',
    '--overlay-color': 'rgba(255, 255, 255, 0.7)',
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
  charcoal: {
  /* — Base tones — */
  '--primary-color':           '#2e3136',   // slightly lighter charcoal
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
    midnightNeon: {
    '--primary-color':      '#23233c',
    '--secondary-color':    '#12e2dc',
    '--accent-color':       '#e97bff',
    '--background-color':   '#0b0e17',
    '--card-background-color': '#18182b',
    '--text-color':         '#f5f6ff',
    '--button-background':  '#12e2dc',
    '--button-hover':       '#19f6e8',
    '--error-color':        '#ff5370',
    '--success-color':      '#4df68d',
    '--overlay-color':      'rgba(18, 34, 44, 0.81)',
  },
  crimson: {
    '--primary-color':      '#420818',    // deep crimson for top navs, accents
    '--secondary-color':    '#ff4b82',    // hot magenta-pink for badges, links, etc
    '--accent-color':       '#ff1744',    // bold crimson accent
    '--background-color':   '#17060d',    // nearly black, subtle red undertone
    '--card-background-color': '#25101b', // card/modal, slightly lighter
    '--text-color':         '#fff0f4',    // soft blush white for text
    '--button-background':  '#ff1744',    // high-contrast crimson
    '--button-hover':       '#ff4b82',    // hover = magenta pink
    '--error-color':        '#ff3333',    // vivid error
    '--success-color':      '#60faaf',    // teal-green for pop
    '--overlay-color':      'rgba(67, 8, 24, 0.88)', // semi-transparent crimson
  },
  pastel: {
    '--primary-color':      '#a5c8e6', // gentle blue
    '--secondary-color':    '#ffd6e0', // pastel pink
    '--accent-color':       '#b2efd7', // soft mint green
    '--background-color':   '#f9f7fa', // barely-off-white
    '--card-background-color': '#f3eaf5', // soft lavender for cards
    '--text-color':         '#364458',   // calm navy-gray for contrast
    '--button-background':  '#94b7f2',   // pastel blue button
    '--button-hover':       '#b5dbff',   // lighter blue hover
    '--error-color':        '#ffb3b3',   // pastel red (not jarring)
    '--success-color':      '#b7f9ce',   // light mint for success
    '--overlay-color':      'rgba(200, 180, 220, 0.48)', // lavender/blue soft overlay
  }

};
