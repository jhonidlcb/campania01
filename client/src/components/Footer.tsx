import { useQuery } from "@tanstack/react-query";
import { type HomeContent } from "@shared/schema";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { data: homeContent } = useQuery<HomeContent>({
    queryKey: ["/api/home-content"],
  });

  if (!homeContent) return null;

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tight">
              {homeContent.allianceName}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {homeContent.heroSubtitle}
            </p>
            <div className="flex gap-4 pt-2">
              {homeContent.footerFacebook && (
                <a href={homeContent.footerFacebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {homeContent.footerInstagram && (
                <a href={homeContent.footerInstagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-pink-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {homeContent.footerTwitter && (
                <a href={homeContent.footerTwitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-sky-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{homeContent.footerAddress}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{homeContent.footerPhone}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{homeContent.footerEmail}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Campaña 2026</h4>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
              <p className="text-sm font-bold text-blue-400 mb-1">{homeContent.candidateRole}</p>
              <p className="text-lg font-black">{homeContent.candidateName}</p>
              <p className="text-xs text-slate-500 mt-2 font-bold tracking-widest uppercase">Lista {homeContent.candidateListNumber}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs space-y-2">
          <p>© 2026 {homeContent.allianceMovement}. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://www.softwarepar.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-300 hover:text-white underline-offset-4 hover:underline transition-colors"
              data-testid="link-softwarepar"
            >
              SoftwarePar (www.softwarepar.lat)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
