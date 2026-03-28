'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    id: '01',
    question: 'What services do you offer?',
    answer:
      'We offer comprehensive esports management, talent scouting, content production, and strategic brand partnerships designed to elevate competitive gaming organizations.',
  },
  {
    id: '02',
    question: 'What is your typical turnaround time?',
    answer:
      'Depending on the scale of the campaign or tournament preparation, timelines range from 2 weeks for rapid deployments to 3 months for full-scale seasonal strategies.',
  },
  {
    id: '03',
    question: 'Do you only work in esports?',
    answer:
      'While our roots are in competitive gaming, our digital production and marketing divisions work with tech brands, lifestyle apparel, and entertainment sectors.',
  },
  {
    id: '04',
    question: "What's your process like?",
    answer:
      'Discovery, Strategy, Execution, and Domination. We align on goals, build the infrastructure, deploy the talent, and measure the impact with ruthless efficiency.',
  },
];

export default function QnA() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      data-bg="#0f0019"
      className="min-h-screen relative z-20 py-32 px-6 md:px-12 flex flex-col justify-center border-t border-white/10"
    >
      <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Large sticky title */}
        <div className="md:col-span-5">
          <h2
            className="font-oswald text-7xl md:text-[9rem] font-bold tracking-impact-extreme sticky top-40 text-white"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            QNA
          </h2>
        </div>

        {/* Accordion */}
        <div className="md:col-span-7 flex flex-col gap-2">
          {faqs.map(({ id, question, answer }) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className="qna-item group border-b border-white/10 py-6 overflow-hidden rounded-xl"
              >
                <div
                  className="qna-header flex justify-between items-center cursor-pointer interactive px-4"
                  onClick={() => toggle(id)}
                >
                  <h3 className="text-xl md:text-3xl text-gray-400 group-hover:text-white transition-colors tracking-tight font-medium flex items-center gap-6">
                    <span className="text-sm font-mono text-[#9b00e8] font-bold">{id}</span>
                    <span className="hover-smooth">{question}</span>
                  </h3>
                  <motion.span
                    className="text-white text-3xl select-none"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  >
                    +
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pl-16 pb-2 text-lg text-gray-400 leading-relaxed max-w-2xl">
                        <span className="content-hover">{answer}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
