+++
tags = ["db"]
date = "2021-01-02"
title = "ADB-PG"
+++
**阿里 AnalyticDB PostgreSQL版**
<!--more-->

## 实例选型

以存储预留模式的节点4core SSD存储为例，单节点存储320GB，假设用户数据为4TB，且一般预留30%水位 ，需要规划4TB / (1 - 30%) / 320 GB
## 逻辑架构

* ADB-PG 
  * Database 
    * Schema 
      * Table
## 表定义

* hash值分布 `DISTRIBUTED BY (p_id)`
`按照业务使用频率选择分布键`
```sql
create table demo (
	name varchar(40),
	age integer,
	p_id integer)
DISTRIBUTED BY (p_id);
```
* 随机均分布 `DISTRIBUTED RANDOMLY`
`尽量不使用`
* 全量复制 `DISTRIBUTED REPLICATED`
`数据量小的基表`
## 分布式JOIN

* Collocated Join: join本地完成
* Redistribution Join: 节点一对多，重分布
* Broadcast Join: 节点多对多，广播
## 分布键

表分布键选择原则：
1. 选择数据分布均匀的列
2. 选择经常需要JOIN的列
3. 尽量选择高频出现查询条件的列
4. 若未指定分布键，默认表的主键
5. 分布键可以定义一个或多个列
4. 避免选择随机分布，将使本地关联、节点裁剪不可能实现
```sql
-- 数据倾斜检查
select gp_segment_id, count(1) from t1 group by 1 order by 2 desc
```
## 表分区

- 范围（RANGE）分区：基于一个数值型范围划分数据
- 值（LIST）分区：基于一个值列表划分数据
- 多级分区表：上述组合，最多支持三级分区
## 数据存储

* 行存表 `create table foo (a int, b text) distributed by (a);`
* 列存表 `create table foo (a int, b text) with (appendonly = true, orientation = column) distributed by (a);` 
* 行列混合
## 执行计划

* explain: 基于统计信息，不真正执行语句
* explain analyze：真正执行语句，显示真实信息
## 统计信息

| 收集范围 | 语句示例 |
| --- | --- |
| 全库 | analyze; |
| 表 | analyze t1; |
| 列 | analyze t1(c1); |
收集建议：
1. 根据实际情况确认收集范围
2. 超过20%数据更新，需要进行统计信息收集
3. 用户ETL任务过程中，会涉及多次IUD，可根据情况添加
4. 调优过程中，估算值与实际值相差过大（计划中出现较多的Broadcast、Sort+GroupByAgg、NestLoop等算子）
