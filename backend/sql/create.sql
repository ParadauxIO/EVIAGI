CREATE TABLE eviagi_ballots (
    ballot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    election_id UUID NOT NULL,
    choices JSONB,
    spoiled BOOL
);

CREATE TABLE eviagi_elections (
    election_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opened TIMESTAMP,
    closes TIMESTAMP,
    has_reopen_nominations BOOL,
    uses_constituencies BOOL,
    valid_constituencies UUID[]
);

CREATE TABLE eviagi_candidates (
    
);

CREATE TABLE eviagi_electorate (

);

CREATE TABLE eviagi_constituencies (

);