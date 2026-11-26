import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Translations } from '../data/i18n';
import { PageId } from '../types/relaybus';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  t: Translations;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[#E1E9E4] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E1E9E4]">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center">
              <BrandLogo className="h-8 sm:h-9 w-auto" alt={t.brandName} />
            </div>
            <p className="text-sm text-[#75847D] leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-[#24332E]">
              {t.footer.linksTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#75847D]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#167A5B] transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('search')}
                  className="hover:text-[#167A5B] transition-colors cursor-pointer"
                >
                  {t.nav.explore}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('assistant')}
                  className="hover:text-[#167A5B] transition-colors cursor-pointer"
                >
                  {t.nav.assistant}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('traveler-profile')}
                  className="hover:text-[#167A5B] transition-colors cursor-pointer"
                >
                  {t.nav.travelerProfile}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#24332E]">
              {t.footer.corridorsTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#75847D]">
              {t.footer.corridors.map((corridor) => (
                <li key={corridor}>{corridor}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#24332E]">
              {t.footer.contactTitle}
            </h3>
            <div className="space-y-2.5 text-sm text-[#75847D]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#167A5B] shrink-0" />
                <span dir="ltr">{t.footer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#167A5B] shrink-0" />
                <span>{t.footer.location}</span>
              </div>
              <p className="text-xs text-[#75847D] pt-1">
                {t.footer.demoFooterNote}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#75847D]">
          <span>{t.footer.copyright}</span>
          <span>RelayBus · KSA Multi-Modal Prototype</span>
        </div>
      </div>
    </footer>
  );
};
