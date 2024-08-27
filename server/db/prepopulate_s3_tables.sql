-- Prepopulate categories Table
INSERT INTO categories (category_name) VALUES
('Age'),
('Sex'),
('Sexuality'),
('Political Views'),
('Economic Status'),
('Gender Expression'),
('Ethnicity'),
('Immigration Status'),
('Racial Identity'),
('Religious Beliefs'),
('Other');

-- Prepopulate subcategories Table

-- Age Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Age'), 'Under 18'),
((SELECT category_id FROM categories WHERE category_name = 'Age'), '18-24'),
((SELECT category_id FROM categories WHERE category_name = 'Age'), '25-34'),
((SELECT category_id FROM categories WHERE category_name = 'Age'), '35-44'),
((SELECT category_id FROM categories WHERE category_name = 'Age'), '45-54'),
((SELECT category_id FROM categories WHERE category_name = 'Age'), '55-64'),
((SELECT category_id FROM categories WHERE category_name = 'Age'), '65 and older');

-- Sex Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Sex'), 'Male'),
((SELECT category_id FROM categories WHERE category_name = 'Sex'), 'Female'),
((SELECT category_id FROM categories WHERE category_name = 'Sex'), 'Intersex'),
((SELECT category_id FROM categories WHERE category_name = 'Sex'), 'Transexual'),
((SELECT category_id FROM categories WHERE category_name = 'Sex'), 'Other - Sex');

-- Sexuality Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Asexual'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Gay'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Lesbian'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Heterosexual'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Bi-sexual'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Queer'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Pansexual'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Demisexual'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Questioning'),
((SELECT category_id FROM categories WHERE category_name = 'Sexuality'), 'Other - Sexuality');

-- Political Views Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Liberal'),
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Conservative'),
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Socialist'),
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Moderate'),
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Libertarian'),
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Green'),
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Communist'),
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Anarchist'),
((SELECT category_id FROM categories WHERE category_name = 'Political Views'), 'Other - Political Views');

-- Economic Status Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Economic Status'), 'Low Income'),
((SELECT category_id FROM categories WHERE category_name = 'Economic Status'), 'Middle class'),
((SELECT category_id FROM categories WHERE category_name = 'Economic Status'), 'High Income'),
((SELECT category_id FROM categories WHERE category_name = 'Economic Status'), 'Working class'),
((SELECT category_id FROM categories WHERE category_name = 'Economic Status'), 'Upper class'),
((SELECT category_id FROM categories WHERE category_name = 'Economic Status'), 'Unemployed'),
((SELECT category_id FROM categories WHERE category_name = 'Economic Status'), 'Retired'),
((SELECT category_id FROM categories WHERE category_name = 'Economic Status'), 'Other - Economic Status');

-- Gender Identity Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Non-binary'),
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Genderqueer'),
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Genderfluid'),
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Transgender'),
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Cisgender'),
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Agender'),
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Bigender'),
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Two-Spirit'),
((SELECT category_id FROM categories WHERE category_name = 'Gender Expression'), 'Other - Gender Expression');

-- Ethnicity Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Southeast Asian'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Eastern European'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Indigenous'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Mediterranean'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Ashkenazi Jewish'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'West African'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'East Asian'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Mestizo'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Arab'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Latin American'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Caribbean'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'South Asian'),
((SELECT category_id FROM categories WHERE category_name = 'Ethnicity'), 'Other - Ethnicity');

-- Immigration Status Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Immigration Status'), 'Citizen'),
((SELECT category_id FROM categories WHERE category_name = 'Immigration Status'), 'Permanent resident'),
((SELECT category_id FROM categories WHERE category_name = 'Immigration Status'), 'Temporary worker'),
((SELECT category_id FROM categories WHERE category_name = 'Immigration Status'), 'Student visa holder'),
((SELECT category_id FROM categories WHERE category_name = 'Immigration Status'), 'Refugee or asylee'),
((SELECT category_id FROM categories WHERE category_name = 'Immigration Status'), 'Other - Immigration Status');

-- Race Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'Black or African American'),
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'White or European American'),
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'Multiracial'),
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'Native Hawaiian or Other Pacific Islander'),
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'Native American or Alaska Native'),
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'Middle Eastern or North African'),
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'Hispanic or Latino'),
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'Asian'),
((SELECT category_id FROM categories WHERE category_name = 'Racial Identity'), 'Other - Racial Identity');

-- Religious Beliefs Subcategories
INSERT INTO subcategories (category_id, subcategory_name) VALUES
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Jewish'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Muslim'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Sikh'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Atheist'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Spiritual but not religious'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Buddhist'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Hindu'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Christian'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Agnostic'),
((SELECT category_id FROM categories WHERE category_name = 'Religious Beliefs'), 'Other - Religious Beliefs');
