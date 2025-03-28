SELECT pid, pg_terminate_backend(pid) 
FROM pg_stat_activity
WHERE datname = 'cod_db' AND pid <> pg_backend_pid();
drop database if exists cod_db;
create database cod_db;