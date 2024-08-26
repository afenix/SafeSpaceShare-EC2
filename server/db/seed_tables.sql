-- Step 1: Insert sample users
DO $$
DECLARE
  i INT := 1;
  userId INT;
  locationId INT;
  identityId INT;
BEGIN
  WHILE i <= 100 LOOP
    -- Insert a new user
    INSERT INTO users (final_thoughts) VALUES ('Sample thought ' || i) RETURNING user_id INTO userId;

    -- Insert a new location for each user, using Portland lat/long, with some duplicates
    INSERT INTO locations (user_id, datetime, latitude, longitude, geom, location_name)
    VALUES (
        userId,
        NOW() - (INTERVAL '1 day' * (RANDOM() * 100)::int),
        45.5 + (RANDOM() * 0.02),
        -122.7 + (RANDOM() * 0.02),
        ST_SetSRID(ST_MakePoint(-122.7 + (RANDOM() * 0.02), 45.5 + (RANDOM() * 0.02)), 4326),
        'Sample Location ' || i
    ) RETURNING location_id INTO locationId;

    -- Randomly select a category and subcategory for the user
    INSERT INTO user_identities (user_id, location_id, identity_id)
    SELECT userId, locationId, identity_id
    FROM identities
    WHERE subcategory_id IN (
      SELECT subcategory_id
      FROM subcategories
      WHERE category_id IN (SELECT category_id FROM categories ORDER BY RANDOM() LIMIT 1)
      ORDER BY RANDOM() LIMIT 1
    ) LIMIT 1;

    -- Insert sample emotional data
    INSERT INTO emotions (user_id, location_id, sad_happy, anxious_calm, tired_awake, unsafe_safe, isolated_belonging)
    VALUES
      (userId, locationId, (RANDOM() * 4 + 1)::int, (RANDOM() * 4 + 1)::int, (RANDOM() * 4 + 1)::int, (RANDOM() * 4 + 1)::int, (RANDOM() * 4 + 1)::int);

    i := i + 1;
  END LOOP;
END $$;
