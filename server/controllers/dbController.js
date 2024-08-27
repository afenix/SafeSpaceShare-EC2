const pool = require('../db'); // database connection

const insertExperience = async (req, res) => {
    const { datetime, location, locationName, selectedIdentities, emotions, finalThoughts } = req.body;

    try {
        // Create a new user and get the user_id
        const userResult = await pool.query(
            `INSERT INTO users (final_thoughts) VALUES ($1) RETURNING user_id`,
            [finalThoughts]
        );

        const userId = userResult.rows[0].user_id;

        // Insert location and time information into the locations table
        // Note: The geom field is automatically populated with a PostGIS point geometry
        //       using the provided latitude and longitude. This enables efficient geospatial
        //       queries on the location data later on.
        const locationResult = await pool.query(
            `INSERT INTO locations (user_id, datetime, latitude, longitude, geom, location_name)
             VALUES ($1, $2, $3::numeric, $4::numeric, ST_SetSRID(ST_MakePoint($4::numeric, $3::numeric), 4326), $5)
             RETURNING location_id, datetime, latitude, longitude, location_name`,
            [userId, datetime, location.latitude, location.longitude, locationName]
        );

        const locationId = locationResult.rows[0].location_id;

        // Process the selected identities
        for (const { category, subcategory } of selectedIdentities) {
            // Get or create the category_id from the Identity_Categories table
            const categoryResult = await pool.query(
                `SELECT category_id FROM categories WHERE category_name = $1`,
                [category]
            );
            const categoryId = categoryResult.rows[0].category_id;

            // Get or create the subcategory_id from the Identity_Subcategories table
            let subcategoryResult = await pool.query(
                `SELECT subcategory_id FROM subcategories WHERE subcategory_name = $1 AND category_id = $2`,
                [subcategory, categoryId]
            );

            if (subcategoryResult.rows.length === 0) {
                // If the subcategory doesn't exist, insert it
                subcategoryResult = await pool.query(
                    `INSERT INTO subcategories (subcategory_name, category_id)
                     VALUES ($1, $2) RETURNING subcategory_id`,
                    [subcategory, categoryId]
                );
            }

            const subcategoryId = subcategoryResult.rows[0].subcategory_id;

            // Get or create the identity_id in the Identities table
            let identityResult = await pool.query(
                `SELECT identity_id FROM identities WHERE subcategory_id = $1`,
                [subcategoryId]
            );

            if (identityResult.rows.length === 0) {
                // If the identity doesn't exist, insert it
                identityResult = await pool.query(
                    `INSERT INTO identities (subcategory_id, identity_description)
                     VALUES ($1, $2) RETURNING identity_id`,
                    [subcategoryId, `${category} - ${subcategory}`]
                );
            }

            const identityId = identityResult.rows[0].identity_id;

            // Insert into user_identities table linking user, location, and identity
            await pool.query(
                'INSERT INTO user_identities (user_id, location_id, identity_id) VALUES ($1, $2, $3)',
                [userId, locationId, identityId]
            );
        }

        // Insert emotions into the Emotions table
        await pool.query(
            `INSERT INTO emotions (user_id, location_id, sad_happy, anxious_calm, tired_awake, unsafe_safe, isolated_belonging)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [userId, locationId, emotions.sad_happy, emotions.anxious_calm, emotions.tired_awake, emotions.unsafe_safe, emotions.isolated_belonging]
        );

        // Send back the data that was inserted, including the user_id
        res.status(200).json({
            message: 'Experience and emotions submitted successfully',
            user_id: userId,
            location: locationResult.rows[0],
            identities: selectedIdentities,
            emotions: emotions
        });
    } catch (error) {
        console.error('Error inserting experience data', error);
        res.status(500).send('Error saving experience');
    }
};

const getIdentityData = async () => {
    try {
        const categories = await pool.query('SELECT category_name FROM categories');
        const subcategories = await pool.query('SELECT subcategories.subcategory_name, categories.category_name FROM subcategories INNER JOIN categories ON subcategories.category_id = categories.category_id');
        return { categories: categories.rows, subcategories: subcategories.rows };
      } catch (error) {
        console.error('Error fetching identity data:', error);
        throw error;
      }
};

const getGeojsonData = async (req, res) => {
    try {
        const { identityCategory, emotionType } = req.query;

        let query = `
        SELECT
          ST_AsGeoJSON(l.geom) AS geometry,
          l.location_name,
          e.sad_happy,
          e.anxious_calm,
          e.tired_awake,
          e.unsafe_safe,
          e.isolated_belonging,
          ARRAY_AGG(json_build_object(
              'category', c.category_name,
              'subIdentity', s.subcategory_name,
              'description', i.identity_description
          )) AS identities
        FROM Locations l
        LEFT JOIN Emotions e ON l.location_id = e.location_id
        LEFT JOIN User_Identities ui ON l.location_id = ui.location_id
        LEFT JOIN Identities i ON ui.identity_id = i.identity_id
        LEFT JOIN Subcategories s ON i.subcategory_id = s.subcategory_id
        LEFT JOIN Categories c ON s.category_id = c.category_id
      `;

      let queryParams = [];

      if (identityCategory || emotionType) {
        query += ` WHERE `;

        if (identityCategory) {
          queryParams.push(identityCategory);
          query += `c.category_name = $${queryParams.length} `;
        }

        if (emotionType) {
          if (queryParams.length > 0) query += ` AND `;
          queryParams.push(emotionType);
          query += `e.${emotionType} IS NOT NULL `;
        }
      }

      query += `
        GROUP BY l.location_id, l.geom, l.location_name, e.sad_happy, e.anxious_calm, e.tired_awake, e.unsafe_safe, e.isolated_belonging
      `;

      const result = await pool.query(query, queryParams);

      const geojson = {
        type: "FeatureCollection",
        features: result.rows.map(row => ({
          type: "Feature",
          geometry: JSON.parse(row.geometry),
          properties: {
            locationName: row.location_name,
            emotions: {
              sad_happy: row.sad_happy,
              anxious_calm: row.anxious_calm,
              tired_awake: row.tired_awake,
              unsafe_safe: row.unsafe_safe,
              isolated_belonging: row.isolated_belonging,
            },
            identities: row.identities
          }
        }))
      };
      return res.json(geojson);
    } catch (error) {
      console.error('Error fetching heatmap data:', error);
      res.status(500).send('Server Error');
    }
};

module.exports = { insertExperience, getIdentityData, getGeojsonData };
