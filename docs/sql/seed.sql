-- Seed the database with sample ballots for testing purposes.
INSERT INTO eviagi_organisers (organiser_id, name) VALUES ('36eb281f-9c92-46f0-8ac4-ca3296df97c2', 'Example Organiser');

INSERT INTO eviagi_elections
    (organiser_id, opens, closes, voting_method, has_reopen_nominations, valid_constituencies, name, description)
VALUES ('36eb281f-9c92-46f0-8ac4-ca3296df97c2', now(), now() + INTERVAL '3 days', 'single-transferable-vote', TRUE, '{}', 'Test Election', 'An interesting election');

