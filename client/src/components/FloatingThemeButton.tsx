import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Check } from "lucide-react";

const themes = [
  { id: "colorado", name: "Colorado", description: "Rojo", className: "bg-red-600" },
  { id: "liberal", name: "Liberal", description: "Azul", className: "bg-blue-600" },
  { id: "alianza", name: "Alianza", description: "Naranja y Navy", className: "bg-gradient-to-r from-orange-500 to-slate-900" },
];

export function FloatingThemeButton() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "colorado");
  const [hintDismissed, setHintDismissed] = useState<boolean>(() => localStorage.getItem("themeHintDismissed") === "true");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const dismissHint = () => {
    setHintDismissed(true);
    localStorage.setItem("themeHintDismissed", "true");
  };

  const handlePick = (id: string) => {
    setTheme(id);
    dismissHint();
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex items-end gap-3">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.6 }}
          onClick={() => { setOpen((v) => !v); dismissHint(); }}
          className="relative h-14 w-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          data-testid="button-theme-floating"
          aria-label="Cambiar color del partido"
        >
          {!hintDismissed && (
            <>
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-400 border-2 border-white" />
            </>
          )}
          <Palette className="h-6 w-6 relative z-10" />
        </motion.button>

        <AnimatePresence>
          {!hintDismissed && !open && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              className="relative bg-slate-900 text-white rounded-2xl px-4 py-3 shadow-2xl max-w-[220px]"
            >
              <button
                onClick={(e) => { e.stopPropagation(); dismissHint(); }}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-md hover:bg-slate-100"
                aria-label="Cerrar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="text-xs font-bold leading-tight">
                Elige el color de tu partido
              </p>
              <p className="text-[10px] text-slate-300 mt-0.5">
                Personaliza el tema del sitio
              </p>
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className="fixed bottom-24 left-6 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 w-[280px]"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    Elige el color de tu partido
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    El color se aplicará en todo el sitio
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-slate-700 transition"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {themes.map((t) => {
                  const active = t.id === theme;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handlePick(t.id)}
                      data-testid={`button-theme-${t.id}`}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all text-left ${
                        active
                          ? "border-primary bg-primary/5"
                          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full ${t.className} shadow-md flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 leading-tight">{t.name}</p>
                        <p className="text-[11px] text-slate-500">{t.description}</p>
                      </div>
                      {active && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
