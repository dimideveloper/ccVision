export const STATS = {
  users: '6+',
  animations: '450+',
  views: '500M+',
  creators: '8+',
  testimonialUsers: '12+',
};

export const ANIMATION_CATEGORIES = [
  { name: 'Basics', index: '01' },
  { name: 'Reminders', index: '02' },
  { name: 'Gaming', index: '03' },
  { name: 'Social', index: '04' },
  { name: 'Text', index: '05' },
];

export const CREATORS = [
  { name: 'BeckBroJack', subs: '5.36M subscribers', avatar: 'BJ' },
  { name: 'Branzy', subs: '1.2M subscribers', avatar: 'BR' },
  { name: 'BriannaPlayz', subs: '3.1M subscribers', avatar: 'BP' },
  { name: 'Farzy', subs: '2.54M subscribers', avatar: 'FZ' },
  { name: 'LockDownLife', subs: '2.37M subscribers', avatar: 'LD' },
];

export const EDITORS = [
  { name: 'Premiere Pro', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg' },
  { name: 'After Effects', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg' },
  { name: 'Final Cut Pro', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Final_Cut_Pro_icon.svg' },
  { name: 'DaVinci Resolve', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio_16_icon.png' },
  { name: 'CapCut', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/CapCut_logo.svg' },
  { name: 'Canva', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg' },
  { name: 'OBS Studio', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/OBS_Studio_Logo.svg' },
  { name: 'Streamlabs', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Streamlabs_Logo.svg' },
  { name: 'VN', icon: 'https://play-lh.googleusercontent.com/97yC5Y92Zp8rV-9N4wZ0bF2Z-K_Y6vV-vJ5v6z6z5v5z5v5z5v5z5v5z5v5z5v5z5v5' }, // VN
  { name: 'InShot', icon: 'https://play-lh.googleusercontent.com/6S6P8N9z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8' }, // InShot Placeholder
  { name: 'Adobe Express', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_Express_Logo.svg' },
  { name: 'Filmora', icon: 'https://www.vectorlogo.zone/logos/filmora/filmora-icon.svg' },
  { name: 'Alight Motion', icon: 'https://play-lh.googleusercontent.com/fS6P8N9z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8' },
];

export const TESTIMONIALS = [
  {
    name: 'Farzy',
    subs: '2.54M subscribers',
    text: "ccVision is unbelievably helpful for me as a creator. I save hours of editing time every week.",
    avatar: 'FZ',
  },
  {
    name: 'LockDownLife',
    subs: '2.37M subscribers',
    text: "Since using ccVision, my workflow has completely changed. Everything is perfectly customizable.",
    avatar: 'LD',
  },
  {
    name: 'Reece',
    subs: '1.89M subscribers',
    text: 'The vision behind this tool is brilliant. No more laggy After Effects previews.',
    avatar: 'RC',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Everything you need to get going.',
    price: '$16.57',
    features: [
      '40 downloads per month',
      'Access 100+ animations',
      'Exports up to 1080p',
      '30s preview cooldown',
      'Up to 90 presets',
      '2 editor themes',
    ],
    cta: 'Get Starter',
    boldFeatures: [1],
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'The go-to plan for serious creators.',
    price: '$54.07',
    features: [
      '100 downloads per month',
      'Access 200+ animations',
      'Exports up to 4K',
      '15s preview cooldown',
      'Up to 1500 presets',
      '3 editor themes',
    ],
    cta: 'Get Pro',
    boldFeatures: [1],
  },
  {
    id: 'studio',
    name: 'Studio',
    subtitle: 'Full power. No limits.',
    price: '$91.57',
    featured: true,
    features: [
      '150 downloads per month',
      'Full animation library',
      'Access 300+ animations',
      'Exports up to 4K',
      '5s preview cooldown',
      'Unlimited presets',
      'All editor themes',
    ],
    cta: 'Get Studio',
    boldFeatures: [1, 2, 5],
  },
];
export const ANIMATIONS: Animation[] = [
  {
    id: 101,
    title: 'Picture Smooth',
    category: 'Social',
    type: 'Studio',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    lottie: '/animations/picturesmooth1.json'
  },
  {
    id: 100,
    title: 'First Animation',
    category: 'Text',
    type: 'PRO',
    image: 'https://images.unsplash.com/photo-1626544823105-dbda3a714e18?auto=format&fit=crop&q=80&w=400',
    lottie: '/animations/firstanimationnew.json'
  },
  { id: 1, title: 'Animated Sub Count', category: 'Basics', type: 'Pro', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Sub+Count', lottie: '/animations/animationcard1.json' },
  { id: 2, title: 'Gaming Overlay', category: 'Gaming', type: 'Starter', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Gaming', lottie: '/animations/animationcard1.json' },
  { id: 3, title: 'Social Media Pop', category: 'Social', type: 'Studio', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Social', lottie: '/animations/animationcard1.json' },
  { id: 4, title: 'Text Intro', category: 'Text', type: 'Pro', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Intro', lottie: null },
  { id: 5, title: 'Reminder Bell', category: 'Reminders', type: 'Starter', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Bell', lottie: null },
  { id: 6, title: 'Premium Lower Third', category: 'Basics', type: 'Studio', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Lower+Third', lottie: null },
  { id: 7, title: 'Twitch Alert', category: 'Gaming', type: 'Pro', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Alert', lottie: null },
  { id: 8, title: 'YouTube Endscreen', category: 'Social', type: 'Starter', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Endscreen', lottie: null },
  { id: 9, title: 'Dynamic Quote', category: 'Text', type: 'Pro', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Quote', lottie: null },
];
