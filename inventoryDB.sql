create database inventoryDB;
use inventoryDB;
create table products(name varchar(50), description varchar(100), price float, quantity int, category varchar(50));
insert into products values('Table', 'Wooden Table', 1500, 20, 'Furniture');
insert into products values('Chair', 'Plastic Chair(red color)', 500, 50, 'Furniture');
insert into products values('BRU Gold', 'Coffee', 250, 5, 'Grocery');
insert into products values('Blue Pen', 'Blue Dot Pen', 10, 500, 'Stationary');
insert into products values(' Black Pen', 'Black Dot Pen', 10, 250, 'Stationary');
SELECT * FROM inventorydb.products;
select * from products;
select * from products where price<300;
select * from products where quantity>40;
update products set price=2500 WHERE name='Table';
delete from products where name='BRU Gold';