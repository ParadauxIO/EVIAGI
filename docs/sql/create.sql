CREATE TABLE eviagi_organisers (
    organiser_id UUID PRIMARY KEY REFERENCES auth.users(id),
    name TEXT NOT NULL,
    referrer TEXT
);

CREATE TABLE eviagi_admins (
    admin_id UUID REFERENCES auth.users(id),
    name TEXT
);

CREATE TABLE eviagi_electorate (
    elector_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    -- If these next two fields are empty the only way they'll be able
    -- to vote is with a presigned voting link
    identification_type TEXT, -- Email, discord, mcuuid, etc
    identification TEXT -- It's left up to the integration to validate this
);

-- Represents an election.
CREATE TABLE eviagi_elections (
    election_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organiser_id UUID REFERENCES eviagi_organisers(organiser_id),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    opens TIMESTAMP,
    closes TIMESTAMP,
    voting_method TEXT NOT NULL,
    secret_ballot BOOL DEFAULT TRUE,
    has_reopen_nominations BOOL DEFAULT FALSE,
    uses_constituencies BOOL DEFAULT TRUE,
    valid_constituencies UUID[],
    name TEXT NOT NULL CHECK (length(name) > 0),
    description TEXT NOT NULL CHECK (length(description) > 0)
);

-- Represents a given cast ballot.
-- Optionally stores information about who cast it.
-- This is for the case of purposefully non-secret ballots
CREATE TABLE eviagi_ballots (
    ballot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    election_id UUID REFERENCES eviagi_elections(election_id),
    -- Only for non-secret ballots, ordinarily not stored.
    elector_id UUID REFERENCES eviagi_electorate(elector_id),
    choices JSONB -- If it's null the vote has been spoiled.
);

-- Represents a candidate standing for election.
-- It's possible that two candidates could have the same name
-- in this case affiliation should be used to discern them.
-- Otherwise, affiliation should be used (if applicable)
-- to represent organisation affiliation (e.g., Political Party)
CREATE TABLE eviagi_candidates (
    candidate_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    election_id UUID NOT NULL REFERENCES eviagi_elections(election_id),
    candidate_name TEXT NOT NULL,
    candidate_affiliation TEXT
);

-- The prescence of a record here for a given elector indicates they
-- have voted in that election.
CREATE TABLE eviagi_voting_status (
    elector_id UUID REFERENCES eviagi_electorate (elector_id),
    election_id UUID REFERENCES eviagi_elections (election_id)
);

-- The groups of defined groups who can vote in a given election.
CREATE TABLE eviagi_constituencies (
    constituency_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT
);

-- Rows indicate an elector is a member of the provided constituency
CREATE TABLE eviagi_constituency_membership (
    constituency_id UUID REFERENCES eviagi_constituencies(constituency_id),
    elector_id UUID REFERENCES eviagi_electorate(elector_id)
)

