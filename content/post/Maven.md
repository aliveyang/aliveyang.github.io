+++
tags = ["maven"]
date = "2020-02-04"
title = "Maven"
+++
**Maven备忘**
<!--more-->
      
## scope 判断是否编译打包

```xml
<!-- compile (默认的scope) 适用于所有阶段，随项目一起发布 -->
<!-- provided  只能作用在编译和测试 (平时开发可用，打包时忽略) -->
<!-- runtime  不作用于编译时，适用运行和测试阶段 -->
<!-- test  只作用于测试 -->
<!-- system  跟provided 相似，但是在系统中要以外部JAR包的形式提供，maven不会在repository查找它 -->
<dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
      <scope>provided</scope>
 </dependency>
```
## 更改默认JDK

```xml
<!-- 指定项目编译时的java版本和编码方式 -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.10.1</version>
    <configuration>
        <source>1.8</source>
        <target>1.8</target>
        <encoding>UTF-8</encoding>
    </configuration>
</plugin>
```
## profile 多套编译环境

```xml
<!-- src/main/resources/dev 下配置 开发环境 application.yml bootstrap.properties -->
<!-- src/main/resources/pro 下配置 生产环境 application.yml bootstrap.properties -->
<!-- src/main/resources/test 下配置 测试环境 application.yml bootstrap.properties -->
<profiles>
	<!--开发环境-->
	<profile>
		<id>dev</id>
		<activation>
			<activeByDefault>false</activeByDefault>
			<property>
				<name>dev</name>
				<value>dev</value>
			</property>
		</activation>
		<build>
			<resources>
				<resource>
					<directory>src/main/resources/dev</directory>
				</resource>
			</resources>
		</build>
	</profile>

	<!--生产环境-->
	<profile>
		<id>pro</id>
		<activation>
			<activeByDefault>false</activeByDefault>
			<property>
				<name>pro</name>
				<value>pro</value>
			</property>
		</activation>
		<build>
			<resources>
				<resource>
					<directory>src/main/resources/pro</directory>
				</resource>
			</resources>
		</build>
	</profile>

	<!--测试环境-->
	<profile>
		<id>test</id>
		<activation>
			<activeByDefault>true</activeByDefault>
			<property>
				<name>test</name>
				<value>test</value>
			</property>
		</activation>
		<build>
			<resources>
				<resource>
					<directory>src/main/resources/test</directory>
				</resource>
			</resources>
		</build>
	</profile>
</profiles>
```
## 直接打包jar

1.  打包并将依赖放到jar包外
2.  打包并将依赖放入jar包内
```xml
<build>
	<finalName>${project.artifactId}</finalName>
	<plugins>
		<!-- 指定项目编译时的java版本和编码方式 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.10.1</version>
			<configuration>
				<source>1.8</source>
				<target>1.8</target>
				<encoding>UTF-8</encoding>
			</configuration>
		</plugin>

		<!-- ================================= maven package jar 将依赖放入外部文件夹 ================================= -->
		<!-- 指定项目Main与依赖 直接打包jar -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-jar-plugin</artifactId>
			<version>3.2.0</version>
			<configuration>
				<archive>
					<manifest>
						<addClasspath>true</addClasspath>  <!-- 在jar的MF文件中生成classpath属性 -->
						<classpathPrefix>lib/</classpathPrefix> <!-- classpath前缀,即依赖jar包的路径 -->
						<mainClass>com.yang.ExecuteMain</mainClass> <!-- 指定入口类 -->
					</manifest>
				</archive>
			</configuration>
		</plugin>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-dependency-plugin</artifactId>
			<version>3.2.0</version>
			<executions>
				<execution>
					<id>copy-dependencies</id>
					<phase>package</phase>
					<goals>
						<goal>copy-dependencies</goal>
					</goals>
					<configuration>
						<!-- 指定依赖包的输出路径，需与上方的classpathPrefix保持一致 -->
						<outputDirectory>${project.build.directory}/lib</outputDirectory>
					</configuration>
				</execution>
			</executions>
		</plugin>

		<!-- ================================= maven package jar 将依赖打入jar ================================= -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-assembly-plugin</artifactId>
			<version>3.1.0</version>
			<configuration>
				<archive>
					<manifest>
						<mainClass>com.yang.ExecuteMain</mainClass> <!-- 指定入口类路径 -->
					</manifest>
				</archive>
				<descriptorRefs>
					<descriptorRef>jar-with-dependencies</descriptorRef> <!-- jar包后缀，生成的jar包形式为：project-1.0-SNAPSHOT-jar-with-dependencies.jar -->
				</descriptorRefs>
			</configuration>
			<!-- 添加此项后，可直接使用mvn package | mvn install -->
			<!-- 不添加此项，需直接使用mvn package assembly:single -->
			<executions>
				<execution>
					<id>make-assembly</id>
					<phase>package</phase>
					<goals>
						<goal>single</goal>
					</goals>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
```