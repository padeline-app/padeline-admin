import { pgTable, unique, varchar, timestamp, numeric, jsonb, foreignKey, integer, boolean, date, pgMaterializedView, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import type { AdminRole, GameMode, MeetFormat, MeetSessionStatus, ParticipantRole } from "../types"



export const adminUser = pgTable("admin_user", {
	firebaseUid: varchar("firebase_uid").primaryKey().notNull(),
	email: varchar().notNull(),
	role: varchar().$type<AdminRole>().default('VIEWER').notNull(),
	lastLoginAt: timestamp("last_login_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	unique("admin_user_email_unique").on(table.email),
]);

export const venue = pgTable("venue", {
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	addressFull: varchar("address_full").notNull(),
	city: varchar().notNull(),
	country: varchar().notNull(),
	lat: numeric({ precision: 9, scale:  6 }).notNull(),
	lng: numeric({ precision: 9, scale:  6 }).notNull(),
	imageUrls: jsonb("image_urls").default([]).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
});

export const meetParticipant = pgTable("meet_participant", {
	id: varchar().primaryKey().notNull(),
	meetSessionId: varchar("meet_session_id").notNull(),
	userId: varchar("user_id").notNull(),
	role: varchar().$type<ParticipantRole>().notNull(),
	joinedAt: timestamp("joined_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	teamId: varchar("team_id"),
}, (table) => [
	foreignKey({
			columns: [table.meetSessionId],
			foreignColumns: [meetSession.id],
			name: "meet_participant_meet_session_id_meet_session_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "meet_participant_user_id_user_id_fk"
		}),
]);

export const ratingUpdate = pgTable("rating_update", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id").notNull(),
	matchId: varchar("match_id").notNull(),
	previousElo: numeric("previous_elo").notNull(),
	newElo: numeric("new_elo").notNull(),
	eloChange: numeric("elo_change").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	status: varchar().default('PENDING').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.matchId],
			foreignColumns: [match.id],
			name: "rating_update_match_id_match_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "rating_update_user_id_user_id_fk"
		}),
]);

export const round = pgTable("round", {
	id: varchar().primaryKey().notNull(),
	meetSessionId: varchar("meet_session_id").notNull(),
	roundNumber: integer("round_number").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	status: varchar().default('IN_PROGRESS').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.meetSessionId],
			foreignColumns: [meetSession.id],
			name: "round_meet_session_id_meet_session_id_fk"
		}),
]);

export const meetSession = pgTable("meet_session", {
	id: varchar().primaryKey().notNull(),
	title: varchar().notNull(),
	description: varchar(),
	venueId: varchar("venue_id").notNull(),
	organiserId: varchar("organiser_id").notNull(),
	startsAt: timestamp("starts_at", { mode: 'string' }).notNull(),
	endsAt: timestamp("ends_at", { mode: 'string' }).notNull(),
	totalPoints: integer("total_points"),
	gameMode: varchar("game_mode").$type<GameMode>().notNull(),
	meetFormat: varchar("meet_format").$type<MeetFormat>().notNull(),
	maxParticipants: integer("max_participants").notNull(),
	status: varchar().$type<MeetSessionStatus>().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	numberOfCourts: integer("number_of_courts").notNull(),
	cancellationDeadline: integer("cancellation_deadline").notNull(),
	pairingState: jsonb("pairing_state"),
	pointsType: varchar("points_type").default('TENNIS_POINTS').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.organiserId],
			foreignColumns: [user.id],
			name: "meet_session_organiser_id_user_id_fk"
		}),
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venue.id],
			name: "meet_session_venue_id_venue_id_fk"
		}),
]);

export const user = pgTable("user", {
	id: varchar().primaryKey().notNull(),
	email: varchar().notNull(),
	username: varchar().notNull(),
	firstName: varchar("first_name"),
	lastName: varchar("last_name"),
	profileImageUrl: varchar("profile_image_url"),
	eloRating: numeric("elo_rating").default('1500').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	isClaimed: boolean("is_claimed").default(true).notNull(),
	metadata: jsonb(),
	dob: date(),
	gender: varchar(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const matchPlayer = pgTable("match_player", {
	id: varchar().primaryKey().notNull(),
	matchId: varchar("match_id").notNull(),
	meetParticipantId: varchar("meet_participant_id").notNull(),
	team: varchar().notNull(),
	playerSlot: varchar("player_slot").notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.matchId],
			foreignColumns: [match.id],
			name: "match_player_match_id_match_id_fk"
		}),
	foreignKey({
			columns: [table.meetParticipantId],
			foreignColumns: [meetParticipant.id],
			name: "match_player_meet_participant_id_meet_participant_id_fk"
		}),
]);

export const match = pgTable("match", {
	id: varchar().primaryKey().notNull(),
	roundId: varchar("round_id").notNull(),
	team1Score: integer("team1_score").notNull(),
	team2Score: integer("team2_score").notNull(),
	status: varchar().notNull(),
	winningTeam: varchar("winning_team"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	matchState: jsonb("match_state"),
}, (table) => [
	foreignKey({
			columns: [table.roundId],
			foreignColumns: [round.id],
			name: "match_round_id_round_id_fk"
		}),
]);

export const pushToken = pgTable("push_token", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id").notNull(),
	token: varchar().notNull(),
	platform: varchar().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "push_token_user_id_user_id_fk"
		}),
]);
export const globalLeaderboard = pgMaterializedView("global_leaderboard", {	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	rank: bigint({ mode: "number" }),
	userId: varchar("user_id"),
	username: varchar(),
	firstName: varchar("first_name"),
	lastName: varchar("last_name"),
	profileImageUrl: varchar("profile_image_url"),
	eloRating: numeric("elo_rating"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	wins: bigint({ mode: "number" }),
	lastDelta: numeric("last_delta"),
}).as(sql`WITH latest_rating_updates AS ( SELECT rating_update.user_id, rating_update.elo_change, row_number() OVER (PARTITION BY rating_update.user_id ORDER BY rating_update.created_at DESC) AS rn FROM rating_update ), user_match_stats AS ( SELECT p.user_id, count(*) AS total_matches, sum( CASE WHEN m.winning_team::text = mp.team::text THEN 1 ELSE 0 END) AS wins FROM match_player mp JOIN match m ON mp.match_id::text = m.id::text JOIN meet_participant p ON mp.meet_participant_id::text = p.id::text WHERE m.status::text = 'COMPLETED'::text AND m.deleted_at IS NULL GROUP BY p.user_id ) SELECT row_number() OVER (ORDER BY u.elo_rating DESC) AS rank, u.id AS user_id, u.username, u.first_name, u.last_name, u.profile_image_url, u.elo_rating, COALESCE(stats.wins, 0::bigint) AS wins, COALESCE(lru.elo_change, 0::numeric) AS last_delta FROM "user" u LEFT JOIN user_match_stats stats ON u.id::text = stats.user_id::text LEFT JOIN latest_rating_updates lru ON u.id::text = lru.user_id::text AND lru.rn = 1 WHERE u.deleted_at IS NULL`);