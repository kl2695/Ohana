# database schema

## users 



| column name  | data type | details |
| ------------- | ------------- | ------------|
| id | integer  | not null, primary key |
| username  | string  | not null, indexed |
| email | string  | not null, indexed, unique |
| img_url  | string  |  | 
| first_name  | string  | not null|
| last_name  | string  | not null|
| password_digest  | string  | not null |
| session_token  | string | not null, indexed, unique |
| created_at | datetime  | not null |
| updated_at | datetime  | not null |


## groups

| column name  | data type | details |
| ------------- | ------------- | ------------|
| id | integer  | not null, primary key |
| name  | integer  | not null |
| picture | string  |  |
| created_at | datetime  | not null |
| updated_at | datetime  | not null |

## user_groups

| column name  | data type | details |
| ------------- | ------------- | ------------|
| id | integer  | not null, primary key |
| user_id  | integer  | not null |
| group_id | integer  | not null, indexed |
| created_at | datetime  | not null |
| updated_at | datetime  | not null |





## moments 

| column name  | data type | details |
| ------------- | ------------- | ------------|
| id | integer  | not null, primary key |
| user_id  | integer  | not null, indexed |
| group_id  | integer  |  |
| body | string  | not null |
| picture  | string  | content |
| created_at | datetime  | not null |
| updated_at | datetime  | not null |



## messages 

| column name  | data type | details |
| ------------- | ------------- | ------------|
| id | integer  | not null, primary key |
| user_id  | integer  | not null |
| group_id  | integer  | not null |
| body | string  | not null |
| created_at | datetime  | not null |
| updated_at | datetime  | not null |

