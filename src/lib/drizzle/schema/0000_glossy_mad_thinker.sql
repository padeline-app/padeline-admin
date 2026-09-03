-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "venue" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"address_full" varchar NOT NULL,
	"city" varchar NOT NULL,
	"country" varchar NOT NULL,
	"lat" numeric(9, 6) NOT NULL,
	"lng" numeric(9, 6) NOT NULL,
	"image_urls" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "meet_participant" (
	"id" varchar PRIMARY KEY NOT NULL,
	"meet_session_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"role" varchar NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"team_id" varchar
);
--> statement-breakpoint
CREATE TABLE "rating_update" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"match_id" varchar NOT NULL,
	"previous_elo" numeric NOT NULL,
	"new_elo" numeric NOT NULL,
	"elo_change" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar DEFAULT 'PENDING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "round" (
	"id" varchar PRIMARY KEY NOT NULL,
	"meet_session_id" varchar NOT NULL,
	"round_number" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"status" varchar DEFAULT 'IN_PROGRESS' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meet_session" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"venue_id" varchar NOT NULL,
	"organiser_id" varchar NOT NULL,
	"starts_at" timestamp NOT NULL,
	"ends_at" timestamp NOT NULL,
	"total_points" integer,
	"game_mode" varchar NOT NULL,
	"meet_format" varchar NOT NULL,
	"max_participants" integer NOT NULL,
	"status" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"number_of_courts" integer NOT NULL,
	"cancellation_deadline" integer NOT NULL,
	"pairing_state" jsonb,
	"points_type" varchar DEFAULT 'TENNIS_POINTS' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"elo_rating" numeric DEFAULT '1500' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_claimed" boolean DEFAULT true NOT NULL,
	"metadata" jsonb,
	"dob" date,
	"gender" varchar,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "match_player" (
	"id" varchar PRIMARY KEY NOT NULL,
	"match_id" varchar NOT NULL,
	"meet_participant_id" varchar NOT NULL,
	"team" varchar NOT NULL,
	"player_slot" varchar NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "match" (
	"id" varchar PRIMARY KEY NOT NULL,
	"round_id" varchar NOT NULL,
	"team1_score" integer NOT NULL,
	"team2_score" integer NOT NULL,
	"status" varchar NOT NULL,
	"winning_team" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"match_state" jsonb
);
--> statement-breakpoint
CREATE TABLE "push_token" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"token" varchar NOT NULL,
	"platform" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meet_participant" ADD CONSTRAINT "meet_participant_meet_session_id_meet_session_id_fk" FOREIGN KEY ("meet_session_id") REFERENCES "public"."meet_session"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meet_participant" ADD CONSTRAINT "meet_participant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating_update" ADD CONSTRAINT "rating_update_match_id_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating_update" ADD CONSTRAINT "rating_update_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round" ADD CONSTRAINT "round_meet_session_id_meet_session_id_fk" FOREIGN KEY ("meet_session_id") REFERENCES "public"."meet_session"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meet_session" ADD CONSTRAINT "meet_session_organiser_id_user_id_fk" FOREIGN KEY ("organiser_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meet_session" ADD CONSTRAINT "meet_session_venue_id_venue_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venue"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_player" ADD CONSTRAINT "match_player_match_id_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_player" ADD CONSTRAINT "match_player_meet_participant_id_meet_participant_id_fk" FOREIGN KEY ("meet_participant_id") REFERENCES "public"."meet_participant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_round_id_round_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."round"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "push_token" ADD CONSTRAINT "push_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."global_leaderboard" AS (WITH latest_rating_updates AS ( SELECT rating_update.user_id, rating_update.elo_change, row_number() OVER (PARTITION BY rating_update.user_id ORDER BY rating_update.created_at DESC) AS rn FROM rating_update ), user_match_stats AS ( SELECT p.user_id, count(*) AS total_matches, sum( CASE WHEN m.winning_team::text = mp.team::text THEN 1 ELSE 0 END) AS wins FROM match_player mp JOIN match m ON mp.match_id::text = m.id::text JOIN meet_participant p ON mp.meet_participant_id::text = p.id::text WHERE m.status::text = 'COMPLETED'::text AND m.deleted_at IS NULL GROUP BY p.user_id ) SELECT row_number() OVER (ORDER BY u.elo_rating DESC) AS rank, u.id AS user_id, u.username, u.first_name, u.last_name, u.profile_image_url, u.elo_rating, COALESCE(stats.wins, 0::bigint) AS wins, COALESCE(lru.elo_change, 0::numeric) AS last_delta FROM "user" u LEFT JOIN user_match_stats stats ON u.id::text = stats.user_id::text LEFT JOIN latest_rating_updates lru ON u.id::text = lru.user_id::text AND lru.rn = 1 WHERE u.deleted_at IS NULL);
*/