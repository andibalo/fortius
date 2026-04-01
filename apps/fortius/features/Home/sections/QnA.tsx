'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    id: '01',
    question: 'Bagaimana cara bergabung sebagai pemain?',
    answer:
      'Untuk menjadi pemain Fortius, kamu harus terdaftar sebagai mahasiswa Universitas Multimedia Nusantara. Akan ada open recruitment, di mana calon peserta akan melalui tahap seleksi dan trial. Jika kamu bukan mahasiswa UMN, kamu tetap bisa bergabung dengan komunitas kami melalui server Discord di mana kamu dapat bermain dan membangun koneksi dengan gamers lainnya.',
  },
  {
    id: '02',
    question: 'Kapan open recruitment dilaksanakan?',
    answer:
      'Open recruitment biasanya diadakan dua kali dalam setahun untuk menyambut pemain baru maupun anggota tim manajemen Fortius Esports. Ikuti media sosial kami untuk mendapatkan pengumuman dan pembaruan agar tidak ketinggalan kesempatan mendaftar.',
  },
  {
    id: '03',
    question: 'Bisakah saya bergabung dengan Fortius jika saya bukan pemain?',
    answer:
      'Tentu saja! Fortius tidak hanya berfokus pada kompetisi, tetapi juga membangun organisasi yang solid. Kami memiliki divisi di luar game seperti website development, public relations, brand ambassador, desain grafis, dokumentasi, dan content creation. Jadi jika kamu tertarik dengan dunia esports namun bukan pemain, tetap ada tempat untukmu di sini.',
  },
  {
    id: '04',
    question: "Apa saja keuntungan menjadi pemain?",
    answer:
      'Sebagai pemain Fortius, kamu akan mendapatkan dukungan penuh untuk berkembang dan berkompetisi. Biaya turnamen ditanggung, serta kamu akan dibimbing oleh pelatih dan manajer tim. Untuk turnamen offline, kami juga menanggung biaya akomodasi dan kebutuhanmu, sehingga kamu bisa fokus sepenuhnya pada performa terbaikmu.',
  },
  {
    id: '05',
    question: "Bagaimana jika game yang saya kuasai belum tersedia di Fortius?",
    answer:
      'Kami selalu terbuka untuk membuka divisi game baru! Jika game yang kamu mainkan belum menjadi bagian dari divisi kami, bisa langsung DM kami. Kami dengan senang hati akan mempertimbangkan untuk menambahkan tim baru berdasarkan minat dan potensi mahasiswa.',
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
