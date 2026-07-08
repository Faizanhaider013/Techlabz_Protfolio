import {
  BadgeCheck, BrainCircuit, Building2, CalendarCheck, CloudCog, Compass, Database, Eye,
  Factory, Gauge, Gem, Globe, GraduationCap, Handshake, Headset, HeartPulse,
  Landmark, Lock, Palette, RadioTower, Rocket, ShieldCheck, ShoppingBag,
  Smartphone, Sparkles, Star, TrendingUp, Users, Workflow, Zap, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BadgeCheck, BrainCircuit, Building2, CalendarCheck, CloudCog, Compass, Database, Eye,
  Factory, Gauge, Gem, Globe, GraduationCap, Handshake, Headset, HeartPulse,
  Landmark, Lock, Palette, RadioTower, Rocket, ShieldCheck, ShoppingBag,
  Smartphone, Sparkles, Star, TrendingUp, Users, Workflow, Zap,
};

/** Resolves a lucide icon by name (used by data-driven cards). */
export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}
