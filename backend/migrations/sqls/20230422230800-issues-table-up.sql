CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories(id),
    reproducibility TEXT NOT NULL,
    severity INT NOT NULL,
    priority INT NOT NULL,
    summary TEXT NOT NULL,
    issue_desc TEXT NOT NULL,
    view_status INT NOT NULL,
    issue_status INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at DATE,
    deleted_at DATE,
    user_id INT NOT NULL REFERENCES users(id)
);