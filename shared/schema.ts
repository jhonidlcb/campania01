import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const supporters = pgTable("supporters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  neighborhood: text("neighborhood").notNull(),
  neighborhoodType: text("neighborhood_type").notNull().default("Barrio"),
  phone: text("phone").notNull(),
  cedula: text("cedula").notNull().default(""),
  familySize: text("family_size").notNull().default(""),
  ageRange: text("age_range").notNull().default(""),
  status: text("status").notNull().default("nuevo"),
  origin: text("origin").notNull().default("web_modal"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  imageUrl: text("image_url"),
});

export const homeContent = pgTable("home_content", {
  id: serial("id").primaryKey(),
  heroTitle: text("hero_title").notNull().default("CONSTRUYENDO EL FUTURO JUNTOS."),
  heroSubtitle: text("hero_subtitle").notNull().default("Unimos fuerzas por una ciudad transparente, moderna y llena de oportunidades para cada familia."),
  heroImage: text("hero_image"),
  allianceName: text("alliance_name").notNull().default("ALIANZA POR EL CAMBIO"),
  allianceMovement: text("alliance_movement").notNull().default("ALIANZA POR EL PROGRESO 2026"),
  candidateName: text("candidate_name").notNull().default("Candidato Lista 1"),
  candidateRole: text("candidate_role").notNull().default("Opción a Concejal Municipal"),
  candidateImage: text("candidate_image"),
  candidateListNumber: text("candidate_list_number").notNull().default("AL"),
  theme: text("theme").notNull().default("colorado"),
  candidateBio: text("candidate_bio").notNull().default("Vecino de toda la vida, comprometido con el desarrollo de nuestras compañías y barrios. Creo en una gestión cercana, transparente y con resultados concretos."),
  transparencyText: text("transparency_text").notNull().default("Publicaremos informes trimestrales de gestión accesibles a todos los vecinos."),
  footerAddress: text("footer_address").notNull().default("Avda. Principal 123, Ciudad Demo"),
  footerPhone: text("footer_phone").notNull().default("+595 9XX XXX XXX"),
  footerEmail: text("footer_email").notNull().default("contacto@ejemplo.com"),
  footerFacebook: text("footer_facebook").notNull().default("https://facebook.com"),
  footerInstagram: text("footer_instagram").notNull().default("https://instagram.com"),
  footerTwitter: text("footer_twitter").notNull().default("https://twitter.com"),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  imageUrl: text("image_url"),
});

export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  problem: text("problem").notNull().default(""),
  solution: text("solution").notNull().default(""),
  category: text("category").notNull(), // Salud, Educación, Caminos, etc.
});

export const councilMembers = pgTable("council_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default("Concejal"),
  position: integer("position").notNull().default(0),
  imageUrl: text("image_url"),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertSupporterSchema = createInsertSchema(supporters).omit({ id: true, createdAt: true });
export const insertActivitySchema = createInsertSchema(activities).extend({
  date: z.string().or(z.date())
}).omit({ id: true });
export const insertHomeContentSchema = createInsertSchema(homeContent).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, date: true });
export const insertProposalSchema = createInsertSchema(proposals).omit({ id: true });
export const insertCouncilMemberSchema = createInsertSchema(councilMembers).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertSupporter = z.infer<typeof insertSupporterSchema>;
export type Supporter = typeof supporters.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type HomeContent = typeof homeContent.$inferSelect;
export type InsertHomeContent = z.infer<typeof insertHomeContentSchema>;
export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type CouncilMember = typeof councilMembers.$inferSelect;
export type InsertCouncilMember = z.infer<typeof insertCouncilMemberSchema>;
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
