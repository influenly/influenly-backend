CREATE USER postgres WITH PASSWORD 'postgres';
-- CREATE DATABASE IF NOT EXISTS content
SELECT 'CREATE DATABASE content'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'content')\gexec