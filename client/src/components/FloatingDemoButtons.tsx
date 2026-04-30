import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { LayoutDashboard, ShoppingCart, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "595985990046";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola! Vi la demo del sitio web para campañas políticas y me interesa. Quisiera más información para contratar."
);

export function FloatingDemoButtons() {
  const [, navigate] = useLocation();
  const { user, loginMutation } = useAuth();
  const { toast } = useToast();
  const [loadingDemo, setLoadingDemo] = useState(false);

  const handleAdminDemo = () => {
    if (user) {
      navigate("/admin");
      return;
    }
    setLoadingDemo(true);
    loginMutation.mutate(
      { username: "admin", password: "admin2026" },
      {
        onSuccess: () => {
          toast({
            title: "Bienvenido al Demo",
            description: "Estás dentro del panel de administración. ¡Probá todas las funciones!",
          });
          navigate("/admin");
          setLoadingDemo(false);
        },
        onError: () => {
          toast({
            title: "Error",
            description: "No se pudo iniciar el modo demo. Intentá de nuevo.",
            variant: "destructive",
          });
          setLoadingDemo(false);
        },
      }
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-green-500/40 font-bold text-sm hover:shadow-green-500/60 transition-shadow"
        data-testid="button-floating-buy"
      >
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-30 animate-pulse" />
        <ShoppingCart className="h-5 w-5 relative z-10" />
        <span className="relative z-10 whitespace-nowrap">¡Lo quiero!</span>
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-400 border-2 border-white animate-pulse" />
      </motion.a>

      <motion.button
        onClick={handleAdminDemo}
        disabled={loadingDemo || loginMutation.isPending}
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-slate-900 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-slate-900/40 font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-70"
        data-testid="button-floating-admin-demo"
      >
        {loadingDemo || loginMutation.isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <LayoutDashboard className="h-5 w-5" />
        )}
        <span className="whitespace-nowrap">Probar Admin Panel</span>
      </motion.button>
    </div>
  );
}
