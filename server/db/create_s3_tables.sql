-- Create the Users table to capture user information.
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    final_thoughts TEXT -- Captures the user's final thoughts.
);

-- Create the Categories table - This table captures the broad categories of identities.
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Create the Subcategories table - captures the subcategories that fall under each category.
CREATE TABLE Subcategories (
    subcategory_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES Categories(category_id),
    subcategory_name VARCHAR(255) NOT NULL
);

-- Create the Identities table - captures the specific identities that users may select, linking them to subcategories.
CREATE TABLE Identities (
    identity_id SERIAL PRIMARY KEY,
    subcategory_id INT REFERENCES Subcategories(subcategory_id),
    identity_description TEXT
);

-- Create the Locations table - captures each location a user is reporting on, including date/time, location name, latitude, and longitude, and geometry for spatial analysis.
CREATE TABLE Locations (
    location_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    datetime TIMESTAMP NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    location_name TEXT,
    geom GEOMETRY(Point, 4326) -- Captures the geographic point, using WGS 84 (SRID 4326).
);

-- Create the User_Identities table (join table) - serves as a junction table between user Locations and the identities they feel are relevant.
CREATE TABLE User_Identities (
    user_identity_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    location_id INT REFERENCES Locations(location_id),
    identity_id INT REFERENCES Identities(identity_id)
);

-- Create the Emotions table - captures the emotional state of the user during a location.
CREATE TABLE Emotions (
    emotion_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    location_id INT REFERENCES Locations(location_id),
    sad_happy INT CHECK (sad_happy BETWEEN 1 AND 5),
    anxious_calm INT CHECK (anxious_calm BETWEEN 1 AND 5),
    tired_awake INT CHECK (tired_awake BETWEEN 1 AND 5),
    unsafe_safe INT CHECK (unsafe_safe BETWEEN 1 AND 5),
    isolated_belonging INT CHECK (isolated_belonging BETWEEN 1 AND 5)
);

-- Add indexes to improve performance on common queries
CREATE INDEX idx_identity_subcategory ON Identities(subcategory_id);
CREATE INDEX idx_user_identities_locations ON User_Identities(location_id);
CREATE INDEX idx_user_identities_identity ON User_Identities(identity_id);
CREATE INDEX idx_emotions_user ON Emotions(user_id);
CREATE INDEX idx_emotions_locations ON Emotions(location_id);