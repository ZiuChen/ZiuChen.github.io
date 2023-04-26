# MySQL

## MySQL基础篇

### MySQL简单使用

在命令行窗口输入

```sh
mysql -uroot -p1234 -hlocalhost -P3306
```

指定用户名为 `root` 密码为 `1234` 连接host为 `localhost` 端口号为 `3306`

除了以明文方式输入密码，也可以通过另一种方式登录：

```sh
mysql -u root -p
1234
```

进入mysql命令行工具后，查看所有表：

```sql
show databases;
```

MySQL默认为我们创建了四个表` information_schema` `mysql` `performance_schema` `sys`

创建一个新的数据库：

```sql
create database dbtest1;
```

使用数据库：

```sql
use dbtest1;
```

创建一张表，初始化`id`与`name`字段：

```sql
create table employees(id int, name varchar(15));
```

查看表中数据：

```sql
select * from emoloyees;
```

插入一条数据：

```sql
insert into employees values(1001, 'Tom');
insert into employees values(1002, 'Jack');
```

当我们向表中插入中文数据时，`5.7`版本的MySQL会报错，而`8.0`版本则不会：

```sql
insert into employees values(1003, '杰瑞');
```

检查一下表的信息：

```sql
show create table employees;
```

可以发现，表的默认字符集是 `CHARSET=latin1` 拉丁字符集，不包含汉字。

查看编码与比较规则：

百分号`%`表示一个到多个字符

```sql
show variables like 'character_%';
show variables like 'collation_%';
```

若是`5.7`版本，默认的编码字符集为`latin1`，而最新的`8.0`为`utf8`。配置文件可以在`my.ini`中修改

删除一个数据库

```sql
drop database dbtest1;
```

### 基本的SELECT语句

#### SQL分类

* DDL `DataDefinitionLanguage` 用于定义数据库对象（数据库 表 字段）
  * 主要语句关键字包括`CREATE` `DROP` `ALERT`等
* DML `DataManipulationLanguage` 用于对数据库表中的数据进行增删改查
  * 主要语句关键字包括`INSERT` `DELETE` `UPDATE` `SELECT`等
  * `SELECT`是SQL语言的基础，最为重要
* DQL `DataQueryLanguage` 用来查询数据库中表的记录
  * 由于查询语句使用的非常频繁，将查询语句单拎出来自成一类
* DCL `DataControlLanguage` 用来创建数据库用户、控制数据库的访问权限
  * 主要的语句关键字包括`GRANT` `REVOKE` `COMMIT` `ROLLBACK` `SAVEPOINT`等

### SQL规则和规范

- SQL语句可以单行或多行书写，为了提高可读性，各子句分行写，必要时使用缩进，**以分号结尾**
- 每条命令以 `;` 或 `\g` 或 `\G` 结束
- 关键字不能被缩写也不能分行
- 关于标点符号
  - 必须保证所有的()、单引号、双引号是成对结束的
  - 必须使用英文状态下的半角输入方式
  - 字符串型和日期时间类型的数据可以使用单引号（' '）表示
  - 列的别名，尽量使用双引号（" "），而且不建议省略as

#### SQL大小写规则

- MySQL 在 Windows 环境下是大小写不敏感的
- MySQL 在 Linux 环境下是大小写敏感的
  - 数据库名、表名、表的别名、变量名是严格区分大小写的
  - 关键字、函数名、列名(或字段名)、列的别名(字段的别名) 是忽略大小写的。
- 推荐采用统一的书写规范：
  - 数据库名、表名、表别名、字段名、字段别名等都小写
  - SQL 关键字、函数名、绑定变量等都大写

#### 注释书写方法

- 单行注释：`--注释内容` 或 `# 注释内容` （MySQL独有）
- 多行注释: /* 注释内容 */

#### DDL - 数据库操作

* 查询
  * 查询所有数据库 `SHOW DATABASES;`
  * 查询当前数据库 `SELECT DATABASE();`
* 创建
  * `CREATE DATABASE [IF NOT EXISTS] 数据库名  [DEFAULT CHARSET 字符集] [COLLATE 排序规则];`
* 删除
  * `DROP DATABSE [IF EXISTS] 数据库名`
* 使用
  * `USE 数据库名`

```shell
mysql -u root -p # 进入mysql
```

```sql
SHOW DATABASES; # 展示所有数据库
CREATE DATABASE custom; # 创建一个名为custom的数据库
USE custom; # 使用custom数据库
SELECT DATABASE(); # 当前使用的是custom数据库
```

#### DDL - 表操作

##### 创建表

**在命令行下，可以在多行内编写一个SQL语句**

```sql
SHOW TABLES; # 查询当前数据库所有表
DESC 表名; # 查询	表结构
SHOW CREATE TABLE 表名; # 查询指定表的建表语句
```

```sql
# 创建表
CREATE TABLE custom(
  param1 type1 [comment ''],
  param2 type2 [comment ''],
  param3 type3 [comment ''],
  param4 type4 [comment '']
)[comment '']
```

```sql
# 创建一个tb_user表
create table tb_user(
    id int comment '编号',
    name varchar(50) comment '姓名',
    age int comment '年龄',
    gender varchar(1) comment '性别'
    ) comment '用户表';
# 展示数据库中所有表
show tables;
# 查询表内所有字段
desc tb_user;
# 展示表的所有信息（包含字段注释、存储引擎、默认字符集、排序规则等信息）
show create table tb_user;
```

案例 - 员工信息表

```sql
create table emp (
  id int comment '编号',
  workno varchar(10) comment '工号',
  name varchar(10) comment '姓名',
  gender char(1) comment '性别',
  age tinyint unsigned comment '年龄',
  idcard char(18) comment '身份证号',
  entrydate date comment '入职时间'
) comment '员工表';
```

创建成功后，输入`desc emp`查看

```shell
mysql> desc emp;
+-----------+------------------+------+-----+---------+-------+
| Field     | Type             | Null | Key | Default | Extra |
+-----------+------------------+------+-----+---------+-------+
| id        | int              | YES  |     | NULL    |       |
| workno    | varchar(10)      | YES  |     | NULL    |       |
| name      | varchar(10)      | YES  |     | NULL    |       |
| gender    | char(1)          | YES  |     | NULL    |       |
| age       | tinyint unsigned | YES  |     | NULL    |       |
| idcard    | char(18)         | YES  |     | NULL    |       |
| entrydate | date             | YES  |     | NULL    |       |
+-----------+------------------+------+-----+---------+-------+
7 rows in set (0.00 sec)
```

##### 修改表

```sql
# 添加一个字段
alter table 表名 add 字段名 类型(长度) [comment '']
# 修改一个字段
alter table 表名 modify 旧字段名 新字段名 类型(长度) [comment '']
# 删除一个字段
alter table 表名 drop 字段名
# 修改表名
alter table 表名 rename to 新表名
```

```sql
alter table emp add nickname varchar(20) comment '昵称'
alter table emp modify nickname username varchar(30)
alter table emp drop username
alter table emp rename to employee
```

### MySQL数据类型

#### 数值类型

在定义字段时，通过关键字`UNSIGNED`确定其`无符号 / 有符号`

| 类型         | 大小                                     | 范围（有符号）                                               | 范围（无符号）                                               | 用途            |
| :----------- | :--------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :-------------- |
| TINYINT      | 1 Bytes                                  | (-128，127)                                                  | (0，255)                                                     | 小整数值        |
| SMALLINT     | 2 Bytes                                  | (-32 768，32 767)                                            | (0，65 535)                                                  | 大整数值        |
| MEDIUMINT    | 3 Bytes                                  | (-8 388 608，8 388 607)                                      | (0，16 777 215)                                              | 大整数值        |
| INT或INTEGER | 4 Bytes                                  | (-2 147 483 648，2 147 483 647)                              | (0，4 294 967 295)                                           | 大整数值        |
| BIGINT       | 8 Bytes                                  | (-9,223,372,036,854,775,808，9 223 372 036 854 775 807)      | (0，18 446 744 073 709 551 615)                              | 极大整数值      |
| FLOAT        | 4 Bytes                                  | (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38) | 0，(1.175 494 351 E-38，3.402 823 466 E+38)                  | 单精度 浮点数值 |
| DOUBLE       | 8 Bytes                                  | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 双精度 浮点数值 |
| DECIMAL      | 对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 | 依赖于M和D的值                                               | 依赖于M和D的值                                               | 小数值          |

#### 字符串类型

| 类型       | 大小                  | 用途                            |
| :--------- | :-------------------- | :------------------------------ |
| CHAR       | 0-255 bytes           | 定长字符串                      |
| VARCHAR    | 0-65535 bytes         | 变长字符串                      |
| TINYBLOB   | 0-255 bytes           | 不超过 255 个字符的二进制字符串 |
| TINYTEXT   | 0-255 bytes           | 短文本字符串                    |
| BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据          |
| TEXT       | 0-65 535 bytes        | 长文本数据                      |
| MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据    |
| MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据                |
| LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据        |
| LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                    |

**注意**：char(n) 和 varchar(n) 中括号中 n 代表字符的个数，并不代表字节个数，比如 CHAR(30) 就可以存储 30 个字符。

CHAR 和 VARCHAR 类型类似，但它们保存和检索的方式不同。它们的最大长度和是否尾部空格被保留等方面也不同。在存储或检索过程中不进行大小写转换。**CHAR性能更优**

BINARY 和 VARBINARY 类似于 CHAR 和 VARCHAR，不同的是它们包含二进制字符串而不要非二进制字符串。也就是说，它们包含字节字符串而不是字符字符串。这说明它们没有字符集，并且排序和比较基于列值字节的数值值。

BLOB 是一个二进制大对象，可以容纳可变数量的数据。有 4 种 BLOB 类型：TINYBLOB、BLOB、MEDIUMBLOB 和 LONGBLOB。它们区别在于可容纳存储范围不同。

有 4 种 TEXT 类型：TINYTEXT、TEXT、MEDIUMTEXT 和 LONGTEXT。对应的这 4 种 BLOB 类型，可存储的最大长度不同，可根据实际情况选择。

#### 日期时间类型

| 类型      | 大小 ( bytes) | 范围                                                         | 格式                | 用途                     |
| :-------- | :------------ | :----------------------------------------------------------- | :------------------ | :----------------------- |
| DATE      | 3             | 1000-01-01/9999-12-31                                        | YYYY-MM-DD          | 日期值                   |
| TIME      | 3             | '-838:59:59'/'838:59:59'                                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1             | 1901/2155                                                    | YYYY                | 年份值                   |
| DATETIME  | 8             | 1000-01-01 00:00:00/9999-12-31 23:59:59                      | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| TIMESTAMP | 4             | 1970-01-01 00:00:00/2038结束时间是第 **2147483647** 秒，北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYYMMDD HHMMSS     | 混合日期和时间值，时间戳 |

