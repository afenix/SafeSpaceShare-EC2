const pool = require('../db'); // database connection

const insertExperience = async (req, res) => {
    const { datetime, location, experience, selectedIdentities, emotions } = req.body;

    try {
        // Create a new user and get the user_id
        const userResult = await pool.query(
            `INSERT INTO Users DEFAULT VALUES RETURNING user_id`
        );

        const userId = userResult.rows[0].user_id;

        // Insert experience location and time information into the Experiences table
        // Note: The geom field is automatically populated with a PostGIS point geometry
        //       using the provided latitude and longitude. This enables efficient geospatial
        //       queries on the experience data later on.
        const experienceResult = await pool.query(
            `INSERT INTO Experiences (user_id, datetime, latitude, longitude, geom, location_name)
             VALUES ($1, $2, $3::numeric, $4::numeric, ST_SetSRID(ST_MakePoint($4::numeric, $3::numeric), 4326), $5)
             RETURNING experience_id, datetime, latitude, longitude, location_name`,
            [userId, datetime, location.lat, location.long, experience]
        );

        const experienceId = experienceResult.rows[0].experience_id;

        // Process the selected identities
        for (const { category, subcategory } of selectedIdentities) {
            // Get or create the category_id from the Identity_Categories table
            const categoryResult = await pool.query(
                `SELECT category_id FROM Identity_Categories WHERE category_name = $1`,
                [category]
            );
            const categoryId = categoryResult.rows[0].category_id;

            // Get or create the subcategory_id from the Identity_Subcategories table
            let subcategoryResult = await pool.query(
                `SELECT subcategory_id FROM Identity_Subcategories WHERE subcategory_name = $1 AND category_id = $2`,
                [subcategory, categoryId]
            );

            if (subcategoryResult.rows.length === 0) {
                // If the subcategory doesn't exist, insert it
                subcategoryResult = await pool.query(
                    `INSERT INTO Identity_Subcategories (subcategory_name, category_id)
                     VALUES ($1, $2) RETURNING subcategory_id`,
                    [subcategory, categoryId]
                );
            }

            const subcategoryId = subcategoryResult.rows[0].subcategory_id;

            // Get or create the identity_id in the Identities table
            let identityResult = await pool.query(
                `SELECT identity_id FROM Identities WHERE subcategory_id = $1`,
                [subcategoryId]
            );

            if (identityResult.rows.length === 0) {
                // If the identity doesn't exist, insert it
                identityResult = await pool.query(
                    `INSERT INTO Identities (subcategory_id, identity_description)
                     VALUES ($1, $2) RETURNING identity_id`,
                    [subcategoryId, `${category} - ${subcategory}`]
                );
            }

            const identityId = identityResult.rows[0].identity_id;

            // Insert into User_Identities table linking user, experience, and identity
            await pool.query(
                'INSERT INTO User_Identities (user_id, experience_id, identity_id) VALUES ($1, $2, $3)',
                [userId, experienceId, identityId]
            );
        }

        // Insert emotions into the Emotions table
        await pool.query(
            `INSERT INTO Emotions (user_id, experience_id, sad_happy, anxious_calm, tired_awake, unsafe_safe, isolated_belonging)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [userId, experienceId, emotions.sad_happy, emotions.anxious_calm, emotions.tired_awake, emotions.unsafe_safe, emotions.isolated_belonging]
        );

        // Send back the data that was inserted, including the user_id
        res.status(200).json({
            message: 'Experience and emotions submitted successfully',
            user_id: userId,
            experience: experienceResult.rows[0],
            identities: selectedIdentities,
            emotions: emotions
        });
    } catch (error) {
        console.error('Error inserting experience data', error);
        res.status(500).send('Error saving experience');
    }
};

module.exports = { insertExperience };
