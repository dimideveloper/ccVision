import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { FaqItem } from '../data/faq';
import { springSoft } from '../lib/motion';

function FaqEntry({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-black/5 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[17px] font-medium text-[#1d1d1f]">{item.question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={springSoft}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-lg text-[#6e6e73]"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] leading-relaxed text-[#6e6e73]">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="card px-2 md:px-4">
      {items.map((item) => (
        <FaqEntry
          key={item.id}
          item={item}
          open={openId === item.id}
          onToggle={() => setOpenId((id) => (id === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}
