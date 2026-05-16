export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const FAQ_CATEGORIES = ['General', 'Editor', 'Billing', 'Exports'] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-is',
    category: 'General',
    question: 'What is ccLeaf?',
    answer:
      'ccLeaf is a browser-based motion graphics editor and animation library for content creators. Choose an animation, customize text, colors, and images in your browser, then export and drop it into your favorite video editor — no After Effects required.',
  },
  {
    id: 'who-for',
    category: 'General',
    question: 'Who is ccLeaf for?',
    answer:
      'YouTubers, streamers, gaming creators, short-form editors (TikTok, Reels, Shorts), and agencies who need professional motion graphics without a complex traditional workflow.',
  },
  {
    id: 'how-works',
    category: 'Editor',
    question: 'How does the editor work?',
    answer:
      'Open the editor, pick a template from the library, customize it live with instant preview, then export in your preferred resolution and frame rate. Drag the file into Premiere, CapCut, DaVinci Resolve, and dozens of other apps.',
  },
  {
    id: 'free-trial',
    category: 'Editor',
    question: 'Can I try ccLeaf for free?',
    answer:
      'Yes. Use the free sandbox editor to test animations before subscribing. Some exports and downloads are limited on free access; paid plans unlock the full catalog and higher export limits.',
  },
  {
    id: 'editors',
    category: 'Exports',
    question: 'Which video editors are supported?',
    answer:
      'Exports work with all major editors including Adobe Premiere Pro, After Effects, DaVinci Resolve, Final Cut Pro, CapCut, Filmora, OBS, Streamlabs, Alight Motion, and more. Just drag and drop your file.',
  },
  {
    id: 'resolution',
    category: 'Exports',
    question: 'What export quality is available?',
    answer:
      'Depending on your plan, you can export from 720p up to 4K, with frame rates from 15 to 60 FPS. Higher tiers include faster preview cooldowns and more monthly downloads.',
  },
  {
    id: 'cancel',
    category: 'Billing',
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no hidden fees. You can cancel or switch between Monthly and Annually at any time from your account settings. Access continues until the end of your billing period.',
  },
  {
    id: 'plans',
    category: 'Billing',
    question: 'What is the difference between Essential, Plus, and Ultimate?',
    answer:
      'Essential is for beginners with core animations and 1080p exports. Plus adds more animations, 4K exports, and more presets. Ultimate unlocks the full library, unlimited presets, all themes, and the fastest preview cooldown.',
  },
];
