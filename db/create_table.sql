CREATE TABLE IF NOT EXISTS relay_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(32) NOT NULL,
    suffix VARCHAR(64) NOT NULL
);

CREATE UNIQUE INDEX unique_rule ON relay_rules (type, suffix);

CREATE TABLE IF NOT EXISTS relay_conf (
    type STRING PRIMARY KEY,
    value VARCHAR(36) NOT NULL,
    created TIMESTAMP NOT NULL
);