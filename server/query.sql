create table users(
    user_id serial primary key,
    name varchar,
    email varchar unique,
    password varchar
)

create table notes(
    id varchar primary key,
    text varchar,
    time varchar,
    color varchar,
    user_id int
)

create table passwords (
    id varchar primary key,
    websitename varchar,
    websiteurl varchar,
    passkey varchar,
    username varchar,
    created_at date,
    updated_at date,
    userid int
)