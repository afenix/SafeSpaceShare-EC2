DO $$
DECLARE
  i INT := 1;
  userId INT;
  locationId INT;
  subcategoryId INT;
  identityId INT;
  categoryRecord RECORD;
BEGIN
  WHILE i <= 100 LOOP
    -- Insert a new user
    INSERT INTO users (final_thoughts) VALUES ('Sample thought ' || i) RETURNING user_id INTO userId;

    -- Insert a new location for each user (one-to-one relationship)
    INSERT INTO locations (user_id, datetime, latitude, longitude, geom, location_name)
    VALUES (
        userId,
        NOW() - (INTERVAL '1 day' * (RANDOM() * 100)::int),
        45.5 + (RANDOM() * 0.02),
        -122.7 + (RANDOM() * 0.02),
        ST_SetSRID(ST_MakePoint(-122.7 + (RANDOM() * 0.02), 45.5 + (RANDOM() * 0.02)), 4326),
        'Sample Location ' || i
    ) RETURNING location_id INTO locationId;

    -- Randomly decide if main identities are chosen
    IF RANDOM() > 0.3 THEN  -- 70% chance to choose identities, adjust the probability as needed
      -- Loop over randomly selected categories
      FOR categoryRecord IN (SELECT category_id FROM categories ORDER BY RANDOM() LIMIT 11) LOOP
        -- Select a subcategory for each chosen category
        SELECT subcategory_id INTO subcategoryId
        FROM subcategories
        WHERE category_id = categoryRecord.category_id
        ORDER BY RANDOM() LIMIT 1;

        -- Ensure a valid subcategory was found
        IF subcategoryId IS NOT NULL THEN
          -- Insert an identity linked to the selected subcategory
          INSERT INTO identities (subcategory_id, identity_description)
          VALUES (subcategoryId, 'Sample identity for user ' || i)
          RETURNING identity_id INTO identityId;

          -- Link the user and location to the identity
          INSERT INTO user_identities (user_id, location_id, identity_id)
          VALUES (userId, locationId, identityId);
        END IF;
      END LOOP;
    END IF;

    -- Insert sample emotional data
    INSERT INTO emotions (user_id, location_id, sad_happy, anxious_calm, tired_awake, unsafe_safe, isolated_belonging)
    VALUES
      (userId, locationId, (RANDOM() * 4 + 1)::int, (RANDOM() * 4 + 1)::int, (RANDOM() * 4 + 1)::int, (RANDOM() * 4 + 1)::int, (RANDOM() * 4 + 1)::int);

    i := i + 1;
  END LOOP;
END $$;
