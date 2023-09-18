CREATE USER postgres WITH PASSWORD 'postgres';
SELECT 'CREATE DATABASE influenly'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'influenly')\gexec