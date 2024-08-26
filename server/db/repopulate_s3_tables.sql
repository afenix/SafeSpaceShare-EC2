-- Remove Duplicate Entries from Identity_Categories Table
WITH CTE AS (
    SELECT
        category_id,
        category_name,
        ROW_NUMBER() OVER (PARTITION BY category_name ORDER BY category_id) AS rn
    FROM
        Identity_Categories
)
DELETE FROM Identity_Categories
WHERE category_id IN (SELECT category_id FROM CTE WHERE rn > 1);

-- Insert into Identity_Categories Only if the Value Does Not Already Exist
INSERT INTO Identity_Categories (category_name)
SELECT 'Age' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Age');
INSERT INTO Identity_Categories (category_name)
SELECT 'Sex' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Sex');
INSERT INTO Identity_Categories (category_name)
SELECT 'Sexuality' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Sexuality');
INSERT INTO Identity_Categories (category_name)
SELECT 'Political Views' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Political Views');
INSERT INTO Identity_Categories (category_name)
SELECT 'Economic Status' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Economic Status');
INSERT INTO Identity_Categories (category_name)
SELECT 'Gender Identity' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Gender Identity');
INSERT INTO Identity_Categories (category_name)
SELECT 'Ethnicity' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Ethnicity');
INSERT INTO Identity_Categories (category_name)
SELECT 'Immigration Status' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Immigration Status');
INSERT INTO Identity_Categories (category_name)
SELECT 'Race' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Race');
INSERT INTO Identity_Categories (category_name)
SELECT 'Religious Beliefs' WHERE NOT EXISTS (SELECT 1 FROM Identity_Categories WHERE category_name = 'Religious Beliefs');

-- Insert into Identity_Subcategories Only if the Value Does Not Already Exist

-- Age Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1), 'Under 18'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Under 18' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1), '18-24'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = '18-24' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1), '25-34'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = '25-34' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1), '35-44'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = '35-44' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1), '45-54'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = '45-54' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1), '55-64'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = '55-64' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1), '65 and older'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = '65 and older' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Age' LIMIT 1));

-- Sex Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sex' LIMIT 1), 'Male'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Male' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sex' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sex' LIMIT 1), 'Female'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Female' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sex' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sex' LIMIT 1), 'Intersex'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Intersex' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sex' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sex' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sex' LIMIT 1));

-- Sexuality Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Asexual'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Asexual' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Gay'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Gay' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Lesbian'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Lesbian' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Heterosexual (Straight)'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Heterosexual (Straight)' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Bi-sexual'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Bi-sexual' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Queer'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Queer' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Pansexual'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Pansexual' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Demisexual'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Demisexual' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Questioning'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Questioning' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Sexuality' LIMIT 1));

-- Political Views Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Liberal'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Liberal' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Conservative'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Conservative' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Socialist'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Socialist' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Moderate'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Moderate' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Libertarian'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Libertarian' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Green'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Green' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Communist'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Communist' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Anarchist'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Anarchist' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Political Views' LIMIT 1));

-- Economic Status Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1), 'Low Income'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Low Income' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1), 'Middle class'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Middle class' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1), 'High Income'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'High Income' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1), 'Working class'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Working class' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1), 'Upper class'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Upper class' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1), 'Unemployed'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Unemployed' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1), 'Retired'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Retired' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Economic Status' LIMIT 1));

-- Gender Identity Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Non-binary'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Non-binary' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Genderqueer'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Genderqueer' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Genderfluid'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Genderfluid' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Transgender'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Transgender' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Cisgender'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Cisgender' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Agender'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Agender' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Bigender'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Bigender' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Two-Spirit'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Two-Spirit' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Transexual'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Transexual' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Gender Identity' LIMIT 1));

-- Ethnicity Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Southeast Asian'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Southeast Asian' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Eastern European'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Eastern European' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Indigenous'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Indigenous' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Mediterranean'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Mediterranean' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Ashkenazi Jewish'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Ashkenazi Jewish' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'West African'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'West African' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'East Asian'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'East Asian' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Mestizo'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Mestizo' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Arab'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Arab' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Latin American'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Latin American' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Caribbean'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Caribbean' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'South Asian'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'South Asian' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Ethnicity' LIMIT 1));

-- Immigration Status Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1), 'Citizen'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Citizen' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1), 'Permanent resident'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Permanent resident' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1), 'Temporary worker'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Temporary worker' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1), 'Student visa holder'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Student visa holder' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1), 'Refugee or asylee'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Refugee or asylee' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Immigration Status' LIMIT 1));

-- Race Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'Black or African American'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Black or African American' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'White or European American'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'White or European American' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'Multiracial'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Multiracial' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'Native Hawaiian or Other Pacific Islander'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Native Hawaiian or Other Pacific Islander' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'Native American or Alaska Native'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Native American or Alaska Native' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'Middle Eastern or North African'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Middle Eastern or North African' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'Hispanic or Latino'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Hispanic or Latino' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'Asian'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Asian' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Race' LIMIT 1));

-- Religious Beliefs Subcategories
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Jewish'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Jewish' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Muslim'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Muslim' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Sikh'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Sikh' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Atheist'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Atheist' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Spiritual but not religious'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Spiritual but not religious' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Buddhist'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Buddhist' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Hindu'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Hindu' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Christian'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Christian' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Agnostic'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Agnostic' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
INSERT INTO Identity_Subcategories (category_id, subcategory_name)
SELECT (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1), 'Other'
WHERE NOT EXISTS (SELECT 1 FROM Identity_Subcategories WHERE subcategory_name = 'Other' AND category_id = (SELECT category_id FROM Identity_Categories WHERE category_name = 'Religious Beliefs' LIMIT 1));
