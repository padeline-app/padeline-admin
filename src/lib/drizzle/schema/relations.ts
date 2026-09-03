import { relations } from "drizzle-orm/relations";
import { meetSession, meetParticipant, user, match, ratingUpdate, round, venue, matchPlayer, pushToken } from "./schema";

export const meetParticipantRelations = relations(meetParticipant, ({one, many}) => ({
	meetSession: one(meetSession, {
		fields: [meetParticipant.meetSessionId],
		references: [meetSession.id]
	}),
	user: one(user, {
		fields: [meetParticipant.userId],
		references: [user.id]
	}),
	matchPlayers: many(matchPlayer),
}));

export const meetSessionRelations = relations(meetSession, ({one, many}) => ({
	meetParticipants: many(meetParticipant),
	rounds: many(round),
	user: one(user, {
		fields: [meetSession.organiserId],
		references: [user.id]
	}),
	venue: one(venue, {
		fields: [meetSession.venueId],
		references: [venue.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	meetParticipants: many(meetParticipant),
	ratingUpdates: many(ratingUpdate),
	meetSessions: many(meetSession),
	pushTokens: many(pushToken),
}));

export const ratingUpdateRelations = relations(ratingUpdate, ({one}) => ({
	match: one(match, {
		fields: [ratingUpdate.matchId],
		references: [match.id]
	}),
	user: one(user, {
		fields: [ratingUpdate.userId],
		references: [user.id]
	}),
}));

export const matchRelations = relations(match, ({one, many}) => ({
	ratingUpdates: many(ratingUpdate),
	matchPlayers: many(matchPlayer),
	round: one(round, {
		fields: [match.roundId],
		references: [round.id]
	}),
}));

export const roundRelations = relations(round, ({one, many}) => ({
	meetSession: one(meetSession, {
		fields: [round.meetSessionId],
		references: [meetSession.id]
	}),
	matches: many(match),
}));

export const venueRelations = relations(venue, ({many}) => ({
	meetSessions: many(meetSession),
}));

export const matchPlayerRelations = relations(matchPlayer, ({one}) => ({
	match: one(match, {
		fields: [matchPlayer.matchId],
		references: [match.id]
	}),
	meetParticipant: one(meetParticipant, {
		fields: [matchPlayer.meetParticipantId],
		references: [meetParticipant.id]
	}),
}));

export const pushTokenRelations = relations(pushToken, ({one}) => ({
	user: one(user, {
		fields: [pushToken.userId],
		references: [user.id]
	}),
}));