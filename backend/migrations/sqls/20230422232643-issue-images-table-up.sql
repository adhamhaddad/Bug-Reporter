CREATE TABLE IF NOT EXISTS issue_images (
    issue_id INT NOT NULL REFERENCES notes(id),
    image_id INT NOT NULL REFERENCES images(id),
    PRIMARY KEY (issue_id, image_id)
);