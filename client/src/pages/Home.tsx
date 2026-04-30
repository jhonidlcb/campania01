import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Leaf,
  GraduationCap,
  ArrowRight,
  MapPin,
  Phone,
  MessageSquare,
  Heart,
  Quote,
  Facebook,
  Instagram,
  Twitter,
  Lightbulb,
  Stethoscope,
  Sprout,
  Scale,
  Trophy,
  TrendingUp,
  Palette,
  Briefcase,
  Handshake,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import { insertSupporterSchema, type InsertSupporter } from "@shared/schema";
import { useCreateSupporter, useSupporterCount } from "@/hooks/use-campaign";
import { useProposals, useHomeContent, useCouncilMembers } from "@/hooks/use-content";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { ProposalCard } from "@/components/ProposalCard";
import { Button } from "@/components/ui/button";
import MultiStepModal from "@/components/MultiStepModal";
import Footer from "@/components/Footer";
import { FloatingThemeButton } from "@/components/FloatingThemeButton";
import { FloatingDemoButtons } from "@/components/FloatingDemoButtons";

function getCategoryIcon(category: string) {
  const normalized = category.toLowerCase();
  const iconClass = "w-full h-full";

  if (normalized.includes("infraestructura")) return <Building2 className={iconClass} />;
  if (normalized.includes("desarrollo social") || normalized.includes("social"))
    return <Heart className={iconClass} />;
  if (normalized.includes("institu")) return <Landmark className={iconClass} />;
  if (normalized.includes("salud")) return <Stethoscope className={iconClass} />;
  if (normalized.includes("educa")) return <GraduationCap className={iconClass} />;
  if (normalized.includes("agricul")) return <Sprout className={iconClass} />;
  if (normalized.includes("juríd") || normalized.includes("juridi") || normalized.includes("garant"))
    return <Scale className={iconClass} />;
  if (normalized.includes("deporte")) return <Trophy className={iconClass} />;
  if (normalized.includes("económ") || normalized.includes("econom"))
    return <TrendingUp className={iconClass} />;
  if (normalized.includes("cultura")) return <Palette className={iconClass} />;
  if (normalized.includes("trabajo")) return <Briefcase className={iconClass} />;
  if (normalized.includes("cooperat")) return <Handshake className={iconClass} />;
  if (normalized.includes("gestión") || normalized.includes("gestion") || normalized.includes("transparen"))
    return <ShieldCheck className={iconClass} />;

  return <Lightbulb className={iconClass} />;
}

export default function Home() {
  const { toast } = useToast();
  const { data: countData } = useSupporterCount();
  const { data: homeContent } = useHomeContent();
  const { data: dynamicProposals } = useProposals();
  const { data: councilMembers } = useCouncilMembers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToProposals = () => {
    document.getElementById("propuestas")?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToJoin = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Navbar />
      <MultiStepModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-primary/80 to-slate-900/90 z-10" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl z-0" />
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{ backgroundImage: homeContent?.heroImage ? `url("${homeContent.heroImage}")` : `url("https://images.unsplash.com/photo-1540910419892-f0c74b0e8967?q=80&w=2070&auto=format&fit=crop")` }}
        />

        <div className="container relative z-20 mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-bold tracking-wider uppercase">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {homeContent ? (
                  homeContent.allianceMovement
                ) : (
                  <span className="w-24 h-4 bg-white/20 animate-pulse rounded block" />
                )}
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] text-balance">
                {homeContent ? (
                  homeContent.heroTitle
                ) : (
                  <span className="block h-20 w-full bg-white/10 animate-pulse rounded-lg" />
                )}
              </h1>
              
              <div className="min-h-[3rem]">
                {homeContent ? (
                  <p className="text-xl text-white/90 max-w-lg leading-relaxed font-medium">
                    {homeContent.heroSubtitle}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" variant="secondary" onClick={scrollToJoin} className="text-base font-bold shadow-xl bg-white text-primary hover:bg-slate-100 transition-transform">
                  Sumate al equipo
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToProposals} className="text-base border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm">
                  Conocé mi compromiso
                </Button>
              </div>

              {/* Bloque de contadores movido al Hero */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg group hover:bg-white/20 transition-colors"
                >
                  <Users className="w-8 h-8 text-accent mb-2" />
                  <div className="text-2xl font-black text-white">
                    {countData ? `+${countData.count.toLocaleString()}` : null}
                  </div>
                  <div className="text-white/70 font-bold uppercase tracking-wider text-[10px]">Vecinos sumados</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg group hover:bg-white/20 transition-colors"
                >
                  <MapPin className="w-8 h-8 text-accent mb-2" />
                  <div className="text-2xl font-black text-white">6</div>
                  <div className="text-white/70 font-bold uppercase tracking-wider text-[10px]">Presencia en barrios</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg group hover:bg-white/20 transition-colors"
                >
                  <Lightbulb className="w-8 h-8 text-accent mb-2" />
                  <div className="text-2xl font-black text-white">
                    {dynamicProposals ? dynamicProposals.length : null}
                  </div>
                  <div className="text-white/70 font-bold uppercase tracking-wider text-[10px]">Propuestas</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-gradient-to-br from-slate-200 to-slate-300">
                {homeContent && homeContent.candidateImage ? (
                  <img
                    src={homeContent.candidateImage}
                    alt={homeContent.candidateName}
                    className="w-full h-full object-cover object-center"
                    style={{ imageRendering: "auto" }}
                  />
                ) : homeContent ? (
                  <div className="w-full h-full bg-slate-200" />
                ) : (
                  <div className="w-full h-full bg-slate-200 animate-pulse" />
                )}
              </div>

              {/* Tarjeta de identidad debajo de la foto (limpia, sin overlay sobre la imagen) */}
              <div className="relative z-10 -mt-10 mx-6 bg-white rounded-2xl shadow-2xl shadow-black/30 p-5 border border-white/40">
                {homeContent ? (
                  <>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="px-2.5 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                        {homeContent.candidateListNumber}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {homeContent.allianceName}
                      </div>
                    </div>
                    <p className="text-2xl font-black text-slate-900 leading-tight">
                      {homeContent.candidateName}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {homeContent.candidateRole}
                    </p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-6 w-32 bg-slate-200 animate-pulse rounded" />
                    <div className="h-4 w-48 bg-slate-200 animate-pulse rounded" />
                  </div>
                )}
              </div>

              <div className="absolute top-10 right-10 w-full h-full border-2 border-secondary/50 rounded-3xl -z-10 translate-x-4 translate-y-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROPOSALS SECTION */}
      <section id="propuestas" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto mb-16 bg-slate-50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
            <Quote className="w-16 h-16 text-primary/20 shrink-0" />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                "Mi compromiso es caminar con cada vecino, escuchar de primera mano y conducir una intendencia cercana, transparente y de resultados."
              </h3>
              <p className="text-slate-600 leading-relaxed italic">
                — {homeContent?.candidateName || "Tu Candidato"}, {homeContent?.candidateRole || "Candidato a Intendente"}
              </p>
            </div>
          </div>

          <SectionHeading 
            title="Ejes de Gestión" 
            subtitle="Propuestas para transformar nuestra ciudad"
            className="max-w-2xl mx-auto mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 auto-rows-fr">
            {dynamicProposals && dynamicProposals.length > 0
              ? dynamicProposals.map((p, idx) => (
                  <div
                    key={p.id}
                    className={
                      idx === 0
                        ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                        : ""
                    }
                  >
                    <ProposalCard
                      title={p.title}
                      problem={p.problem}
                      solution={p.solution}
                      icon={getCategoryIcon(p.category)}
                      delay={Math.min(idx, 6) * 0.05}
                      featured={idx === 0}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>

      {/* EQUIPO / CONCEJALES SECTION */}
      <section id="equipo" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading
            title="Nuestro Equipo"
            subtitle="Lista 4 — Concejales que te representan"
            className="max-w-2xl mx-auto mb-16 text-center"
          />

          {/* Líder de Lista */}
          <div className="max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-primary to-primary/80 text-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-primary/30 overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl shrink-0 bg-white/10">
                  {homeContent?.candidateImage ? (
                    <img
                      src={homeContent.candidateImage}
                      alt={homeContent.candidateName}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/20 animate-pulse" />
                  )}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest mb-3">
                    Cabeza de Lista
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                    {homeContent?.candidateName || "Candidato Demo"}
                  </h3>
                  <p className="text-white/90 font-semibold">
                    {homeContent?.candidateRole || "Candidato a Intendente"}
                  </p>
                  <p className="text-white/80 text-sm mt-2">
                    {homeContent?.candidateListNumber || "LISTA N° 1"} · Movimiento Demo
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Grid de Concejales */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {(councilMembers || []).map((member, idx) => {
              const initials = member.name
                .replace(/^Lic\.\s*/i, "")
                .replace(/^Dr\.\s*/i, "")
                .replace(/^Ing\.\s*/i, "")
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n[0])
                .join("")
                .toUpperCase();
              const listLabel = (homeContent?.candidateListNumber || "Lista 4").replace(/lista\s*n?°?\s*/i, "").trim() || "4";
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(idx, 8) * 0.04 }}
                  className="group bg-white rounded-2xl p-5 shadow-md shadow-slate-200/60 border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 text-center flex flex-col items-center"
                >
                  <div className="relative mb-4">
                    {member.imageUrl ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg group-hover:scale-105 transition-transform">
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
                        {initials}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 min-w-[1.75rem] h-7 px-1.5 rounded-full bg-white border-2 border-primary flex items-center justify-center text-[10px] font-black text-primary shadow">
                      {member.position || idx + 1}
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-2 min-h-[2.5rem] flex items-center">
                    {member.name}
                  </h4>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {member.role || "Concejal"} · Lista {listLabel}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRANSPARENCIA SECTION */}
      <section id="transparencia" className="py-24 bg-white text-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Compromiso de Gestión
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              Transparencia y <span className="text-primary">Cercanía Territorial</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              No gobernamos desde un escritorio. Caminamos cada barrio, cada compañía, cada calle —
              porque una intendencia que escucha es una intendencia que transforma.
            </p>
          </div>

          {/* Cards de compromisos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "En el Barrio",
                desc: "Recorridas permanentes por cada compañía, escuchando a los vecinos en su propio lugar.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Participación Real",
                desc: "Espacios abiertos para que cada vecino aporte ideas y fiscalice la gestión municipal.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Cuentas Claras",
                desc: "Informes trimestrales públicos sobre el uso de los recursos y avances de cada obra.",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Puerta Abierta",
                desc: "Canales directos de comunicación con el intendente y todo el equipo municipal.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Banner de acción territorial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-slate-900 via-primary to-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/30 overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest mb-4">
                  <MapPin className="w-3 h-3" />
                  Acción Territorial
                </div>
                <h3 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                  Una intendencia que camina con vos
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {homeContent?.transparencyText ||
                    "Publicaremos informes trimestrales de gestión accesibles a todos los vecinos."}
                </p>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center lg:text-left">
                  <div className="text-3xl font-black">6+</div>
                  <div className="text-xs uppercase tracking-widest text-white/80 font-bold">
                    Barrios recorridos
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center lg:text-left">
                  <div className="text-3xl font-black">13</div>
                  <div className="text-xs uppercase tracking-widest text-white/80 font-bold">
                    Ejes de gestión
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center lg:text-left">
                  <div className="text-3xl font-black">12</div>
                  <div className="text-xs uppercase tracking-widest text-white/80 font-bold">
                    Concejales con vos
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="secondary"
                onClick={() =>
                  document.getElementById("propuestas")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-primary hover:bg-slate-100 font-bold"
              >
                Ver propuestas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
                className="border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm font-bold"
              >
                Sumate al equipo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JOIN US SECTION */}
      <section id="sumate" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <SectionHeading 
              title="Formá parte del equipo" 
              subtitle="Sumate al Movimiento"
              className="text-white mb-6"
            />
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tu apoyo es la fuerza que necesitamos para representar con lealtad a nuestro partido 
              y a nuestra ciudad. Sumate ahora para trabajar juntos por el futuro de tu barrio.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-8 pt-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 min-w-[200px]">
                <div className="text-3xl font-bold text-white mb-1">Unidos</div>
                <div className="text-sm text-white/80 uppercase tracking-widest">Por el Pueblo</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 min-w-[200px]">
                <div className="text-3xl font-bold text-white mb-1">
                  {countData ? countData.count.toLocaleString() : "..."}
                </div>
                <div className="text-sm text-white/80 uppercase tracking-widest">Simpatizantes Sumados</div>
              </div>
            </div>

            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 text-xl font-bold h-16 px-12 shadow-2xl hover:scale-105 transition-transform"
            >
              Quiero ser parte
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingThemeButton />
      <FloatingDemoButtons />
    </div>
  );
}
