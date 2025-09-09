-- Create database
CREATE DATABASE IF NOT EXISTS hackathon_ecommerce;
USE hackathon_ecommerce;

-- Create admin user (run this after the server starts and tables are created)
-- Password: Admin@123
INSERT INTO users (username, email, password, first_name, last_name, role) VALUES 
('admin', 'admin@hackathon.com', '$2a$12$8YGz9GHpOQz0U2LZxO5V8OQxJZYNs5.bZJmJXm6YHHzY8tAVvNM/2', 'Admin', 'User', 'admin')
ON DUPLICATE KEY UPDATE email = email;

-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES 
('Electronics', 'Electronic devices and accessories', '/images/categories/electronics.jpg'),
('Clothing', 'Fashion and apparel for all', '/images/categories/clothing.jpg'),
('Home & Garden', 'Home improvement and gardening supplies', '/images/categories/home-garden.jpg'),
('Sports', 'Sports and fitness equipment', '/images/categories/sports.jpg'),
('Books', 'Books and educational materials', '/images/categories/books.jpg'),
('Beauty', 'Beauty and personal care products', '/images/categories/beauty.jpg'),
('Toys', 'Toys and games for children', '/images/categories/toys.jpg'),
('Automotive', 'Car accessories and parts', '/images/categories/automotive.jpg')
ON DUPLICATE KEY UPDATE name = name;

-- Insert sample products
INSERT INTO products (name, description, price, discount_price, category_id, brand, stock_quantity, image_url, is_featured, tags, features) VALUES 
('Wireless Bluetooth Headphones', 'High-quality wireless headphones with noise cancellation', 2999.00, 2499.00, 1, 'TechSound', 50, '/images/products/headphones.jpg', true, '["wireless", "bluetooth", "headphones"]', '["Noise Cancellation", "30hr Battery", "Quick Charge"]'),
('Smartphone 5G', 'Latest 5G smartphone with advanced camera', 25999.00, 23999.00, 1, 'PhoneTech', 25, '/images/products/smartphone.jpg', true, '["smartphone", "5g", "camera"]', '["5G Ready", "48MP Camera", "128GB Storage"]'),
('Cotton T-Shirt', 'Comfortable cotton t-shirt for daily wear', 599.00, 499.00, 2, 'FashionWear', 100, '/images/products/tshirt.jpg', false, '["cotton", "tshirt", "casual"]', '["100% Cotton", "Machine Washable", "Multiple Colors"]'),
('Running Shoes', 'Professional running shoes for athletes', 3999.00, 3499.00, 4, 'SportRun', 30, '/images/products/shoes.jpg', true, '["shoes", "running", "sports"]', '["Lightweight", "Shock Absorption", "Breathable"]'),
('Coffee Maker', 'Automatic coffee maker for home use', 4999.00, NULL, 3, 'HomeBrews', 20, '/images/products/coffee-maker.jpg', false, '["coffee", "appliance", "home"]', '["Auto Timer", "12 Cup Capacity", "Keep Warm"]'),
('Programming Book', 'Complete guide to modern programming', 899.00, 799.00, 5, 'TechBooks', 40, '/images/products/programming-book.jpg', false, '["book", "programming", "education"]', '["600 Pages", "Latest Edition", "Practical Examples"]'),
('Face Cream', 'Anti-aging face cream with natural ingredients', 1299.00, 1099.00, 6, 'NaturalGlow', 60, '/images/products/face-cream.jpg', false, '["skincare", "cream", "beauty"]', '["Anti-Aging", "Natural Ingredients", "All Skin Types"]'),
('Remote Control Car', 'High-speed remote control racing car', 2499.00, 1999.00, 7, 'ToyRace', 15, '/images/products/rc-car.jpg', true, '["toy", "car", "remote"]', '["High Speed", "Rechargeable", "Durable Design"]')
ON DUPLICATE KEY UPDATE name = name;

-- Create indexes for better performance

-- Show tables
SHOW TABLES;
