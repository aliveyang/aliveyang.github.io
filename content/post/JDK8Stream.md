+++
tags = ["java"]
date = "2020-02-04"
title = "JDK8 Stream"
+++
**JDK8 Stream**
<!--more-->
      
## 概括
一个stream周期总共包含三个操作：`获取流`、`数据操作`、`结果生产`
## 获取流
```java
// list
Arrays.asList("1", "2", "3").stream();
// array
Arrays.stream(new String[]{"1", "2", "3"})
// 自定义
Stream.generate(Math::random)
// 递归
Stream.iterate(2, i -> i * 2); //生成2的N次方数据
```
## 数据操作
### peek() 元素调整
对元素内部数据进行调整
```java


```
### map() 映射转换
将元素本身进行加工或类型转换
```java

```
### flatMap() 展平结果
将多级结构转换为平铺结构
```java
/**
 * flatMap()用于展平结果，将多级结构转换为平铺结构
 */
@Test
public void whenFlatMapEmployeeNames_thenGetNameStream() {
    List<List<String>> namesNested = Arrays.asList(
            Arrays.asList("Jeff", "Bezos"),
            Arrays.asList("Bill", "Gates"),
            Arrays.asList("Mark", "Zuckerberg"));
    List<String> namesFlatStream = namesNested.stream()
            .flatMap(Collection::stream)
            .collect(Collectors.toList());

    System.out.println(namesFlatStream); // [Jeff, Bezos, Bill, Gates, Mark, Zuckerberg]
}
```
### filter 过滤
```java

```
### skip() 跳过

### limit() 获取
```java
/**
 * 偏移量运算，skip跳过三个，limit向后获取5个
 */
@Test
public void whenLimitInfiniteStream_thenGetFiniteElements() {
    //iterate迭代器方法用于生成流的规则，生成以为2的N次方数据
    Stream<Integer> infiniteStream = Stream.iterate(2, i -> i * 2);
    System.out.println(infiniteStream);
    List<Integer> collect = infiniteStream
            .skip(3)//跳过2^1,2^2,2^3
            .limit(5)//保留2^4、2^5、2^6、2^7、2^8
            .collect(Collectors.toList());//转换为数字
    System.out.println(collect); // [16, 32, 64, 128, 256]
}
```
### sorted() 排序
```java

```
### distinct() 去重
```java

```
### match() 匹配判定
#### allMatch() 全部符合
#### anyMatch() 存在符合
#### noneMatch() 全部不符合
规则匹配返回Boolean
```java
/**
 * allMatch()判断给定的流数据是否全部符合判断要求，全部满足返回true
 * anyMatch()判断给定的流数据是否存在符合要求的数据，只要有一个满足则返回true
 * noneMatch()与anyMatch()相反，只要有一个满足要求则返回false
 */
@Test
public void whenApplyMatch_thenReturnBoolean() {
    List<Integer> intList = Arrays.asList(2, 4, 5, 6, 8);
    boolean allEven = intList.stream().allMatch(i -> i % 2 == 0);
    boolean oneEven = intList.stream().anyMatch(i -> i % 2 == 0);
    boolean noneMultipleOfThree = intList.stream().noneMatch(i -> i % 3 == 0);
    assertEquals(allEven, false);
    assertEquals(oneEven, true);
    assertEquals(noneMultipleOfThree, false);
}
```
### parallel() 并行处理
```java
/**
 * parallel()并行处理
 */
@Test

public void whenParallelStream_thenPerformOperationsInParallel() {
    Employee[] arrayOfEmps = {
            new Employee(1, "Jeff Bezos", 100000.0),
            new Employee(2, "Bill Gates", 200000.0),
            new Employee(3, "Mark Zuckerberg", 300000.0)
    };
    List<Employee> empList = Arrays.asList(arrayOfEmps);
    empList.stream().parallel().forEach(e -> e.salaryIncrement(10.0));
    assertThat(empList, contains(
            hasProperty("salary", equalTo(110000.0)),
            hasProperty("salary", equalTo(220000.0)),
            hasProperty("salary", equalTo(330000.0))
    ));
}
```
## 结束操作
### forEach()
替代for循环
```java

```
### findFirst() 获取首个
```java
/**
 * findFirst()获取第一个符合规则的流数据
 * 如果一个都没有则走orElse()返回Null
 */
@Test
public void whenFindFirst_thenGetFirstEmployeeInStream() {
    Integer[] empIds = {1, 2, 3, 4};
    Employee employee = Stream.of(empIds)
            .map(employeeRepository::findById)
            .filter(e -> e != null)

            .filter(e -> e.getSalary() > 100000)
            .findFirst()
            .orElse(null);
    System.out.println(employee);
}
```
### collect() 集合类型转换
#### Collectors.toSet() 
#### Collectors.joining()
流数据转为一条字符串
```java
/**
 * collect(Collectors.joining(", ")) 将流数据转为一个长字符串
 */
@Test
public void whenCollectByJoining_thenGetJoinedString() {
    String empNames = empList.stream()
            .map(Employee::getName)
            .collect(Collectors.joining(", "))
            .toString();
    assertEquals(empNames, "Jeff Bezos, Bill Gates, Mark Zuckerberg");
}
```
#### Collectors.summarizing... 聚合运算
```java
/**
 * 流数据为对象时，聚合运算.
 */
@Test
public void whenApplySummarizing_thenGetBasicStats() {
    DoubleSummaryStatistics stats = empList.stream()
            .collect(Collectors.summarizingDouble(Employee::getSalary));
    assertEquals(stats.getCount(), 3); //数量
    assertEquals(stats.getSum(), 600000.0, 0);//求和
    assertEquals(stats.getMin(), 100000.0, 0);//最小值
    assertEquals(stats.getMax(), 300000.0, 0);//最大值
    assertEquals(stats.getAverage(), 200000.0, 0);//平均值
}
/**
 * 流数据为数值时，直接聚合运算
 */
@Test
public void whenApplySummaryStatistics_thenGetBasicStats() {
    DoubleSummaryStatistics stats = empList.stream()
            .mapToDouble(Employee::getSalary)
            .summaryStatistics();
    assertEquals(stats.getCount(), 3);
    assertEquals(stats.getSum(), 600000.0, 0);
    assertEquals(stats.getMin(), 100000.0, 0);
    assertEquals(stats.getMax(), 300000.0, 0);
    assertEquals(stats.getAverage(), 200000.0, 0);
}
```
#### Collectors.partitioningBy() 分区运算
```java
/**
 * partitioningBy()分区运算，类似于SQL中的Group By ，并将其放入各自的Map's value中
 */
@Test
public void whenStreamPartition_thenGetMap() {
    List<Integer> intList = Arrays.asList(2, 4, 5, 6, 8);
    Map<Boolean, List<Integer>> isEven = intList.stream().collect(
            Collectors.partitioningBy(i -> i % 2 == 0));
    assertEquals(isEven.get(true).size(), 4);//偶数组
    assertEquals(isEven.get(false).size(), 1);//奇数组
}
/**
 * 按自定义条件进行分区(Group By)
 */
@Test
public void whenStreamGroupingBy_thenGetMap() {
    //按首字母进行分区
    Map<Character, List<Employee>> groupByAlphabet = empList.stream().collect(
            Collectors.groupingBy(e -> new Character(e.getName().charAt(0))));
    assertEquals(groupByAlphabet.get('B').get(0).getName(), "Bill Gates");
    assertEquals(groupByAlphabet.get('J').get(0).getName(), "Jeff Bezos");
    assertEquals(groupByAlphabet.get('M').get(0).getName(), "Mark Zuckerberg");
}
/**
 * groupingBy高级玩法，先按首字母分区，然后将分区内数据转换为ID'List
 */
@Test
public void whenStreamMapping_thenGetMap() {
    Map<Character, List<Integer>> idGroupedByAlphabet = empList.stream().collect(
            Collectors.groupingBy(e -> new Character(e.getName().charAt(0)),
                    Collectors.mapping(Employee::getId, Collectors.toList())));
    assertEquals(idGroupedByAlphabet.get('B').get(0), new Integer(2));
    assertEquals(idGroupedByAlphabet.get('J').get(0), new Integer(1));
    assertEquals(idGroupedByAlphabet.get('M').get(0), new Integer(3));
}
@Test
public void whenStreamReducing_thenGetValue() {
    Double percentage = 10.0;
    Double salIncrOverhead = empList.stream().collect(Collectors.reducing(
            0.0, e -> e.getSalary() * percentage / 100, (s1, s2) -> s1 + s2));
    assertEquals(salIncrOverhead, 60000.0, 0);
}
@Test
public void whenStreamGroupingAndReducing_thenGetMap() {
    Comparator<Employee> byNameLength = Comparator.comparing(Employee::getName);
    Map<Character, Optional<Employee>> longestNameByAlphabet = empList.stream().collect(
            Collectors.groupingBy(e -> new Character(e.getName().charAt(0)),
                    Collectors.reducing(BinaryOperator.maxBy(byNameLength))));
    assertEquals(longestNameByAlphabet.get('B').get().getName(), "Bill Gates");
    assertEquals(longestNameByAlphabet.get('J').get().getName(), "Jeff Bezos");
    assertEquals(longestNameByAlphabet.get('M').get().getName(), "Mark Zuckerberg");
}
```

### toArray() 转换为数组
```java

```
### count() 统计总量
```java

```
### max() 最大值
```java

```
### min() 最小值
```java

```
### average() 平均数
```java

```
### reduce() 自定义聚集结果
```java
@Test
public void whenApplyReduceOnStream_thenGetValue() {
    Double sumSal = empList.stream()
        .map(Employee::getSalary)
        .reduce(0.0, Double::sum); //起始值为0，每次对所有流元素进行累加
    assertEquals(sumSal, new Double(600000));
}
```

### orElse() 其他情况
```java
@Test
public void whenFindFirst_thenGetFirstEmployeeInStream() {
    Integer[] empIds = {1, 2, 3, 4};
    Employee employee = Stream.of(empIds)
            .map(employeeRepository::findById)
            .filter(e -> e != null)
            .filter(e -> e.getSalary() > 100000)
            .findFirst()
            .orElse(null);
    System.out.println(employee);
}

```
### orElseThrow()
```java
@Test
public void whenApplySumOnIntStream_thenGetSum() {
    Double avgSal = empList.stream()
            .mapToDouble(Employee::getSalary)//只获取工资数据
            .average()
            .orElseThrow(NoSuchElementException::new);
    System.out.println(avgSal);
}
```

## API备忘
```java
/**
 * 静态方法引用：ClassName::methodName
 * 实例上的实例方法引用：instanceReference::methodName
 * 超类上的实例方法引用：super::methodName
 * 类型上的实例方法引用：ClassName::methodName
 * 构造方法引用：Class::new
 * 数组构造方法引用：TypeName[]::new
 */
```
