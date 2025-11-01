export const themes = {
  default: {
    '--primary-color': '#1d252c',
    '--secondary-color': '#33444d',
    '--accent-color': '#80e1dd',
    '--background-color': '#12181d',
    '--card-background-color': '#1c2329',
    '--text-color': '#dff7f5',
    '--button-background': '#0f4164ff',    // darker teal for strong contrast vs light text
    '--button-hover': '#176196ff',
    '--error-color': '#e51212ff',
    '--success-color': '#30c113ff',
    '--overlay-color': 'rgba(18, 24, 29, 0.7)',
  },

  black: {
    '--primary-color':         '#0f0f0f',   // deep near-black
    '--secondary-color':       '#181818',   // Spotify-style panel shade
    '--accent-color':          '#3b82f6',   // blue accent (kept blue, not green)
    '--background-color':      '#000000ff',   // classic Spotify background
    '--card-background-color': '#181818',   // cards/rows
    '--text-color':            '#e5e5e5',   // soft off-white for contrast
    '--button-background':     '#2f6fe4',   // blue button base
    '--button-hover':          '#245dd0',   // darker blue on hover
    '--error-color':           '#ff4c4c',   // readable red on dark UI
    '--success-color':         '#1db954',   // Spotify green for success only
    '--overlay-color':         'rgba(0, 0, 0, 0.88)', // richer modal/backdrop
  },

  carbon: {
    '--primary-color': '#1a1a1a',
    '--secondary-color': '#2b2b2b',
    '--accent-color': '#4682b4',
    '--background-color': '#0e0e0f',
    '--card-background-color': '#1c1d1f',
    '--text-color': '#d4d4d4',
    '--button-background': '#1e4f77',   // darker steel blue for light text
    '--button-hover': '#183f5f',
    '--error-color': '#d04f4f',
    '--success-color': '#5fa88d',
    '--overlay-color': 'rgba(14, 14, 15, 0.7)',
  },

  charcoal: {
    '--primary-color': '#474d56',
    '--secondary-color': '#40444b',
    '--background-color': '#2c2f33',
    '--card-background-color': '#34373d',
    '--text-color': '#ffffff',
    '--link-color': '#aeb7f5',
    '--overlay-color': 'rgba(44,47,51,0.85)',
    '--accent-color': '#99a9f9',
    '--button-background': '#3942c5',   // deeper indigo for white text
    '--button-hover': '#2f36a2',
    '--error-color': '#ff7b7b',
    '--success-color': '#69f292',
  },

  solarizedNight: {
    '--primary-color': '#073642',
    '--secondary-color': '#268bd2',
    '--accent-color': '#b58900',
    '--background-color': '#00212b',
    '--card-background-color': '#083040',
    '--text-color': '#fdf6e3',
    '--button-background': '#0f4d78',   // deep cyan-blue for light text
    '--button-hover': '#0c3f62',
    '--error-color': '#dc322f',
    '--success-color': '#859900',
    '--overlay-color': 'rgba(7, 54, 66, 0.87)',
  },

  obsidianPetal: {
    '--primary-color': '#18171d',
    '--secondary-color': '#312c3f',
    '--accent-color': '#d7a3f3',
    '--background-color': '#0e0d11',
    '--card-background-color': '#201c29',
    '--text-color': '#e8e1f2',
    '--button-background': '#5c3a8d',   // deep violet for light text
    '--button-hover': '#4b2f73',
    '--error-color': '#f59bb3',
    '--success-color': '#b4edcc',
    '--overlay-color': 'rgba(14, 13, 17, 0.7)',
  },

  sunsetSerotonin: {
    '--primary-color': '#2e1b1f',
    '--secondary-color': '#523434',
    '--accent-color': '#f58b8b',
    '--background-color': '#1a1214',
    '--card-background-color': '#2a1c1f',
    '--text-color': '#fce9e9',
    '--button-background': '#a13636',   // darker red for light text
    '--button-hover': '#852c2c',
    '--error-color': '#ff4c4c',
    '--success-color': '#f5b97f',
    '--overlay-color': 'rgba(26, 18, 20, 0.7)',
  },

  velvetAsh: {
    '--primary-color': '#1a1715',
    '--secondary-color': '#2f2926',
    '--accent-color': '#c97465',
    '--background-color': '#0e0c0b',
    '--card-background-color': '#221d1a',
    '--text-color': '#e7deda',
    '--button-background': '#6b3227',   // deeper terracotta for light text
    '--button-hover': '#55281f',
    '--error-color': '#c96363',
    '--success-color': '#c6a779',
    '--overlay-color': 'rgba(14, 12, 11, 0.7)',
  },

  porcelainBloom: {
    '--primary-color': '#f1f0f2',
    '--secondary-color': '#dedcdf',
    '--accent-color': '#ae94e6',
    '--background-color': '#eae8ee',
    '--card-background-color': '#f6f5f8',
    '--text-color': '#3a3544',
    '--button-background': '#d6c8f2',   // lighter lavender for dark text
    '--button-hover': '#b9a6e3',        // slightly darker for hover
    '--error-color': '#e57b91',
    '--success-color': '#a6d6bb',
    '--overlay-color': 'rgba(255, 255, 255, 0.65)',
  },

  neonRitual: {
    '--primary-color': '#120011',
    '--secondary-color': '#3a003a',
    '--accent-color': '#ff4fbd',
    '--background-color': '#0a000b',
    '--card-background-color': '#1a0022',
    '--text-color': '#fef3fc',
    '--button-background': '#7a0066',   // deep magenta for light text
    '--button-hover': '#630052',
    '--error-color': '#ff6a6a',
    '--success-color': '#58e0d6',
    '--overlay-color': 'rgba(10, 0, 11, 0.7)',
  },

  mossCircuit: {
    '--primary-color': '#1c2a20',
    '--secondary-color': '#3c4d3c',
    '--accent-color': '#a2c98f',
    '--background-color': '#111a12',
    '--card-background-color': '#1d2c1b',
    '--text-color': '#e5f0dd',
    '--button-background': '#3e6a37',   // darker moss for light text
    '--button-hover': '#32562d',
    '--error-color': '#d3766e',
    '--success-color': '#a9d4a0',
    '--overlay-color': 'rgba(17, 26, 18, 0.7)',
  },

  green: {
    '--primary-color': '#4c5844',
    '--secondary-color': '#968732',
    '--accent-color': '#968732',
    '--background-color': '#3f4738',
    '--card-background-color': '#4c5844',
    '--text-color': '#eff6ee',
    '--button-background': '#4d4a18',   // dark olive for light text
    '--button-hover': '#3f3c13',
    '--error-color': '#ff6666',
    '--success-color': '#66ff66',
    '--overlay-color': 'rgba(10, 26, 10, 0.7)',
  }
};
