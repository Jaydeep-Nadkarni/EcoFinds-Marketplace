USE hackathon_ecommerce;

-- Users view
CREATE OR REPLACE VIEW users_v AS
SELECT 
  id AS user_id,
  username,
  email,
  password AS password_hash,
  role,
  created_at,
  avatar_url,
  is_active AS is_verified,
  updated_at AS last_login
FROM users;

-- Categories view
CREATE OR REPLACE VIEW categories_v AS
SELECT 
  id AS category_id,
  name,
  description,
  image_url AS icon_url
FROM categories;

-- Products view
CREATE OR REPLACE VIEW products_v AS
SELECT 
  id AS product_id,
  category_id,
  name AS title,
  description,
  price,
  brand,
  stock_quantity,
  is_featured,
  is_active AS status,
  created_at,
  updated_at
FROM products;

-- Reviews view
CREATE OR REPLACE VIEW reviews_v AS
SELECT 
  id AS review_id,
  product_id,
  user_id AS reviewer_id,
  rating,
  comment,
  created_at
FROM product_reviews;

-- Orders view
CREATE OR REPLACE VIEW orders_v AS
SELECT 
  id AS order_id,
  user_id AS buyer_id,
  total_amount,
  status,
  created_at,
  updated_at
FROM orders;

-- Wishlist view
CREATE OR REPLACE VIEW wishlist_v AS
SELECT 
  id AS wishlist_id,
  user_id,
  product_id,
  created_at AS added_at
FROM wishlist;

