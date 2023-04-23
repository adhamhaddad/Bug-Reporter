CREATE TABLE IF NOT EXISTS note_images (
    note_id INT NOT NULL REFERENCES notes(id),
    image_id INT NOT NULL REFERENCES images(id),
    PRIMARY KEY (note_id, image_id)
);