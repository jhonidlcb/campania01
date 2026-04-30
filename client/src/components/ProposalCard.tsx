import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProposalCardProps {
  title: string;
  problem: string;
  solution: string;
  icon: React.ReactNode;
  delay?: number;
  featured?: boolean;
}

export function ProposalCard({
  title,
  problem,
  solution,
  icon,
  delay = 0,
  featured = false,
}: ProposalCardProps) {
  if (featured) {
    return (
      <Dialog>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay }}
          className="group relative bg-gradient-to-br from-primary via-primary to-primary/80 text-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-primary/30 overflow-hidden h-full flex flex-col justify-between"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          <div className="absolute top-6 right-6 opacity-15 [&>svg]:w-40 [&>svg]:h-40">
            {icon}
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Eje Principal
            </div>

            <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 [&>svg]:w-9 [&>svg]:h-9">
              {icon}
            </div>

            <h3 className="text-3xl md:text-4xl font-black leading-tight mb-4 tracking-tight">
              {title}
            </h3>

            <p className="text-white/90 text-base leading-relaxed mb-6 line-clamp-4">
              {solution}
            </p>
          </div>

          <DialogTrigger asChild>
            <button className="relative z-10 inline-flex items-center gap-2 self-start px-5 py-3 bg-white text-primary rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
              Ver propuesta completa
              <ArrowRight className="w-4 h-4" />
            </button>
          </DialogTrigger>
        </motion.div>

        <ProposalDialogContent
          title={title}
          problem={problem}
          solution={solution}
          icon={icon}
        />
      </Dialog>
    );
  }

  return (
    <Dialog>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="group relative bg-white rounded-2xl p-6 shadow-md shadow-slate-200/60 border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 overflow-hidden h-full flex flex-col"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300 [&>svg]:w-32 [&>svg]:h-32 text-primary">
          {icon}
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300 [&>svg]:w-6 [&>svg]:h-6">
            {icon}
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{title}</h3>

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 mb-4 flex-grow">
            {solution}
          </p>

          <DialogTrigger asChild>
            <button className="inline-flex items-center text-primary text-xs font-bold uppercase tracking-wider self-start hover:gap-2 gap-1 transition-all">
              Leer más
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </DialogTrigger>
        </div>
      </motion.div>

      <ProposalDialogContent
        title={title}
        problem={problem}
        solution={solution}
        icon={icon}
      />
    </Dialog>
  );
}

function ProposalDialogContent({
  title,
  problem,
  solution,
  icon,
}: {
  title: string;
  problem: string;
  solution: string;
  icon: React.ReactNode;
}) {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 [&>svg]:w-8 [&>svg]:h-8">
          {icon}
        </div>
        <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
        <DialogDescription className="text-lg font-medium text-primary/80">
          Plan de Acción para Nuestra Ciudad
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
            Contexto y Necesidad
          </h4>
          <p className="text-slate-700 leading-relaxed">{problem}</p>
        </div>

        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
          <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">
            Nuestra Propuesta
          </h4>
          <p className="text-slate-900 font-medium leading-relaxed text-lg">{solution}</p>
        </div>

        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
          <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
          <p className="text-sm text-green-800 font-medium">
            Compromiso de gestión: trabajaremos por hacer realidad esta propuesta junto a la
            comunidad.
          </p>
        </div>
      </div>
    </DialogContent>
  );
}
