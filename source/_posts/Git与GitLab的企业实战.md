---
title: Git与GitLab的企业实战
date: 2021-03-08 21:35:56
tags:
- Git
- GitLab
- 工程化
categories: 前端开发
---
#Git与GitLab的企业实战

# 第1章 Git概述

Git是一个免费的、开源的分布式版本控制系统，可以快速高效地处理从小型到大型的各种项目。

Git易于学习，占地面积小，性能极快。 它具有廉价的本地库，方便的暂存区域和多个工作流分支等特性。其性能优于Subversion(svn)、CVS、Perforce和ClearCase等版本控制工具。

## 1. 何为版本控制

版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。

版本控制其实最重要的是可以记录文件修改历史记录，从而让用户能够查看历史版本，方便版本切换。

![img](wps1.jpg) 



## 2. 为什么需要版本控制

个人开发过渡到团队协作。

![img](wps2.jpg) 

## 3. 版本控制工具

* **集中式版本控制工具**

CVS、SVN(Subversion)、VSS……

集中化的版本控制系统诸如 CVS、SVN等，都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。多年以来，这已成为版本控制系统的标准做法。

这种做法带来了许多好处，每个人都可以在一定程度上看到项目中的其他人正在做些什么。而管理员也可以轻松掌控每个开发者的权限，并且管理一个集中化的版本控制系统，要远比在各个客户端上维护本地数据库来得轻松容易。

事分两面，有好有坏。这么做显而易见的缺点是中央服务器的单点故障。如果服务器宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作。

![img](wps3.jpg) 

* **分布式版本控制工具**

Git、Mercurial、Bazaar、Darcs……

像 Git这种分布式版本控制工具，客户端提取的不是最新版本的文件快照，而是把代码仓库完整地镜像下来（本地库）。这样任何一处协同工作用的文件发生故障，事后都可以用其他客户端的本地仓库进行恢复。因为每个客户端的每一次文件提取操作，实际上都是一次对整个文件仓库的完整备份。

分布式的版本控制系统出现之后,解决了集中式版本控制系统的缺陷:

1. 服务器断网的情况下也可以进行开发（因为版本控制是在本地进行的）

2. 每个客户端保存的也都是整个完整的项目（包含历史记录，更加安全）

![img](wps4.png) 



## 4. Git简史

![img](wps5.jpg) 



## 5 Git工作机制

![img](wps6.jpg) 



## 6 Git和代码托管中心

代码托管中心是基于网络服务器的远程代码仓库，一般我们简单称为远程库。

* **局域网**

GitLab

* **互联网**

GitHub（外网）

Gitee码云（国内网站）

 

#第2章 Git安装

​		官网地址： https://git-scm.com/或https://github.com/git-for-windows/git/releases 

​		查看GNU协议，可以直接点击下一步。

![img](wps7.jpg) 

选择Git安装位置，要求是非中文并且没有空格的目录，然后下一步。

![img](wps8.jpg) 

Git选项配置，推荐默认设置，然后下一步。

![img](wps9.jpg) 

Git安装目录名，不用修改，直接点击下一步。

![img](wps10.jpg) 

Git的默认编辑器，建议使用默认的Vim编辑器，然后点击下一步。

![img](wps11.jpg) 

默认分支名设置，选择让Git决定，分支名默认为master，下一步。 

![img](wps12.jpg) 

修改Git的环境变量，选第一个，不修改环境变量，只在Git Bash里使用Git。 

![img](wps13.jpg) 

选择后台客户端连接协议，选默认值OpenSSL，然后下一步。 

![img](wps14.jpg) 

配置Git文件的行末换行符，Windows使用CRLF，Linux使用LF，选择第一个自动转换，然后继续下一步。 

![img](wps15.jpg) 

选择Git终端类型，选择默认的Git Bash终端，然后继续下一步。

![img](wps16.jpg) 

选择Git pull合并的模式，选择默认，然后下一步。

![img](wps17.jpg) 

选择Git的凭据管理器，选择默认的跨平台的凭据管理器，然后下一步。

![img](wps18.jpg) 

其他配置，选择默认设置，然后下一步。

![img](wps19.jpg) 

实验室功能，技术还不成熟，有已知的bug，不要勾选，然后点击右下角的Install按钮，开始安装Git。

![img](wps20.jpg) 

点击Finsh按钮，Git安装成功！

![img](wps21.jpg) 

右键任意位置，在右键菜单里选择Git Bash Here即可打开Git Bash命令行终端。

![img](wps22.jpg) 

在Git Bash终端里输入git --version查看git版本，如图所示，说明Git安装成功。

![image-20230627170844640](image-20230627170844640.png) 

 

# 第3章 Git常用命令

| **命令名称**                         | **作用**       |
| ------------------------------------ | -------------- |
| git config --global user.name 用户名 | 设置用户签名   |
| git config --global user.email 邮箱  | 设置用户邮箱   |
| git init                             | 初始化本地库   |
| git status                           | 查看本地库状态 |
| git add 文件名                       | 添加到暂存区   |
| git commit -m "日志信息" 文件名      | 提交到本地库   |
| git reflog                           | 查看历史记录   |
| git reset --hard 版本号              | 版本穿梭       |

## 1 设置用户签名

### 1.1 基本语法

git config --global user.name 用户名

git config --global user.email 邮箱

### 1.2 案例实操

全局范围的签名设置：

```shell
git config --global user.name yhm
git config --global user.email yaohm7788@163.com
git config --list # 查看全局配置
cat ~/.gitconfig  # cat linux中查看文本的命令  ~ 家 [你当前用户的家]/ .gitconfig
```

说明：

签名的作用是区分不同操作者身份。用户的签名信息在每一个版本的提交信息中能够看到，以此确认本次提交是谁做的。Git首次安装必须设置一下用户签名，否则无法提交代码。

※注意：这里设置用户签名和将来登录GitHub（或其他代码托管中心）的账号没有任何关系。



## **2** **初始化本地库** 

### 2.1 基本语法

**git init**

### 2.2 案例实操

![image-20230627131721466](image-20230627131721466.png)

结果查看

![image-20230627131804454](image-20230627131804454.png) 

 

## **3** **查看本地库状态**

### 3.1 基本语法

**git status**



### 3.2 案例实操

#### （1）首次查看（工作区没有文件）

![image-20230627132109306](image-20230627132109306.png)

#### （2）新增文件

![image-20230627132215734](image-20230627132215734.png)

![image-20230627132317963](image-20230627132317963.png)

####  （3）再次查看（检测到未追踪文件）

![image-20230627132547573](image-20230627132547573.png)



## 4 添加暂存区

### 4.1 将工作区的文件添加到暂存区

#### （1）基本语法

**git** **add** **文件名**

#### （2）案例实操

![image-20230627132954523](image-20230627132954523.png)



### 4.2 查看状态（检测到暂存区有新文件）

![image-20230627133040699](image-20230627133040699.png)



## 5 提交本地库

### 5.1 暂存区文件提交到本地库

#### （1）基本语法

**git commit -m "日志信息" 文件名**

#### （2）案例实操

![image-20230627133335748](image-20230627133335748.png)

### 5.2 查看状态（没有文件需要提交）

![image-20230627133425162](image-20230627133425162.png)



## 6 修改文件（hello.txt）

### 6.1 查看状态（检测到工作区有文件被修改）

![image-20230627133644105](image-20230627133644105.png)



### 6.2 将修改的文件再次添加暂存区

![image-20230627133907417](image-20230627133907417.png)



### 6.3 查看状态（工作区的修改添加到了暂存区）

![image-20230627133937432](image-20230627133937432.png)

 

### 6.4 将暂存区文件提交到本地库

![image-20230627134046013](image-20230627134046013.png)

 

## 7 历史版本

### 7.1 查看历史版本

#### （1）基本语法

**git reflog**  **查看版本信息**

git reflog -n 数量

**git log**  **查看版本详细信息**

#### （2）案例实操

![image-20230627134228811](image-20230627134228811.png)



### 7.2 版本穿梭

#### （1）基本语法

**git reset --hard** **版本号**

#### （2）案例实操

--首先查看当前的历史记录，可以看到当前是在48f4e22这个版本

![image-20230627134422376](image-20230627134422376.png)

 

--切换到之前版本，8ca80d7版本，也就是我们第一次提交的版本

![image-20230627134533136](image-20230627134533136.png)

 

--切换完毕之后再查看历史记录，当前成功切换到了8ca80d7版本

![image-20230627134618381](image-20230627134618381.png)

 

--然后查看文件hello.txt，发现文件内容已经变化

![image-20230627134649667](image-20230627134649667.png)

 Git切换版本，底层其实是移动的HEAD指针。

# 第4章 Git客户端便捷操作(了解平时不用)

## 1. 安装部署

使用命令行操作git相对而言是非常不方便的，查看内容也不是很直观，所有官方推荐使用Git的GUI 客户端来完成页面化操作。

https://git-scm.com/downloads/guis

![1704960206158](1704960206158.png)

​    推荐下载使用GitHub Desktop。下载安装之后，选择不登录先进入页面。

![1704960312687](1704960312687.png)

## 2. 基础操作

### 2.1 设置个人信息

![1704960580138](1704960580138.png)

### 2.2 创建新的Git仓库

![1704960497554](1704960497554.png)

### 2.3 提交不同版本

![1704960800309](1704960800309.png)

新创建文件1.txt，并写入信息。之后可以在GitGui上面进行提交。

![1704961275801](1704961275801.png)

多次提交的版本可以直接在History页面查看区别，不需要再使用reset命令。

![1704962382919](1704962382919.png)

## 3. 连接GitHub远程仓库

登录自己注册的账号

file>options

![1705040350413](1705040350413.png)

点击Publish可以将当前项目创建到GitHub上面。

![1705458108708](1705458108708.png)

之后修改本地文件，就可以先推送到本地git之后再远程同步到GitHub仓库中。

（1）选择对应的分支

![1705458651469](1705458651469.png)

（2）点击推送

![1705458678557](1705458678557.png)

（3）也可以先在GitHub上面创建远程仓库，之后再拉取到本地保持统一。

![1705459375393](1705459375393.png)

![1705459556035](1705459556035.png)

（4）拉取远程仓库到本地

![1705459822148](1705459822148.png)

file>clone

点击克隆即可，连接完成远程仓库和本地Git之后，在本地修改文件提交Git之后再push推送即可完成同步。

![1705459901802](1705459901802.png)

## 3. Gitee替代GitHub

GitHub的网站有时候会连接不上，无法登录。可以使用阿里提供的Git远程仓库网站Gitee来代替。

![1705460369930](1705460369930.png)

登录账号之后创建新的仓库

![1705461501846](1705461501846.png)

同步远程Gitee仓库的方式和同步GitHub仓库方法完全一致。

![1705461596842](1705461596842.png)

## 4. idea兼容使用Git（JAVA代码）

（1）首先在idea中创建一个空的项目

![1705461792030](1705461792030.png)

（2）编写基础的JAVA代码Hello world

![1705462825829](1705462825829.png)

（3）此时会产生IDEA中的特定文件

![1705462906032](1705462906032.png)

（4） 配置Git忽略文件

- **文件名称：xxxx.ignore**（前缀名随便起，建议是git.ignore）

- 这个文件的存放位置原则上在哪里都可以，为了便于让~/.gitconfig文件引用，建议也放在用户家目录下

- git.ignore文件模版内容如下

  ```text
  # Compiled class file
  *.class
  
  # Log file
  *.log
  
  # BlueJ files
  *.ctxt
  
  # Mobile Tools for Java (J2ME)
  .mtj.tmp/
  
  # Package Files #
  *.jar
  *.war
  *.nar
  *.ear
  *.zip
  *.tar.gz
  *.rar
  
  # virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
  hs_err_pid*
  
  .classpath
  .project
  .settings
  target
  .idea
  *.iml
  ```

（5）在.gitconfig文件中引用

  （此文件在Windows的家目录中）

  ```
[user]
	name = yhm
	email = yaohm7788@163.com
[core]
	excludesfile = C:/Users/merge/git.ignore
  ```

  注意：这里要使用正斜线（/），不要使用反斜线（\）

（6） 定位Git程序

![1705471200362](1705471200362.png)

（7）初始化本地库

![1705471441919](1705471441919.png)



（8）提交到本地库

右键点击项目选择Git -> Add将项目添加到暂存区。

![1705471545505](1705471545505.png)

![1705472084800](1705472084800.png)

 

（9）切换版本

查看历史版本

![img](./wps66.jpg) 

![img](./wps67.jpg) 

右键选择要切换的版本，然后在菜单里点击get。

![1705472349179](1705472349179.png)

# 第5章 GitLab的部署与使用（宝塔选用）    

## 1.为什么使用GitLab-开发运维一体化

gitlab.com

https://gitlab.cn

>**宝塔安装gitlab**
>
>**配置最少4G内存这是基本要求**
>
>可以选择宝塔安装出现问题看这这里...
>
>https://zhuanlan.zhihu.com/p/692146795

```
yum install -y curl policycoreutils-python openssh-server
#这样再安装就好了
```



![1705554047925](./1705554047925.png)

## 2. 阿里云Git Lab 部署

参考文档：https://help.aliyun.com/zh/ecs/use-cases/deploy-and-use-gitlab?spm=5176.21213303.J_qCOwPWspKEuWcmp8qiZNQ.1.577e2f3dlnGbsV&scm=20140722.S_help@@%E6%96%87%E6%A1%A3@@52857._.ID_help@@%E6%96%87%E6%A1%A3@@52857-RL_gitlab%E5%AE%89%E8%A3%85-LOC_llm-OR_ser-V_4-RE_new3-P0_0-P1_0

### 2.1 服务器申请 （ECS 4核8G 要不跑不起来GitLab,低版本性能太差）

1. IDC选择：[阿里云](https://www.aliyun.com/)、[华为云](https://www.huaweicloud.com/intl/zh-cn/)、[腾讯云](https://cloud.tencent.com/) 等。

> 注：以下以阿里云为例

1. 手机号注册，并完成实名验证。

2. 新用户可 [试用](https://free.aliyun.com/?)，选择第一个个人版即可

   - 免费地域：以距离目标服务地区近为宜
   - ECS实例及系统盘：GitLab要求至少4GB内存，最长可用时长约49天，注意 [账户套餐余量](https://ecs.console.aliyun.com/home?#/) 的变化及时停机，以免产生不必要的费用**这里我们选最高配置4核8G**。
   - 操作系统镜像：选择支持 Linux 的 **CentOS** 最新版即可
   - 预装应用：这里选择 **宝塔面板**，另外 [WordPress](https://cn.wordpress.org/) 适用于快速搭建个人博客
     ![](.\./p1.png)

3. 后续如有需求[购买云服务器 ECS](https://www.aliyun.com/product/ecs#/)

   - 付费类型：短时高强度使用选择包年包月，长时低频次使用选择按需付费

     > 其余选择以上一条为准

### 2.2 部署GitLab

1. 等待所有项目安装完毕，如下图
   ![](.\./p2.png)

1. 此时还无法进行访问，来到 [安全组](https://ecs.console.aliyun.com/securityGroup/region/cn-beijing) ，选择管理规则，手动添加 **80** **443** **8888** 端口，保存。后续就能通过宝塔面板开放关闭端口。

![](.\./p6.png)

![](.\./p7.png)

**这里我选开放全部端口选0.0.0.0代码任意地址可以访问**

![](././1736924300751.jpg)

1. 然后需要去重置实例的密码，找到需要重置的实例，按要求设置密码，作为root权限密码使用，等待完成即可。

   ![](.\./p5.png)

2. 接下来安装GitLab，选择侧边栏的 **运维与监控** 条目下的 **系统运维管理OOS**，再选择**扩展程序**，搜索 **GitLab **进行安装，并等待安装完成。
   ![](.\./p3.png)
   ![](.\./p4.png)

3. 现在需要去拿 **GitLab** 的登录密码，选择使用的实例，远程连接，通过Workbench远程连接，立即登录，用户名是root，密码是第3条拿到的root密码，可进入 **Workbench** 界面。输入以下代码：

   ```
   sudo cat /etc/gitlab/initial_root_password
   ```

   即可拿到GitLab登录密码。

   ![](.\./p10.png)

   ![](.\./p11.png)

4. 在浏览器输入网址。访问网址：`http://ECS的公网IP`，即可进入 **GitLab** 配置页面。

5. **如果访问没有成功**请按下图查看是否有密码,如果没有说明没有安装成功，没的密码再安装一次，直到有为止。

   ![](././1736989629375.jpg)

   

## 3. Linux手动部署安装GitLab（了解平时不用）

使用git，还需要一个远程代码仓库。常见的github、gitee这种远程代码仓库，公司中一般不会使用，因为他们是使用外网的，不够安全。一般企业都会搭建一个仅内网使用的远程代码仓库，最常见就是 GitLab。

### **3.1** **安装部署**

GitLab一般由公司的运维人员安装部署，开发人员只需要申请账号和相应权限即可，在这里我们在hadoop104上自己安装GitLab社区版体验一下。

#### **3.1.1** **安装准备**

**1）需要开启ssh：（已开启可跳过）**

```shell
sudo systemctl status sshd
sudo systemctl enable sshd
sudo systemctl start sshd
```

**2）防火墙开放http、https服务：（已关闭防火墙可跳过）**

```shell
sudo systemctl status firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo systemctl reload firewalld
```

#### **3.1.2** **rpm** **包安装**

**1）上传安装包**

下载地址：<https://packages.gitlab.cn/#browse/search/>

安装包较大，建议下载好手动上传服务器。这里上传到/opt/software

**2）编写安装脚本**

```
cd ~/bin
vim gitlab-install.sh
```

脚本内容如下：

```
sudo yum install -y curl policycoreutils-python openssh-server perl
curl -fsSL https://packages.gitlab.cn/repository/raw/scripts/setup.sh | /bin/bash
sudo rpm -ivh gitlab-jh-16.6.1-jh.0.el7.x86_64.rpm
sudo yum install -y postfix
sudo systemctl enable postfix
sudo systemctl start postfix
```

**3）修改脚本执行权限并执行**

```
chmod +x gitlab-install.sh
sh gitlab-install.sh
```

**4）**修改external_url

编辑gitlab.rb

```
[atguigu@hadoop104 ~]$ sudo vim /etc/gitlab/gitlab.rb
```

在文件中找到external_url，修改为如下内容

```
external_url 'http://hadoop104'
```

保存退出

**5）**修改host

编辑gitlab.yml

```shell
[atguigu@hadoop104 ~]$ sudo vim /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml.example
```

找到gitlab.host修改为如下内容

```
  gitlab:

    \## Web server settings (**note:** host is the FQDN, do not include http://)

    host: hadoop104

    port: 80

    https: false
```

保存退出

修改文件名称

```
[atguigu@hadoop104 ~]$ sudo mv /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml.example /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml
```

**6**）重装需要彻底卸载

1 卸载gitlab

```
[atguigu@hadoop104 opt]$ sudo rpm -e gitlab-jh-16.6.1
```

2 删除gitlab文件

```
[atguigu@hadoop104 opt]$ sudo rm -rf /etc/gitlab
[atguigu@hadoop104 opt]$ sudo rm -rf /var/opt/gitlab
[atguigu@hadoop104 opt]$ sudo rm -rf /opt/gitlab
```

3 重装如果卡在sudo gitlab-ctl reconfigure配置命令上，可以使用另外一个窗口执行

```
sudo systemctl restart gitlab-runsvdir
```

#### **3.1.3** **执行初始化**

执行过程大概需要3分钟：

```
sudo gitlab-ctl reconfigure
```

#### **3.1.4** **启停命令**

**1**）启动命令

```
sudo gitlab-ctl start
```

**2）停止命令**

```
sudo gitlab-ctl stop
```

#### **3.1.5** **修改 root** **密码**

**1**）访问Web页面

默认使用80端口，直接浏览器输入安装服务器的hostname或ip

![1706067954154](1706067954154.png)

2）查看root密码

账号root，密码将随机生成并在 /etc/gitlab/initial_root_password 中保存24 小时：

```
sudo cat /etc/gitlab/initial_root_password

zOyGe6aBQbkfYf6rOZP2qaWQOAo59K0HMrq9Rs7Yi2w=
```

修改密码：

![suimg](./wps2222.jpg) 

#### **3.1.6** **设置简体中文**

![11img](./wps223.jpg) 

回到首页，可以看到变成中文：

![sud122img](./wps2224.jpg) 

## 4. 使用GitLab完成团队管理

去到一家公司，应该是已经有了GitLab平台，运维人员拥有root管理员账号。而作为一名普通的开发人员，你的leader和同事都拥有各自的GitLab账号和不同权限。入职后，你只需要申请开通GitLab账号和对应权限，不需要你来操作。

### **4.1** **创建用户**

为了更符合公司实际，我们假设数据组的leader账号为tutou，你是atguigu。

![rgimg](./wps2225.jpg) 

创建一个leader的账号：

![11img](./wps22122.jpg) 

再申请一个atguigu账号

![121img](./wps2227.jpg) 

用户会收到重置密码的邮件，也可以由管理员设置：

![31321img](./wps8222.jpg) 

![32321img](./wps9222.jpg) 

### **4.2** **创建群组**

在gitlab里，可以创建出组、组下的子组。在小公司里可以看见gitlab里边会创建出后端，大数据等等一系列组。尽量不要使用中文创建组名, 可以在组信息中的备注编写中文描述以及中文组名, 组内人员名称也尽量用全拼命名。

对于人员权限以及角色的控制也比较简单，有如下五种：

Ø Owner：最高权限，谁去创建组，这个组就被谁拥有，它可以开除管理员，但管理员无法操作owner的角色。

Ø Maintainer：（管理员-只是具备sudo权限的用户）管理员一般是给小组的组长，或者是给产品线的总监设定。

Ø Developer：是干活的人，就是写代码的程序员，可以进行代码的上传以及代码的下载，不能下载其他的组内的代码，只能下载它们组的代码。

Ø Repoter：比如现在有需求，其他组的大牛到我们组过来指导工作，要审视我们的代码，人家就提出需要一个权限，我不能给它developer因为它会改你代码，其他组的人不能改我们组的代码，所以就给一个repoter权限，他只能看，只读权限。

Ø guest：不用看，匿名，直接去掉。一般出现在从ldap中把离职人员的信息删掉，再去gitlab查这个人的时候，它就是一个guest用户（匿名）需要再到gitlab把它删掉（不删也没事）。

下面，我们假设研发部群组是rdc，下属后端组、前端组、大数据组等子群组：

![1img](./wps12220.jpg) 

**1）创建研发中心群组rdc**

![2img](./wps12221.jpg) 

**2**）创建大数据组

在研发中心组下，再创建一个大数据组（当然，其他还会有后端组、前端组等）：

![2img](./wps13332.jpg) 

![4img](./wps13222.jpg) 

当然，根据公司情况还可以进一步在数据组下面细分子组（比如：离线、实时、湖等），这里我们就不再细分。

将数据组的leader设为bigdata的负责人：

![4img](./wps12224.jpg) 

将atguigu添加为普通的开发人员：

![1img](./wps15222.jpg) 

现在我们就有一个顶级群组rdc，其下有一个子群组bigdata，组内有管理员tutou，开发人员atguigu。



**创建项目**：

先修改配置文件
https://blog.csdn.net/qq_36973384/article/details/142464526

https://www.cnblogs.com/wuyida/p/6300283.html

## 5.使用viso code 兼容GitLab

**1）**安装 GitLab 插件（先不操作）

**2）** **配置 SSH 免密登录**

```
ssh-keygen -t rsa -C 自己的邮箱名
```



![1img](./wps12227.jpg) 

到用户目录下.ssh查看id_rsa.pub文件

![1img](./wps18222.jpg) 

![1img](./wps19222.jpg) 

添加到GitLab中：

![2img](./wps20222.jpg) 

**3）**获取 GitLab 个人令牌

![2img](./wps21222.jpg) 

创建后，可以查看和复制生成的token：

![2img](./wps22222.jpg) 

**4）**添加 GitLab 服务

![2img](./wps23222.jpg) 

![2img](./wps24222.jpg) 

**5）**修改默认分支的保护策略

![2img](./wps25222.jpg) 

# 第5章 [分支](https://coder1024.blog.csdn.net/article/details/134132117?spm=1001.2014.3001.5502)

## 1.1 分支概述

### 1.1.1 Git分支简介

Git的分支概念与SVN的分支概念完全不同，在SVN中，分支更倾向于是一个文件夹，建立分支也只是建立一个新的文件夹，利用分支管理项目其实本质上是为了使得项目的结构更加清晰。当然SVN的分支也提供合并、回退等功能，但相对于Git过于笨重。
在Git中使用分支的主要目的是为了==**合并分支**==，基于分支来开发项目并不会影响主线开发，当其他分支的代码确认无误需要集成到主线分支（Master分支）时，我们需要进行分支的合并即可，即将主线分支合并到其他分支中，这样一个完整的功能就集成到主线代码中了；

**Git分支如图所示**：

![](././1efc92b986a09efb08b7e101b07e163c.png)

### 1.1.2 Git分支原理

在很多版本控制系统中，创建分支是一个略微低效的过程——常常需要完全创建一个源代码目录的副本。对于大项目来说，这样的过程会耗费很多时间，例如SVN正是这样的操作。显然，Git并没有采用这种笨重的方式来管理分支。

在Git中，分支其实本质上仅仅是指向Commit对象的可变指针；默认情况下所有仓库都会有一个默认的分支，名为master。在.git\refs\heads目录存储着当前仓库的所有分支。每一个分支都有一个以分支名命名的文件，该文件存储着当前分支指向的提交对象的hash值；

【初始化仓库】

```
rm -rf .git ./*
git init
echo '111' > aaa.txt
git add ./
git commit -m '111' ./
```

![](././e3ecc7b840982dec825a6c12023b4a35.png)

【查看分支】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline
ceca35b (HEAD -> master) 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat .git/refs/heads/master
ceca35b10c0495e852cbf26205fb5a5af409b70e

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git cat-file -p ceca35b
tree 8f96f2f60c766a6a6b78591e06e6c1529c0ad9af
author xiaohui <xiaohui@aliyun.com> 1697097246 +0800
committer xiaohui <xiaohui@aliyun.com> 1697097246 +0800

111
```

![](././0da047ddf497565d81fa4e7c4c0c05d9.png)

【继续开发，查看master分支变化】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ echo '222' > aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git commit -m '222' ./
warning: LF will be replaced by CRLF in aaa.txt.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in aaa.txt.
The file will have its original line endings in your working directory
[master 69372ca] 222
 1 file changed, 1 insertion(+), 1 deletion(-)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline
69372ca (HEAD -> master) 222
ceca35b 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat .git/refs/heads/master
69372ca265e6a98c8a7f839b8760f98b80bbf4fe

```

![](././2e9e066604d8d660811d92917a00aa93.png)

我们可以看到，在Git中，分支仅仅是一个指向Commit对象的一个可变指针，当执行commit提交后，当前分支会指向最新的commit对象的hash值，这样通过提交对象的hash值来找到对应版本的内容，而不需要像其他版本控制工具那样将整个文件夹进行拷贝。

因此，Git的分支相对于其他版本控制工具显得极其轻量级，操作速度也是其他版本控制工具不可比拟的。

在Git中，每一个分支都是保存一个提交对象的hash值：

![](././cedc01c340c090b617f503fa0ff073f4.png)

## 1.2 创建分支

###　1.2.1 创建普通分支

- 语法：

```
git branch {branchName} [commitHash]
```

创建一个分支，默认情况下指向最新的commit对象

【初始化项目】

```
rm -rf .git ./*
git init
echo '111' > aaa.txt
git add ./
git commit -m '111' ./
echo '222' > aaa.txt
git commit -m '222' ./
echo '333' > aaa.txt
git commit -m '333' ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline
6f02325 (HEAD -> master) 333
7ded3d1 222
a9e7314 111
```

![](././c08c2ff8688136042ad8fe6a282bd766.png)

>HEAD是一个活动指针，指向的是正在活跃的分支。

【在当前HEAD指针指向的位置创建分支】

```
git branch b1
```

![](././d9822c65892ad126458000f689c01e52.png)

查看`.git\refs\heads`目录：

![](././a03fb4f83fd12d8abc64cc24e079a794.png)

【继续使用master分支开发】

```
echo '444' > aaa.txt
git commit -m '444' ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline
2920850 (HEAD -> master) 444
57a8f94 (b1) 333
3ac4fa8 222
afb705d 111
```

![](././785eb760a0b3927a3d33115393622e1f.png)

### 1.2.2 指定提交对象创建分支

【指定提交对象来创建分支】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git branch b2 3ac4fa8					# 根据指定的提交对象来创建分支

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline
2920850 (HEAD -> master) 444
57a8f94 (b1) 333
3ac4fa8 (b2) 222
afb705d 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat .git/refs/heads/b2
3ac4fa83b8c224518758b2b4ef7d2f214ac0224a

```

![](././89069699c32df1b2aabd80dfef6c0d14.png)

## 1.3 切换分支

### 1.3.1 checkout分支切换

创建好了分支之后，我们可以使用`git checkout`切换到其他分支进行开发；

- 语法：

```
git checkout {branchName}
```

【准备环境】

```
rm -rf .git ./*
git init
echo '111' >> aaa.txt
git add ./
git commit -m '111' ./
echo '222' >> aaa.txt
git commit -m '222' ./
echo '333' >> aaa.txt
git commit -m '333' ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline
2130f83 (HEAD -> master) 333
86cbe2b 222
dad9d1a 111

```

【创建分支】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 在当前位置创建b1分支
$ git branch b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 指定提交对象来创建分支
$ git branch b2 86cbe2b

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		
$ git log --oneline
2130f83 (HEAD -> master, b1) 333		# b1分支的位置
86cbe2b (b2) 222						# b2分支的位置
dad9d1a 111

```

【切换到b1分支进行开发】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 切换到b1分支
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# HEAD指针指向了b1分支
$ git log --oneline
2130f83 (HEAD -> b1, master) 333
86cbe2b (b2) 222
dad9d1a 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 编辑文件
$ echo "444" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 提交
$ git commit -m "b1 444" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看文件内容
$ cat aaa.txt
111
222
333
444

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看日志
$ git log --oneline
51b41c0 (HEAD -> b1) b1 444				# b1分支正在开发
2130f83 (master) 333					# master和b2分支留在原地
86cbe2b (b2) 222
dad9d1a 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 切换到master分支
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)	# 查看日志
$ git log --oneline
2130f83 (HEAD -> master) 333		# HEAD指针指向了master分支
86cbe2b (b2) 222
dad9d1a 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)	# 查看master分支工作状态的文件内容(文件内容是旧版本的)
$ cat aaa.txt
111
222
333

```

【查看所有版本情况】

默认情况下使用`git log`查询日志只能查询到之前的版本的日志，无法查询到比自身分支版本还要新的版本，通过`--all`可以查询所有版本的提交日志；

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline				# 只能查询master分支之前版本的日志信息
2130f83 (HEAD -> master) 333
86cbe2b (b2) 222
dad9d1a 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查询所有日志信息
$ git log --oneline --all
51b41c0 (b1) b1 444
2130f83 (HEAD -> master) 333
86cbe2b (b2) 222
dad9d1a 111

```

### 1.3.2 checkout原理

通常情况下，当前分支如果存在未提交的操作时，则无法切换到其他分支；所以我们切换分支时最好保证当前工作空间的状态为nothing to commit；即：所有操作均已提交

在切换分支时，Git会对以下地方进行修改：

1）HEAD指针：将HEAD指针指向最新的分支
2）工作空间的内容：将当前工作空间的内容更新为之前的分支的内容
【代码示例】

```
rm -rf .git ./*
git init
echo '111' >> aaa.txt
git add ./
git commit -m '111' ./
git branch b1						
echo '222' >> aaa.txt
git add ./
git commit -m '222' ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git log --oneline --all
464d580 (HEAD -> master) 222
cc3429a (b1) 111

```

【操作master分支的文件但不提交，切换到b1分支发现切换失败】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)			# 编辑文件
$ echo "333" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout b1
error: Your local changes to the following files would be overwritten by checkout:
        aaa.txt
Please commit your changes or stash them before you switch branches.
Aborting

```

![](././8e19191b537c3280b0c2dbd925009208.png)

可以看出，如果当前分支存在未提交的操作时，Git不允许切换分支。但是有2种情况是例外的：

1）新分支的情况：当该分支是一个新创建的分支时，当前分支存在未提交的操作依旧可以切换到新分支，并且会将未提交的操作影响到新分支；
2）新文件的情况：当操作的文件是一个新的文件时，当前分支未提交依旧是可以切换到其他分支，并将操作影响到其他分支；
如果存在以上两种行为进行切换分支，则切换分支时不仅会对HEAD指针、工作空间等地方修改，还会对如下地方进行修改：

1）工作空间的状态：将当前分支的工作空间状态更新为之前分支
2）暂存区的内容：将当前暂存区内容更新为之前的分支

> Tips：我们在切换分支时，**要保证当前分支是提交的状态，否则会对其他分支造成不必要的影响；**

##### 1） 影响工作空间

新分支、新文件的操作都会影响工作空间和暂存区；

【演示新分支影响工作空间】

初始化仓库

```
rm -rf ./* .git
git init
echo '111' >> aaa.txt
git add ./
git commit -m '111' ./
git branch b1						
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)	# b1分支创建后整个工作空间还没有提交过任何一次文件，属于新分支
$ git log --oneline --all
4b3c6bc (HEAD -> master, b1) 111			# 指针还是指向master分支的

```

在master分支编辑文件，然后切换到b1分支，查看工作空间的内容，发现变更了（影响了b1分支的工作空间内容）：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 编辑master分支的文件内容
$ echo "222" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# master分支的状态
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 切换到b1分支，发现能够切换成功
$ git checkout b1
Switched to branch 'b1'
M       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)			# b1分支的文件内容
$ cat aaa.txt
111
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)			# b1分支的状态
$ git status
On branch b1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")

```

可以看到在遇到新分支时，当前工作空间的操作即使未提交也可以切换到其他分支，而且影响其他分支的工作空间状态及工作空间内容；注意，此时将master未提交的数据也影响到了b1分支，当分支切换到master然后提交，b1分支被影响的内容就消失了；

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)			# 切换到master分支
$ git checkout master
Switched to branch 'master'
M       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 提交操作
$ git commit -m "222" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 切换到b1分支
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)			# 查看内容，发现影响消失了
$ cat aaa.txt
111

```

重新切换到master分支，编辑文件未提交，切换到b1分支失败（此时b1分支不属于新分支了）：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ echo "333" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)			# 切换到b1分支失败，此时b1分支不属于新分支了；
$ git checkout b1
error: Your local changes to the following files would be overwritten by checkout:
        aaa.txt
Please commit your changes or stash them before you switch branches.
Aborting

```

【演示新文件影响工作空间】

把之前编辑的内容删除，将工作空间恢复到干净状态

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 把之前编辑的内容删除
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ cat aaa.txt
111
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 工作空间又回到了干净状态（所有的操作均已提交）
$ git status
On branch master
nothing to commit, working tree clean

```

使用master创建一个新的文件，切换到b1分支，查看b1分支的工作空间内容，发现也多了一个bbb.txt文件（影响了b1分钟的工作空间）：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 编辑一个新的文件
$ echo "333" >> bbb.txt		# 注意，此时创建了一个新的文件bbb.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        bbb.txt

nothing added to commit but untracked files present (use "git add" to track)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 切换到b1分支，发现切换成功
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ ll
total 2
-rw-r--r-- 1 Adminstrator 197121 5 Oct 23 09:23 aaa.txt
-rw-r--r-- 1 Adminstrator 197121 4 Oct 23 09:23 bbb.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)			# b1的工作空间多了一个文件
$ git status
On branch b1
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        bbb.txt

nothing added to commit but untracked files present (use "git add" to track)

```

切换到master分支，提交操作，然后切换回b1分支，发现b1分支的bbb.txt文件清除了：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)			# 切换回master分支
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git add ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 提交操作
$ git commit -m "333-bbb" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 切换到b1分支
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git status
On branch b1
nothing to commit, working tree clean

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)		# b1工作空间的bbb.txt文件清除了
$ ll
total 1
-rw-r--r-- 1 Adminstrator 197121 5 Oct 23 09:26 aaa.txt

```

##### 2） 影响暂存区

【演示新分支影响暂存区】

初始化仓库：

```
rm -rf ./* .git
git init
echo '111' >> aaa.txt
git add ./
git commit -m '111' ./
git branch b1			

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# b1分支创建后整个工作空间还没有提交过任何一次文件，属于新分支
$ git log --oneline --all
19fd84b (HEAD -> master, b1) 111		# 指针还是指向master分支的

```

在master分支编辑文件，然后添加到暂存区，切换到b1分支，查看b1分支的暂存区内容，发现变更了（影响了b1分支的暂存区）；

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ echo "222" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git add ./
warning: LF will be replaced by CRLF in aaa.txt.
The file will have its original line endings in your working directory

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout b1
Switched to branch 'b1'
M       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git ls-files -s
100644 a30a52a3be2c12cbc448a5c9be960577d13f4755 0       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git cat-file -p a30a52a3
111
222

```

重新切换回master，提交之前的操作，然后再切换回b1分支，查看暂存区内容，发现影响消除了（此时b1不再属于新分支了）：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git checkout master
Switched to branch 'master'
M       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git commit -m "222" ./
warning: LF will be replaced by CRLF in aaa.txt.
The file will have its original line endings in your working directory
[master 2ae7cda] 222
 1 file changed, 1 insertion(+)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git ls-files -s
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git cat-file -p 58c9bdf9
111

```

切换回master分支，编辑文件，还没有提交，切换到b1分钟发现出错（此时b1分支不属于新分支了）：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ echo "333" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git add ./
warning: LF will be replaced by CRLF in aaa.txt.
The file will have its original line endings in your working directory

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout b1
error: Your local changes to the following files would be overwritten by checkout:
        aaa.txt
Please commit your changes or stash them before you switch branches.
Aborting

```

【演示新文件影响工作空间】

提交之前的操作，将工作空间恢复到干净状态

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git commit -m "333" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git log --oneline --all
f5d54ea (HEAD -> master) 333
2ae7cda 222
e9b98e3 (b1) 111

```

创建一个新文件，添加到暂存区，然后切换到b1分支，发现b1分支的暂存区也多了一个文件（影响了b1分支的暂存区）：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ echo "444-bbb" >> bbb.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git add ./
warning: LF will be replaced by CRLF in bbb.txt.
The file will have its original line endings in your working directory

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout b1
Switched to branch 'b1'
A       bbb.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)		# b1分支的暂存区也多了一个文件
$ git ls-files -s
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt
100644 a864cef2a0696aabcc85e6e55f04dc12230bab84 0       bbb.txt

```

切换回master，提交之前的操作，然后再切换回b1分支，查询b1分支的暂存区内容被消除了（消除影响）：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git checkout master
Switched to branch 'master'
A       bbb.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git commit -m "444-bbb" ./
warning: LF will be replaced by CRLF in bbb.txt.
The file will have its original line endings in your working directory
[master d76cc6f] 444-bbb
 1 file changed, 1 insertion(+)
 create mode 100644 bbb.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git ls-files -s
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt

```

此时bbb.txt文件已经不属于新文件了，回到master分支，编辑bbb.txt文件，未提交，然后切换到b1分支，发现切换不了：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ echo "555-bbb" >> bbb.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git add ./
warning: LF will be replaced by CRLF in bbb.txt.
The file will have its original line endings in your working directory

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout b1
error: Your local changes to the following files would be overwritten by checkout:
        bbb.txt
Please commit your changes or stash them before you switch branches.
Aborting

```

### 1.3.3 switch切换分支

`git switch`是Git 2.23版本推出的一个新的命令，专门用于分支的切换，而`git checkout`除了做分支的切换还有一些其他的功能，如恢复文件，恢复暂存区等；

初始化仓库：

```
rm -rf ./* .git
git init
echo '111' >> aaa.txt
git add ./
git commit -m '111' ./

```

使用git checkout恢复文件：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ echo "222" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout aaa.txt
Updated 1 path from the index

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git status
On branch master
nothing to commit, working tree clean

```

使用git checkout恢复暂存区：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ echo "222" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 添加到暂存区
$ git add ./
warning: LF will be replaced by CRLF in aaa.txt.
The file will have its original line endings in your working directory

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   aaa.txt


Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git reset aaa.txt
Unstaged changes after reset:
M       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)
$ git checkout aaa.txt
Updated 1 path from the index

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (master)		# 成功恢复
$ git status		
On branch master
nothing to commit, working tree clean

```

但`git switch`命令是专门用于切换分支的，并且`git switch`切换分支也会存在我们探究的新分支、新文件切换时所带来的影响问题；

使用`git switch`命令切换分支：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 ((89dda87...))
$ git log --oneline --all
033f6b5 (master) 222
89dda87 (HEAD) 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 ((89dda87...))
$ git branch b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 ((89dda87...))
$ git switch b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace/xiaohui/test01 (b1)
$ git log --oneline --all
033f6b5 (master) 222
89dda87 (HEAD -> b1) 111

```

## 1.4 分支合并

建立好分支后，我们可以使用分支进行开发功能，开发功能趋于成熟稳定后，我们可以将master分支与当前分支进行合并，这样其他分支的功能就集成到主分支上了，这也是当前主流的开发方式。

使用分支开发功能从角度上划分一般为同轴开发和非同轴开发。

分支合并语法：

```
git merge {branchName}
```

解释：将branchName分支的代码合并到当前分支

### 1.4.1 快进合并

- 同轴开发的快进合并：

同轴开发：创建一个新分支，使用新分支开发，等待开发功能趋于成熟稳定后，我们可以将master分支与新分支进行合并，这样其他分支的功能就集成到主分支上了，这也是企业里面经常用的一种开发方式；

对于前面的版本想要合并后面的版本，我们称为快进合并

在同轴开发中，多个分支处于同一根开发轴上，后面版本的代码包含前面版本的代码，因此同轴开发一般只会存在快进合并；

- 如图所示：

![](././28e351e31f1b165d06510c0d2ec3a86b.png)

- 首先创建一个新分支（login分支）
- 切换到新分支，在新分支开发上功能代码

【示例代码】

初始化项目：

```
rm -rf .git ./*
git init
echo '用户名+密码登录' >> login.txt
git add ./
git commit -m '用户名+密码登录功能完成' ./

```

①创建login分支

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git branch login

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all
2f5d87a (HEAD -> master, login) 用户名+密码登录功能完成

```

②切换到login分支

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git checkout login
Switched to branch 'login'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git log --oneline --all
2f5d87a (HEAD -> login, master) 用户名+密码登录功能完成

```

③使用login分支开发：集成QQ登录

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ echo "集成QQ登录" >> login.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git commit -m "集成QQ登录" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git log --oneline --all
a879a6c (HEAD -> login) 集成QQ登录
2f5d87a (master) 用户名+密码登录功能完成

```

④使用login分支开发：集成微信登录

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ echo "集成微信登录" >> login.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git commit -m "集成微信登录" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git log --oneline --all
c5a2584 (HEAD -> login) 集成微信登录
a879a6c 集成QQ登录
2f5d87a (master) 用户名+密码登录功能完成

```

当login分支基于稳定后，将功能集成到maste分支：

- 如图所示：

![](././8faaff5d947976a898a88e2af11e531f.png)

⑤切换回master分支，将login分支的代码合并到master分支：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat login.txt
用户名+密码登录

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git merge login
Updating 2f5d87a..c5a2584
Fast-forward
 login.txt | 2 ++
 1 file changed, 2 insertions(+)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat login.txt
用户名+密码登录
集成QQ登录
集成微信登录

```

![](././ed15977d5c7c5b8a714275467913457a.png)

将login分支的代码合并到master分支，其实本质上就是让master也指向与login一样的提交对象；

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# master与login分支指向的是同一个Commit对象
$ cat .git/refs/heads/login
c5a258428f0bec398017159126f0b87b0d05a1e4
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat .git/refs/heads/master
c5a258428f0bec398017159126f0b87b0d05a1e4
```

### 1.4.2 典型合并

非同轴开发的典型合并：
非同轴开发：创建一个新分支，使用新分支开发，与此同时master分支也在开发行功能，等到新分支开发的功能完毕后，将master分支与新分支进行合并，将新分支集成到master分支中，但是新分支在开发过程中master分支也进行了一部分开发。

**在非同轴开发中，后面的版本（v3）需要合并前面的版本（v2），这种合并方式称为典型合并**；

由于典型合并存在于非同轴

如图所示：

![](././74416dbd0c8c2488cb8da4cf2bc515db.png)

需要注意的是，如果是同轴开发，后面版本的内容肯定包含前面版本的内容，因此==**同轴开发不存在典型合并**==，只存在快进合并。另外，非同轴开发也存在快进合并，例如上图中的③步骤中，前面的版本（v2）想要合并后面的版本（v3），这也是一种快进合并。

总结：

- 同轴开发：只存在快进合并

- 非同轴开发：

  - 前面的版本合并后面的版本：快进合并
  - 后面的版本合并前面的版本：典型合并

  > Tips：典型合并必定是非同轴，快进合并可以是非同轴也可以是同轴。

【示例代码】

初始化项目：

```
rm -rf .git ./*
git init
echo '用户名+密码登录' >> project.txt
git add ./
git commit -m '用户名+密码登录功能完成' ./

```

①创建login分支：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git branch login

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)			# 查看不同轴的日志需要加上--graph
$ git log --oneline --all --graph
* 7c0b2a3 (HEAD -> master, login) 用户名+密码登录功能完成

```

②切换到login分支，使用login分支进行开发：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git checkout login
Switched to branch 'login'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ echo "集成QQ登录" >> project.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git commit -m "集成QQ登录" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git log --oneline --all --graph
* 9c968e0 (HEAD -> login) 集成QQ登录
* 7c0b2a3 (master) 用户名+密码登录功能完成

```

③切换回master分支添加注册功能：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查看master分支的project.txt文件，代码并没有合并过来
$ cat project.txt
用户名+密码登录
添加头像上传功能

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查看日志，处于不同轴开发路径
$ git log --oneline --all --graph
* fecdb41 (HEAD -> master) 添加头像上传功能
| * 9c968e0 (login) 集成QQ登录
|/
* 7c0b2a3 用户名+密码登录功能完成

```

④将login分支的合并到master分支：产生代码冲突

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git merge login
Auto-merging project.txt
CONFLICT (content): Merge conflict in project.txt
Automatic merge failed; fix conflicts and then commit the result.

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)
$ cat project.txt
用户名+密码登录
<<<<<<< HEAD
添加头像上传功能
=======
集成QQ登录
>>>>>>> login

```

![](././2fa24480b7b04532f0dbde2657b41505.png)

解决代码冲突：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)
$ cat project.txt
用户名+密码登录
<<<<<<< HEAD
添加头像上传功能
=======
集成QQ登录
>>>>>>> login

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)
$ vi project.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)
$ cat project.txt
用户名+密码登录
添加头像上传功能
集成QQ登录

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)
$ git commit -a -m "合并login分支，并解决代码冲突"
[master 9ccdde2] 合并login分支，并解决代码冲突

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
*   9ccdde2 (HEAD -> master) 合并login分支，并解决代码冲突			# 解决冲突后提交产生一次新的版本
|\
| * 9c968e0 (login) 集成QQ登录
* | fecdb41 添加头像上传功能
|/
* 7c0b2a3 用户名+密码登录功能完成

```

经过上一次合并后，master与login属于同轴了，当切换为login分支，可以使用快进合并来合并master分支；

![](././30a53fc19c2edf1fc04cab289f9899f6.png)

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)			# 切换为login分支
$ git checkout login
Switched to branch 'login'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)			# login分支的代码
$ cat project.txt
用户名+密码登录
集成QQ登录

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git log --oneline --all --graph
*   9ccdde2 (master) 合并login分支，并解决代码冲突
|\
| * 9c968e0 (HEAD -> login) 集成QQ登录			
* | fecdb41 添加头像上传功能
|/
* 7c0b2a3 用户名+密码登录功能完成

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)			# 合并master分支
$ git merge master
Updating 9c968e0..9ccdde2
Fast-forward
 project.txt | 1 +
 1 file changed, 1 insertion(+)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)			# 查看login分支的代码，发现master的代码被合并过来了
$ cat project.txt
用户名+密码登录
添加头像上传功能
集成QQ登录

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (login)
$ git log --oneline --all --graph
*   9ccdde2 (HEAD -> login, master) 合并login分支，并解决代码冲突
|\
| * 9c968e0 集成QQ登录
* | fecdb41 添加头像上传功能
|/
* 7c0b2a3 用户名+密码登录功能完成

```

## 1.5 Git的代码冲突

### 1.5.1 Git的代码冲突的分类与特点

Git存在代码冲突的情况分为**协同开发时的代码冲突**与**分支合并时的代码冲突**；其中分支合并时的代码冲突又分为**快进合并代码冲突**与**典型合并代码冲突**。

![](././01440d7f11052c1b084135ee30d0eb1a.png)

另外还需要注意的是，Git与SVN的代码冲突逻辑不一致。

> Tips：我们本章主要讨论分支合并时的代码冲突。

- 在SVN中：只要两个用户编辑的不是同一行则不会出现代码冲突。

- 在Git中：只要两个文件内容不一致，在合并分支时必定会产生冲突，无论两个文件是否编辑的是同一行。不过具体情况还得细分如下：

  - 快进合并：两个分支属于不同轴开发，前面版本合并后面版本时，只要两个文件不一致，合并时必定出现冲突，不管两个分支编辑的是不是同一行。
  - 典型合并：由于典型合并两个分支属于不同的开发轴，而后面的分支想要合并前面的分支，两个文件必定不一致，因此典型合并必定出现代码冲突。

> Tips：同轴开发的快进合并是不会产生冲突的。

【SVN代码冲突模拟】

SVN的情况：两个用户编辑的代码是同一行则出现冲突

![](././1737104528102.jpg)

如果"xiaolan"用户最后更改的文件内容为：

```
111
222bbb
```

然后再执行update，则不会出现代码冲突，因为SVN判断代码冲突的代码单元为行，即：两个用户编辑的不是同一行就不会出现代码冲突。

### 1.5.2 快进合并代码冲突

快进合并属于前面的版本合并后面的版本，需要注意的是==前面的版本并非是"旧版本"，后面的版本并非是"新版本"==，这主要取决于是否是同轴开发。对于同轴开发，后面的版本自然是新版本，其内容肯定包含前面版本的内容。但对于非同轴开发，后面的版本内容大概率是不包含前面的版本内容的；

在同轴开发情况下，快进合并不会产生代码冲突，但如果在非同轴开发情况下，快进合并就会产生代码冲突了。我们观察下列操作
![](././1737104695383.jpg)

> Tips：注意，上述操作在SVN中则不会认为是冲突，因为SVN判断是否冲突的标准是操作同一个文件的同一行记录；

- 快进合并冲突演示：

![](././3cc296cb9cb0151bf7ae9b2fbe145b47.png)

【使用Git演示代码冲突】

①初始化项目

```
rm -rf .git ./*
git init

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat aaa.txt
111
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git add ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git commit -m "111 222" ./

```

②创建test分支

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git branch test

```

③继续使用master分支开发

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
* d40d605 (HEAD -> master, test) 111 222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat aaa.txt
111aaa
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git commit -m "aaa" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
* 09fe9cb (HEAD -> master) aaa
* d40d605 (test) 111 222

```

④切换到test分支开发

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git checkout test
Switched to branch 'test'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)			# 注意，和master分支修改的文件内容不是同一行
$ cat aaa.txt
111
222bbb

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ git commit -m "bbb" ./
[test dfe1b42] bbb
 1 file changed, 1 insertion(+), 1 deletion(-)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)			# 查看日志，test与master分支已经不同轴
$ git log --oneline --all --graph	
* dfe1b42 (HEAD -> test) bbb
| * 09fe9cb (master) aaa
|/
* d40d605 111 222

```

⑤切换回master分支，合并test分支，出现冲突：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)			# 切换回master分支
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 合并test分支，属于快进合并，但是会产生冲突
$ git merge test
Auto-merging aaa.txt
CONFLICT (content): Merge conflict in aaa.txt
Automatic merge failed; fix conflicts and then commit the result.

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)
$ cat aaa.txt
<<<<<<< HEAD
111aaa
222
=======
111
222bbb
>>>>>>> test

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)
$ cat aaa.txt
111aaa
222bbb


Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master|MERGING)			# 解决冲突
$ git commit -a -m "master合并test分支"
[master adaec78] master合并test分支

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
*   adaec78 (HEAD -> master) master合并test分支
|\
| * 7b14536 (test) bbb
* | eeca4c9 aaa
|/
* 5f41035 111 222

```

需要注意的是：此时切换回test分支，合并master分支内容不会出现冲突（属于快进合并，但是内容不一致，但不会出现冲突）：因为master分支的内容是刚刚解决了冲突之后用户确定了的内容。

![](././5b8ac672595dec129b26e1e5b2a67fc2.png)

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git checkout test
Switched to branch 'test'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
*   adaec78 (master) master合并test分支
|\
| * 7b14536 (HEAD -> test) bbb
* | eeca4c9 aaa
|/
* 5f41035 111 222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ cat aaa.txt
111
222bbb

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ git merge master
Updating 7b14536..adaec78
Fast-forward
 aaa.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ cat aaa.txt
111aaa
222bbb

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
*   adaec78 (HEAD -> test, master) master合并test分支
|\
| * 7b14536 () bbb
* | eeca4c9 aaa
|/
* 5f41035 111 222

```

### 1.5.3 典型合并代码冲突

典型合并时的代码冲突就是我们之前遇到的那种情况，典型合并属于不同轴的开发，并且后面版本需要合并前面版本的情况，由于不同轴，因此后面版本的内容不一定包含前面版本的内容，由于Git代码冲突的特点，因此典型合并必定会出现代码冲突，因为后面版本的内容不可能和前面版本内容一致。

我们观察下列操作：

![](././1737105072952.jpg)

- 典型合并冲突演示：

![](././e29e6c7944b687a04ff6139b89721693.png)

【使用Git演示代码冲突】

①初始化项目：

```
rm -rf .git ./*
git init

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat aaa.txt
111
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git add ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git commit -m "111 222" ./

```

②创建test分支

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git branch test

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
* 45fa06b (HEAD -> master, test) 111 222

```

③继续使用master分支开发

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git checkout master
Already on 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat aaa.txt
111aaa
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git commit -m "aaa" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
* c86283b (HEAD -> master) aaa
* 45fa06b (test) 111 222

```

④切换到test分支，继续开发

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git checkout test
Switched to branch 'test'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ cat aaa.txt
111
222bbb

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ git commit -m "bbb" ./
[test e61df5a] bbb
 1 file changed, 1 insertion(+), 1 deletion(-)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ git log --oneline --all --graph
* e61df5a (HEAD -> test) bbb
| * c86283b (master) aaa
|/
* 45fa06b 111 222

```

⑤使用test分支合并master分支（属于典型合并）

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ git merge master
Auto-merging aaa.txt
CONFLICT (content): Merge conflict in aaa.txt
Automatic merge failed; fix conflicts and then commit the result.

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test|MERGING)
$ cat aaa.txt
<<<<<<< HEAD
111
222bbb
=======
111aaa
222
>>>>>>> master

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test|MERGING)
$ vi aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test|MERGING)
$ cat aaa.txt
111aaa
222bbb

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test|MERGING)
$ git commit -a -m "合并master分支，并解决冲突"
[test 448d619] 合并master分支，并解决冲突

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ git log --oneline --all --graph
*   448d619 (HEAD -> test) 合并master分支，并解决冲突
|\
| * c86283b (master) aaa
* | e61df5a bbb
|/
* 45fa06b 111 222

```

同样的，如果此时切换回master分支，合并test分支虽然属于快进合并并且不同轴，但合并依旧不会出现冲突，因为test分支的内容是解决冲突并且经过用户确认之后的内容。

![](././dd368a328087b2c6efc5974854c56dad.png)

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ git log --oneline --all --graph
*   448d619 (HEAD -> test) 合并master分支，并解决冲突
|\
| * c86283b (master) aaa
* | e61df5a bbb
|/
* 45fa06b 111 222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (test)
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat aaa.txt
111aaa
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git merge test
Updating c86283b..448d619
Fast-forward
 aaa.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ cat aaa.txt
111aaa
222bbb

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all --graph
*   448d619 (HEAD -> master, test) 合并master分支，并解决冲突
|\
| * c86283b aaa
* | e61df5a bbb
|/
* 45fa06b 111 222

```

## 1.6 Git的分支状态存储

有时，当你在项目的一部分上已经工作一段时间后，所有东西都进入了混乱的状态，而这时你想要切换到另一个分支做一点别的事情。 但你必须将当前工作空间所做的操作提交到版本库，否则Git不允许切换分支；但是当前的操作还不足以生成一次版本快照，此时，我们就可以使用Git的存储功能，将当前工作状态存储起来，然后再切换到其他分支工作，最终工作完毕后切回当前分支，从Git存储中取出之前的工作内容；

### 1.6.1 Git存储引入

【初始化项目环境】

```
rm -rf ./* .git
git init
echo '111-master' >> aaa.txt
git add ./
git commit -m '111-master' ./
git branch b1
git checkout b1
echo '111-b1' >> aaa.txt
git add ./
git commit -m '111-b1' ./
echo '222-b1' >> aaa.txt
git commit -m '222-b1' ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看分支详情
$ git log --oneline --graph --all
* 01ca592 (HEAD -> b1) 222-b1			# b1的位置
* 1337456 111-b1
* f828bbd (master) 111-master			# master的位置

```

编辑文件：

```
echo '333-b1' >> aaa.txt
```

编辑完了后还不想提交，此时接收到了新的"临时任务"，想要切换到其他分支继续操作，发现切换失败：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)				# 查看git状态
$ git status
On branch b1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")			# 有修改操作还未提交

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)				# 切换到master失败
$ git checkout master
error: Your local changes to the following files would be overwritten by checkout:
        aaa.txt
Please commit your changes or stash them before you switch branches.
Aborting

```

### 1.6.2 Git存储的使用

**1） 使用存储状态**

- 语法：

```
git stash list 		# 查看当前Git中存储的所有状态
git stath 			# 将当前状态保存
git stash apply {stashName}		# 根据存储名称读取Git存储
git stash drop {stashName}		# 根据存储名称删除Git存储
```

【使用Git存储将当前状态存储起来】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看当前Git存储列表，发现列表为空
$ git stash list

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 使用Git存储
$ git stash
warning: LF will be replaced by CRLF in aaa.txt.
The file will have its original line endings in your working directory
Saved working directory and index state WIP on b1: 01ca592 222-b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git stash list
stash@{0}: WIP on b1: 01ca592 222-b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 使用Git将当前状态存储起来后，文件内容变为了未更改前的内容
$ cat aaa.txt
111-master
111-b1
222-b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 再次查看git的状态，发现工作空间正常
$ git status
On branch b1
nothing to commit, working tree clean

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 查看日志，发现使用Git存储也会产生一次日志
$ git log --oneline --graph --all
*   082f406 (refs/stash) WIP on b1: 01ca592 222-b1
|\
| * c613227 index on b1: 01ca592 222-b1
|/
* 01ca592 (HEAD -> b1) 222-b1
* 1337456 111-b1
* f828bbd (master) 111-master

```

【当前状态被Git存储了，当前的工作空间也是正常的，因此可以切换到其他分支继续操作】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 切换分支到master
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查看master分支的内容
$ cat aaa.txt
111-master

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ echo "222-master" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		
$ git commit -m '222-master' ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --graph --all
* 4974e13 (HEAD -> master) 222-master
| *   082f406 (refs/stash) WIP on b1: 01ca592 222-b1
| |\
| | * c613227 index on b1: 01ca592 222-b1
| |/
| * 01ca592 (b1) 222-b1
| * 1337456 111-b1
|/
* f828bbd 111-master

```

**2） 读取存储状态**

等到"临时任务"处理完后，我们可以切换回test分支，并将上一次使用Git存储的状态读取出来

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)			# 切换回b1分支
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)				# 查看文件内容，依旧是没有编辑前的状态
$ cat aaa.txt
111-master
111-b1
222-b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)				# 查看Git存储的状态
$ git stash list
stash@{0}: WIP on b1: 01ca592 222-b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)				# 读取状态
$ git stash apply stash@{0}
On branch b1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")			# 读取成功后回到我们当初的状态（当前工作空间未提交）

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)				# 查看文件内容，将文件内容还原回来了
$ cat aaa.txt
111-master
111-b1
222-b1
333-b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git commit -m "333-b1" ./
[b1 1f0ebea] 333-b1
 1 file changed, 1 insertion(+)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git log --oneline --graph --all
* 1f0ebea (HEAD -> b1) 333-b1
| * 4974e13 (master) 222-master
| | * 082f406 (refs/stash) WIP on b1: 01ca592 222-b1
| |/|
|/| |
| | * c613227 index on b1: 01ca592 222-b1
| |/
|/|
* | 01ca592 222-b1
* | 1337456 111-b1
|/
* f828bbd 111-master

```

**3） 存储状态的删除**

Git存储被读取之后状态并不会被删除，我们可以手动删除存储状态

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 查看Git存储状态，发现依旧存在
$ git stash list
stash@{0}: WIP on b1: 01ca592 222-b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 手动删除状态
$ git stash drop stash@{0}
Dropped stash@{0} (082f40626ab35cf6b1bd413e634e0a1a946824aa)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 查看Git存储的状态，发现没有了
$ git stash list

```

### 1.6.3 Git存储的原理

- 使用Git存储：

Git存储的原理其实是在使用git stash命令后，Git直接将当前工作状态的更改添加到暂存区，然后提交，中途生成了Blob对象、Tree对象、Commit对象等三个对象；其中Commit对象会生成2次，第一次指向原来的Tree对象，第二次指向新的Tree对象，之后再将暂存区改回原来的样子（执行git stash命令之前的样子）

由于当前工作空间的操作均已提交，因此当前工作空间的状态自然为nothing to commit，然后就可以切换到其他分支了；

当使用git stash命令以后，会产生两个Commit对象，其还会再.git/refs/目录创建一个名为stash的文件，该文件保存着最新Commit对象的hash值；

![](././5e592075aa4a980d30c1fc15dce10c5a.png)

- 读取Git存储状态的原理：

当使用git stash apply {stashName}命令读取Git存储状态时，其底层其实就是读取到stash文件中的Commit对象，通过该Commit对象找到执行git stash命令后生成的Blob对象，读取该Blob对象的内容写入当前工作空间，达到还原工作空间的目的。

- 删除Git存储状态的原理：

在Git日志中查询不到了，然后将git/refs/stash文件删除掉

【准备环境】

```
rm -rf ./* .git
git init
echo '111' >> aaa.txt
git add ./
git commit -m "111" ./
git branch b1
git checkout b1

.git/objects/8f/96f2f60c766a6a6b78591e06e6c1529c0ad9af
$ find .git/objects/ -type f
.git/objects/58/c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c			# Blob对象
.git/objects/7d/811c6d8fa7794fc7a0a2371a4cf197e8cfb47d			# Commit对象
.git/objects/8f/96f2f60c766a6a6b78591e06e6c1529c0ad9af			# Tree对象

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 查看当前暂存区
$ git ls-files -s
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git log --oneline --all --graph
* 7d811c6 (HEAD -> b1, master) 111

```

**1） 使用存储状态的原理**

【编辑文件】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ echo "222" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git status
On branch b1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")


Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 使用Git存储
$ git stash
warning: LF will be replaced by CRLF in aaa.txt.
The file will have its original line endings in your working directory
Saved working directory and index state WIP on b1: 7d811c6 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git ls-files -s
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 暂存区没有变化
$ git cat-file -p 58c9bdf9
111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ find .git/objects/ -type f
.git/objects/58/c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c			# Blob对象.v1
.git/objects/70/3a3923a3f4d516543ba3e6e9182467f31b328c			# Tree对象.v2
.git/objects/7d/811c6d8fa7794fc7a0a2371a4cf197e8cfb47d			# Commit对象.v1
.git/objects/8f/96f2f60c766a6a6b78591e06e6c1529c0ad9af			# Tree对象.v1
.git/objects/99/11efb0f75f3280b2e8581bd83724e9a7a10528			# Commit对象.v2
.git/objects/a3/0a52a3be2c12cbc448a5c9be960577d13f4755			# Blob对象.v2
.git/objects/b3/e1f5cd5d92a906cff3dfc4816d6e22c72afffe			# Commit对象.v3

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看stash文件，保存的是最新Commit对象的hash值
$ cat .git/refs/stash
b3e1f5cd5d92a906cff3dfc4816d6e22c72afffe

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看Blob对象.v2
$ git cat-file -p a30a52a3be2c12cbc448a5c9be960577d13f4755
111
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看Tree对象.v2
$ git cat-file -p 703a3923a3f4d516543ba3e6e9182467f31b328c
100644 blob a30a52a3be2c12cbc448a5c9be960577d13f4755    aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看Commit对象.v2
$ git cat-file -p 9911efb0f75f3280b2e8581bd83724e9a7a10528
tree 8f96f2f60c766a6a6b78591e06e6c1529c0ad9af		# 包裹的是原来的Tree对象（v1版本）
parent 7d811c6d8fa7794fc7a0a2371a4cf197e8cfb47d		# 指向的是Commit对象.v1
author xiaohui <xiaohui@aliyun.com> 1697278938 +0800
committer xiaohui <xiaohui@aliyun.com> 1697278938 +0800

index on b1: 7d811c6 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看Commit对象.v3
$ git cat-file -p b3e1f5cd5d92a906cff3dfc4816d6e22c72afffe
tree 703a3923a3f4d516543ba3e6e9182467f31b328c		# 包裹的是新的Tree对象(v3)
parent 7d811c6d8fa7794fc7a0a2371a4cf197e8cfb47d		# 指向Commit对象.v1
parent 9911efb0f75f3280b2e8581bd83724e9a7a10528		# 指向Commit对象.v2
author xiaohui <xiaohui@aliyun.com> 1697278938 +0800
committer xiaohui <xiaohui@aliyun.com> 1697278938 +0800

WIP on b1: 7d811c6 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看日志，发现生成了两个Commit对象
$ git log --oneline --all --graph
*   b3e1f5c (refs/stash) WIP on b1: 7d811c6 111		# Commit对象.v3
|\
| * 9911efb index on b1: 7d811c6 111				# Commit对象.v2
|/
* 7d811c6 (HEAD -> b1, master) 111					# HEAD指针还是指向b1

```

**2） 读取存储状态的原理**

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 由于当前是Git
$ git checkout master
Switched to branch 'master'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)			# 读取Git存储
$ git stash apply stash@{0}
On branch b1
Changes not staged for commit:		
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")		# 工作空间状态恢复成原来的状态了

```

**3） 删除存储状态的原理**

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git stash list
stash@{0}: WIP on b1: 7d811c6 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 删除Git存储状态
$ git stash drop stash@{0}
Dropped stash@{0} (b3e1f5cd5d92a906cff3dfc4816d6e22c72afffe)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 发现stash文件已经被删除
$ ll .git/refs/
total 0
drwxr-xr-x 1 Adminstrator 197121 0 Oct 14 18:22 heads/
drwxr-xr-x 1 Adminstrator 197121 0 Oct 14 18:20 tags/

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git log --oneline --all --graph
* 7d811c6 (HEAD -> b1, master) 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ find .git/objects/ -type f
.git/objects/58/c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c			# Blob对象.v1
.git/objects/70/3a3923a3f4d516543ba3e6e9182467f31b328c			# Tree对象.v2
.git/objects/7d/811c6d8fa7794fc7a0a2371a4cf197e8cfb47d			# Commit对象.v1
.git/objects/8f/96f2f60c766a6a6b78591e06e6c1529c0ad9af			# Tree对象.v1
.git/objects/99/11efb0f75f3280b2e8581bd83724e9a7a10528			# Commit对象.v2
.git/objects/a3/0a52a3be2c12cbc448a5c9be960577d13f4755			# Blob对象.v2
.git/objects/b3/e1f5cd5d92a906cff3dfc4816d6e22c72afffe			# Commit对象.v3

```

## 1.7 Git打标签

### 1.7.1 标签的语法与介绍

像其他版本控制系统（VCS）一样，Git 可以给仓库历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（ `v1.0` 、 `v2.0` 等等）。

- 创建标签：

```
git tag {tagName}						# 以当前状态创建标签	（轻量标签）
git tag {tagName} {commitHash}			# 以指定的提交对象来创建标签（轻量标签）

git tag {tagName} {commitHash} -m {注释}		# 以当前状态创建标签	（附注标签）
git tag {tagName} {commitHash} -m {注释}		# 以指定的提交对象来创建标签（附注标签）

```

- 查看标签：

```
git tag						# 查看所有标签
git show {tagName}			# 查看特定标签
```

- 删除标签：

```
git tag -d {tagName}
```

- 检出标签：

```
git checkout {tagName}						# 检出到指定标签位置，会出现"头指针分离"现象
git checkout -b {branchName} {tagName}		# 检出到指定标签位置，并在此位置创建分支
```

Git 支持两种标签：轻量标签（lightweight）与附注标签（annotated）。

- 轻量标签：轻量标签指向某个版本的提交对象的hash值；
- 附注标签：会在Git数据库中创建一个全新的Git对象——tag对象，该tag对象保存了这个版本的提交对象的hash值，同时还存储了一些有关于tag本身的日志信息；

创建好的标签存储在.git/refs/tags目录；

### 1.7.2 标签的使用

【初始化版本库】

```
rm -rf ./* .git
git init
echo "111" >> aaa.txt
git add ./
git commit -m '111' ./
echo "222" >> aaa.txt
git add ./
git commit -m '222' ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline
794c1a9 (HEAD -> master) 222
a25c873 111

```

【创建标签】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查看当前有多少标签
$ git tag

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 创建一个附注标签
$ git tag v1.0 -m "这是我的1.0版本"

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查看标签
$ git tag
v1.0

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查看日志
$ git log --oneline
794c1a9 (HEAD -> master, tag: v1.0) 222
a25c873 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 创建一个轻量标签
$ git tag v1.2

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查看标签
$ git tag
v1.0
v1.2

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 查看日志
$ git log --oneline
794c1a9 (HEAD -> master, tag: v1.2, tag: v1.0) 222
a25c873 111

```

查看`.git/refs/tags`目录：

![](././90a12676825e21a1685f0d0f57531749.png)

v1.0是一个附注标签，创建附注标签时会创建一个新的tag对象，该tag对象保存了所引用的提交对象hash值即一些其他日志信息；

v1.2是一个轻量标签，创建轻量标签时并不会创建一个tag对象，仅仅是将这个表情所指向的提交对象的hash值保存下来；

查看轻量标签和附注标签的内容：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ ll .git/refs/tags/
total 2
-rw-r--r-- 1 Adminstrator 197121 41 Oct 16 15:38 v1.0			# 创建了两个标签文件
-rw-r--r-- 1 Adminstrator 197121 41 Oct 16 15:38 v1.2

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# v1.0（附注标签）保存的是tag对象的hash值
$ cat .git/refs/tags/v1.0
8223942a63f358c9f958d39c06f85a7837a29526

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# v1.2（轻量标签）保存的是提交对象的hash值
$ cat .git/refs/tags/v1.2
794c1a9c132d391e31dfd3c37b16aa948c46d3b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 是一个tag对象
$ git cat-file -t 8223942a63f358c9f958d39c06f85a7837a29526
tag

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 是一个commit对象
$ git cat-file -t 794c1a9c132d391e31dfd3c37b16aa948c46d3b1
commit

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 轻量标签的内容（就是一个提交对象）
$ git cat-file -p 8223942a63f358c9f958d39c06f85a7837a29526
object 794c1a9c132d391e31dfd3c37b16aa948c46d3b1
type commit
tag v1.0
tagger xiaohui <xiaohui@aliyun.com> 1697441891 +0800

这是我的1.0版本

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)		# 附注标签的内容
$ git cat-file -p 794c1a9c132d391e31dfd3c37b16aa948c46d3b1
tree 703a3923a3f4d516543ba3e6e9182467f31b328c
parent a25c8731c03a7c07dc574d8809f6ad7a69c09f27
author xiaohui <xiaohui@aliyun.com> 1697441871 +0800
committer xiaohui <xiaohui@aliyun.com> 1697441871 +0800

222

```

【查看标签】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)			# 查看v1.0标签(附注标签)
$ git show v1.0
tag v1.0
Tagger: xiaohui <xiaohui@aliyun.com>
Date:   Mon Oct 16 15:38:11 2023 +0800

这是我的1.0版本

commit 794c1a9c132d391e31dfd3c37b16aa948c46d3b1 (HEAD -> master, tag: v1.2, tag: v1.0)
Author: xiaohui <xiaohui@aliyun.com>
Date:   Mon Oct 16 15:37:51 2023 +0800

    222

diff --git a/aaa.txt b/aaa.txt
index 58c9bdf..a30a52a 100644
--- a/aaa.txt
+++ b/aaa.txt
@@ -1 +1,2 @@
 111
+222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)			# 查看v1.2标签（轻量标签）
$ git show v1.2
commit 794c1a9c132d391e31dfd3c37b16aa948c46d3b1 (HEAD -> master, tag: v1.2, tag: v1.0)
Author: xiaohui <xiaohui@aliyun.com>
Date:   Mon Oct 16 15:37:51 2023 +0800

    222

diff --git a/aaa.txt b/aaa.txt
index 58c9bdf..a30a52a 100644
--- a/aaa.txt
+++ b/aaa.txt
@@ -1 +1,2 @@
 111
+222

```

【使用master分支继续开发】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ echo "333" >> ccc.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git add ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git commit -m '333' ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all
472d1e1 (HEAD -> master) 333
794c1a9 (tag: v1.2, tag: v1.0) 222
a25c873 111

```

【检出标签】

如果你想查看某个标签所指向的文件版本，可以使用 `git checkout` 命令， 虽然这会使你的仓库处于“分离头指针（detached HEAD）”的状态——这个状态有些不好的副作用：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git log --oneline --all
472d1e1 (HEAD -> master) 333
794c1a9 (tag: v1.2, tag: v1.0) 222
a25c873 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (master)
$ git checkout v1.0
Note: switching to 'v1.0'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 794c1a9 222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((v1.0))		# 记得使用-all，不然不会显示HEAD之后的内容
$ git log --oneline --all
472d1e1 (master) 333
794c1a9 (HEAD, tag: v1.2, tag: v1.0) 222		# HEAD指针指向的位置并没有指针
a25c873 111

```

在“分离头指针”状态下，如果你做了某些更改然后提交它们，标签不会发生变化， 但你的新提交将不属于任何分支，并且将无法访问，除非通过确切的提交哈希才能访问。 因此，如果你需要进行更改，比如你要修复旧版本中的错误，那么通常需要创建一个新分支：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((v1.0))
$ git log --oneline --all
472d1e1 (master) 333
794c1a9 (HEAD, tag: v1.2, tag: v1.0) 222
a25c873 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((v1.0))		# 查看当前HEAD指针位置的工作空间内容，发现并没有333
$ cat aaa.txt
111
222

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((v1.0))		# 追加内容1010
$ echo "1010" >> aaa.txt

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((v1.0))
$ git commit -m "1010" ./

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((830c1d5...))
$ git log --oneline --all --graph
* 830c1d5 (HEAD) 1010
| * 472d1e1 (master) 333
|/
* 794c1a9 (tag: v1.2, tag: v1.0) 222
* a25c873 111

```

【在当前位置创建分支】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((830c1d5...))
$ git branch b1

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((830c1d5...))		# 在当前位置创建b1指针，但HEAD指针并没有执行b1
$ git log --oneline --all --graph
* 830c1d5 (HEAD, b1) 1010
| * 472d1e1 (master) 333
|/
* 794c1a9 (tag: v1.2, tag: v1.0) 222
* a25c873 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace ((830c1d5...))		# 切换到b1分支
$ git checkout b1
Switched to branch 'b1'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git log --oneline --all --graph
* 830c1d5 (HEAD -> b1) 1010
| * 472d1e1 (master) 333
|/
* 794c1a9 (tag: v1.2, tag: v1.0) 222
* a25c873 111

```

【检出标签创建分支】

为了避免出现"分离头指针"现象，因此在检出标签时通常会创建一个新的分支：

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)
$ git log --oneline --all --graph
* 830c1d5 (HEAD -> b1) 1010
| * 472d1e1 (master) 333
|/
* 794c1a9 (tag: v1.2, tag: v1.0) 222
* a25c873 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 查看所有标签
$ git tag
v1.0
v1.2

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b1)		# 检出到v1.2标签，并且在这个位置创建一个新的分支
$ git checkout -b b2 v1.2
Switched to a new branch 'b2'

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b2)
$ git log --oneline --all --graph
* 830c1d5 (b1) 1010
| * 472d1e1 (master) 333
|/
* 794c1a9 (HEAD -> b2, tag: v1.2, tag: v1.0) 222		# HEAD指针指向b2分支了
* a25c873 111

```

【删除标签】

```
Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b2)		# 查看当前所有标签
$ git tag
v1.0
v1.2

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b2)		# 删除v1.0标签
$ git tag  -d v1.0
Deleted tag 'v1.0' (was 8223942)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b2)		# 查看当前所有标签	
$ git tag
v1.2

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b2)		# 查看日志
$ git log --oneline --all --graph
* 830c1d5 (b1) 1010
| * 472d1e1 (master) 333
|/
* 794c1a9 (HEAD -> b2, tag: v1.2) 222							# 发现v1.0标签被删除了
* a25c873 111

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b2)		# 查看v1.2标签
$ git tag -d v1.2
Deleted tag 'v1.2' (was 794c1a9)

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b2)		# 查看当前所有标签	
$ git tag

Adminstrator@LAPTOP-OC90J78H MINGW64 ~/Desktop/workspace (b2)		# 查看日志
$ git log --oneline --all --graph
* 830c1d5 (b1) 1010
| * 472d1e1 (master) 333
|/
* 794c1a9 (HEAD -> b2) 222		# 发现v1.2标签也被删除了
* a25c873 111

```

# 第6章 [Git的分支状态存储](https://blog.csdn.net/Bb15070047748/article/details/139791345)

有时，当我们在项目的一部分上已经工作一段时间后，所有东西都进入了混乱的状态，而这时想要切换到另一个分支做一点别的事情，则必须将当前工作空间所做的操作提交到版本库，否则Git不允许切换分支。

当前的操作还不足以生成一次版本快照，此时我们就可以使用git stash命令，将当前工作状态存储起来，然后再切换到其他分支工作，最终工作完毕后切回当前分支，从Git存储中取出之前的工作内容。6.6 Git的分支状态存储
有时，当我们在项目的一部分上已经工作一段时间后，所有东西都进入了混乱的状态，而这时想要切换到另一个分支做一点别的事情，则必须将当前工作空间所做的操作提交到版本库，否则Git不允许切换分支。

当前的操作还不足以生成一次版本快照，此时我们就可以使用git stash命令，将当前工作状态存储起来，然后再切换到其他分支工作，最终工作完毕后切回当前分支，从Git存储中取出之前的工作内容。

## 1. git stash命令

git stash命令能够将当前工作目录中尚未提交的所有更改（包括暂存区和未暂存的修改）临时存储到stash堆栈中，从而让用户在不影响当前工作进度的前提下，轻松切换到其他分支处理问题、合并代码或恢复到干净的工作状态。

**git stash命令的语法如下表所示。**

| 命令                                      | 说明                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| git stath                                 | 将当前工作空间的状态保存                                     |
| git stash list                            | 查看当前Git中存储的所有状态                                  |
| git stash apply {stashName}               | 根据存储名称读取Git存储                                      |
| git stash drop {stashName}                | 根据存储名称删除Git存储                                      |
| git stash save                            | “日志信息”	将当前工作空间的状态保存并指定一个日志信息     |
| git stash pop                             | 读取stash堆栈中的第一个存储，并将该存储从stash堆栈中移除     |
| git stash show [-p] {stashName}           | 查看指定存储与未建立存储时的差异 -p：显示详细差异            |
| git stash branch {branchName} [stashName] | 创建并切换到一个新分支来读取指定的存储 stashName：存储的名称，默认情况下读取stash堆栈中栈顶的存储 |

## 2 Git存储的基本使用

接下来我们通过案例来演示一下`git stash`命令的应用场景和使用方法。

**1.  搭建测试环境**

（1）初始化项目环境。

```
rm -rf ./* .git
git init
echo '111-master' >> aaa.txt
git add ./
git commit -m '111-master' ./

git checkout -b b1
echo '111-b1' >> aaa.txt
git commit -m '111-b1' ./

echo '222-b1' >> aaa.txt
git commit -m '222-b1' ./

git log --oneline --graph --all
* 8d562c8 (HEAD -> b1) 222-b1		# b1的位置
* 8f29a61 111-b1
* 07f58ec (master) 111-master		# master的位置


```

（2）编辑文件，编辑完了后还不想提交，此时接收到了新的"临时任务"，想要切换到其他分支继续操作，发现切换失败。

```
echo '333-b1' >> aaa.txt		# 编辑文件

git status				# 查看工作空间的状态
On branch b1
Changes not staged for commit:		# 有修改操作还未追踪
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")			

git checkout master		# 切换到master失败
error: Your local changes to the following files would be overwritten by checkout:
        aaa.txt
Please commit your changes or stash them before you switch branches.
Aborting

```

**2. 使用存储状态**

   （1）使用Git存储将当前状态存储起来。

```
   git stash list	# 查看当前Git存储列表，发现列表为空

   git stash		# 使用Git存储，将当前状态存储起来
   warning: LF will be replaced by CRLF in aaa.txt.
   The file will have its original line endings in your working directory
   Saved working directory and index state WIP on b1: 8d562c8 222-b1

   git stash list	# 查看当前Git存储列表
   stash@{0}: WIP on b1: 8d562c8 222-b1

   cat aaa.txt		# 使用Git将当前状态存储起来后，文件内容变为了未更改前的内容
   111-master
   111-b1
   222-b1

   git status		# 再次查看git的状态，发现工作空间正常
   On branch b1
   nothing to commit, working tree clean

   # 查看日志，发现使用Git存储也会产生日志,而且还产生了两个日志
   git log --oneline --graph --all
   *   082f406 (refs/stash) WIP on b1: 01ca592 222-b1
   |\
   | * c613227 index on b1: 01ca592 222-b1
   |/
   * 01ca592 (HEAD -> b1) 222-b1
   * 1337456 111-b1
   * f828bbd (master) 111-master


```

   （2）当前状态被Git存储了，所以当前的工作空间也是正常的，因此可以切换到其他分支继续操作。

```
   git checkout master			# 切换分支到master
   Switched to branch 'master'

   cat aaa.txt					# 查看master分支的内容
   111-master

   echo "222-master" >> aaa.txt
   git commit -m '222-master' ./

   git log --oneline --graph --all
   * 02e3139 (HEAD -> master) 222-master
   | *   36e214a (refs/stash) WIP on b1: 8d562c8 222-b1
   | |\
   | | * 8ba949c index on b1: 8d562c8 222-b1
   | |/
   | * 8d562c8 (b1) 222-b1
   | * 8f29a61 111-b1
   |/
   * 07f58ec 111-master


```

**3. 读取存储状态**

等到"临时任务"处理完后，我们可以切换回b1分支，并将上一次使用Git存储的状态读取出来，示例代码如下：

```
git checkout b1		# 切换回b1分支
cat aaa.txt			# 查看文件内容，依旧是没有编辑前的状态
111-master
111-b1
222-b1

git stash list		# 查看Git存储的状态
stash@{0}: WIP on b1: 8d562c8 222-b1

git stash apply stash@{0}		# 读取状态
On branch b1
Changes not staged for commit:		# 读取成功后回到我们当初的状态（有修改操作还未追踪）
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")			

cat aaa.txt		# 查看文件内容，将文件内容还原回来了
111-master
111-b1
222-b1
333-b1

git commit -m "333-b1" ./
git log --oneline --graph --all
* 1c951a1 (HEAD -> b1) 333-b1
| * 02e3139 (master) 222-master
| | * 36e214a (refs/stash) WIP on b1: 8d562c8 222-b1
| |/|
|/| |
| | * 8ba949c index on b1: 8d562c8 222-b1
| |/
|/|
* | 8d562c8 222-b1
* | 8f29a61 111-b1
|/
* 07f58ec 111-master


```

**4. 存储状态的删除**

Git存储被读取之后状态并不会被删除，我们可以手动删除存储状态，示例代码如下：

```
git stash list				# 查看Git存储状态，发现依旧存在
stash@{0}: WIP on b1: 8d562c8 222-b1

git stash drop stash@{0}	# 手动删除状态
Dropped stash@{0} (36e214a29ab7ac590b1c6089c9d25d4576affae6)

# 查看Git存储的状态，发现没有了
git stash list			

# 查看日志,日志也被整理了
git log --oneline --graph --all
* 1c951a1 (HEAD -> b1) 333-b1
* 8d562c8 222-b1
* 8f29a61 111-b1
| * 02e3139 (master) 222-master
|/
* 07f58ec 111-master


```

## 3. Git存储的其他用法

stash堆栈是一个典型的“栈”数据结构，栈的特点是先进后出，因此当stash堆栈中存储了多个状态时那么最先存进去的状态在最底部，最后存储的状态在最顶部，如图所示。

![](././d0dad4417e0b03edc6eeefde75c018f7.png)

接下来我们来学习一下Git存储关于查看存储状态、弹栈存储状态、基于存储创建分支等用法。为了方便测试，我们建立一个新的测试仓库来测试。

**1.搭建测试环境**

（1）建立测试仓库。

```
rm -rf ./* .git
git init
echo '111-master' >> aaa.txt
git add ./
git commit -m '111-master' ./

git checkout -b b1
echo '111-b1' >> aaa.txt
git commit -m '111-b1' ./

```

（2）使用状态存储，存储两个状态。

```
echo "222-b1" >> aaa.txt	# 编辑文件
git stash save "222-b1"		# 使用存储状态
git stash list				# 查看所有的存储状态
stash@{0}: On b1: 222-b1

git stash apply stash@{0}	# 应用存储状态
git stash list				# 应用了存储状态之后存储状态依然存在于stash堆栈中
stash@{0}: On b1: 222-b1

cat aaa.txt					# 工作空间的内容也变回来了
111-master
111-b1
222-b1

git commit -m '222-b1' ./	# 提交
git log --oneline --graph --all
* 8fd2fee (HEAD -> b1) 222-b1
| * 5af855e (refs/stash) On b1: 222-b1
|/|
| * a30270e index on b1: 627154a 111-b1
|/
* 627154a 111-b1
* 0398907 (master) 111-master

echo "333-b1" >> aaa.txt	# 编辑文件
git stash save "333-b1"		# 使用存储状态
git stash list				# 查看stash堆栈中所有的存储状态
stash@{0}: On b1: 333-b1	
stash@{1}: On b1: 222-b1


```

**2.查看存储状态**

stash是一个栈的数据结构，因此我们先存储进来的状态是在最底部，最顶部为最近一次存储进来的状态。

```
git stash show stash@{0}		# 查看stash@{0}存储状态
 aaa.txt | 1 +
 1 file changed, 1 insertion(+)	# 做了插入一行的操作

git stash show stash@{1}		# 查看stash@{1}存储状态
 aaa.txt | 1 +
 1 file changed, 1 insertion(+)	# 做了插入一行的操作

git stash show -p stash@{0}		# 查看stash@{0}存储状态的详细信息
diff --git a/aaa.txt b/aaa.txt
index 0dd56f7..b1f5002 100644
--- a/aaa.txt
+++ b/aaa.txt
@@ -1,3 +1,4 @@
 111-master
 111-b1
 222-b1
+333-b1					# 相比较没有使用存储状态之前新增了这一行

git stash show -p stash@{1}		# 查看stash@{1}存储状态的详细信息
diff --git a/aaa.txt b/aaa.txt
index cd728b7..0dd56f7 100644
--- a/aaa.txt
+++ b/aaa.txt
@@ -1,2 +1,3 @@
 111-master
 111-b1
+222-b1					# 相比较没有使用存储状态之前新增了这一行


```

**3. 弹栈stash**

使用git stash apply命令只是读取指定的状态，该状态并没有从stash堆栈中删除。如果想要使用状态后将其删除可以使用git stash pop命令。git stash pop命令总是读取stash堆栈顶部的状态，然后将其移除，示例代码如下：

```
git status		# 查看当前存储状态
On branch b1
nothing to commit, working tree clean

cat aaa.txt		# 当前工作空间的内容
111-master
111-b1
222-b1

git stash pop	# 使用弹栈stash,读取栈顶的存储状态并移除
On branch b1
Changes not staged for commit:	# 工作空间的状态变为了使用存储状态前的
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (33a16b3dce96cff4456ca0bd593d425572ecb19c)

cat aaa.txt		# 工作空间恢复了
111-master
111-b1
222-b1
333-b1

git stash list	# 查看存储状态,只剩一个了
stash@{0}: On b1: 222-b1

git commit -m '333-b1' ./
[b1 d202b34] 333-b1
 1 file changed, 1 insertion(+)


```

**4. 基于存储状态创建分支**

```
git log --oneline --all --graph
* d202b34 (HEAD -> b1) 333-b1
* 8fd2fee 222-b1
| * 5af855e (refs/stash) On b1: 222-b1
|/|
| * a30270e index on b1: 627154a 111-b1
|/
* 627154a 111-b1
* 0398907 (master) 111-master

git stash list			# 只有一个分支状态
stash@{0}: On b1: 222-b1

# 将stash顶部的状态弹出,基于该状态创建一个分支,并切换到该分支
git stash branch test stash@{0}		
Switched to a new branch 'test'
On branch test
Changes not staged for commit:		# test分支
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

cat aaa.txt
111-master
111-b1
222-b1

git stash list			# 已经没有了任何的状态

git log --oneline --all --graph
* d202b34 (b1) 333-b1
* 8fd2fee 222-b1
* 627154a (HEAD -> test) 111-b1		# 已经切换test分支了
* 0398907 (master) 111-master



```

## 4.  Git存储与暂存区

我们之前测试的操作都是未添加到暂存区的操作然后使用git stash将其存储起来，实际上，就算是某个操作已经添加到暂存区了也可以使用Git存储将其存储起来，然后工作空间变为“noting to commit”状态。

需要注意的是，使用git stash命令将当前状态存储起来后虽然可以将当前工作空间的暂存区变为“noting to commit”状态，但是后期将该存储读取出来后，暂存区并不会回到之前的状态。

我们通过一个实际案例来演示一遍。

（1）创建一个新的测试仓库。

```
git log --oneline --all
38124a1 (HEAD -> master, b1) 111


```

（2）编辑操作，然后将操作添加到暂存区，最后使用git stash命令将当前状态存储起来。

```
echo "222" >> aaa.txt		# 编辑文件
git add ./					# 添加到暂存区
git status					# 查看当前工作空间的状态
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   aaa.txt

git ls-files -s				# 查看暂存区的内容
100644 a30a52a3be2c12cbc448a5c9be960577d13f4755 0       aaa.txt

# 查看该Blob对象的内容
git cat-file -p a30a52a3be2c12cbc448a5c9be960577d13f4755
111
222

git stash save 'master-222'	# 使用Git状态存储，将当前状态存储起来
git status					# 查看当前工作空间的状态		
On branch master
nothing to commit, working tree clean

git ls-files -s
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt

# 查看暂存区的内容,发现暂存区的内容回到了没有编辑前的状态
git cat-file -p 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c
111


```

（3）读取状态，然后查看暂存区的内容，发现并没有回到使用git stash命令前的状态。

```
git stash pop				# 获取顶部的存储状态
# 工作空间变为了"Changes not staged for commit"而不是"Changes to be committed"
# 意味着没有该操作没有添加到暂存区
On branch master			
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

cat aaa.txt					# 查看工作空间的状态(已经回到了使用git stash命令之前的状态)
111
222

git ls-files -s				# 查看暂存区的内容
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt

# 查看该文件的内容，发现并没有回到使用git stash命令前的状态
git cat-file -p 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c
111


```

## 5. Git存储的原理

**1. 使用Git存储**

在使用git stash命令后，Git直接将当前工作空间的更改添加到暂存区，然后提交。中途生成了Blob对象、Tree对象、Commit对象等三类对象，用于存储在执行stash命令之前对工作空间的修改。

其中Commit对象会生成2次，第1次指向原来的Tree对象，即没有执行stash之前的Tree对象。第2次指向新的Tree对象，即执行了stash命令之后的Tree对象。之后再将暂存区改回原来的样子（执行git stash命令之前的样子）。在这个过程中，Blob对象生成了1个，Tree对象生成了1个，Commit对象生成了2个。

由于当前工作空间的操作均已提交，因此当前工作空间的状态自然为nothing to commit状态，然后就可以切换到其他分支了。

当使用git stash命令以后，会产生两个Commit对象，其还会在.git/refs/目录创建一个名为stash的文件，该文件保存着最新Commit对象的hash值（执行git stash命令后生成的那个新Commit对象），如下图所示。
![](././684c40d7bdcdf403e82000663eb9805b.png)

读取Git存储状态的原理
当使用git stash apply {stashName}或git stash pop命令读取Git存储状态时，其底层其实就是读取到stash文件中的Commit对象，通过该Commit对象找到执行git stash命令后生成的Blob对象，读取该Blob对象的内容写入当前工作空间，达到还原工作空间的目的。

删除Git存储状态的原理
整理Git提交日志（在Git日志中查询不到了），然后将git/refs/stash文件删除掉。

下面我们通过代码来实际演示一下git stash命令的工作原理。

（1）创建一个初始仓库

```
rm -rf ./* .git
git init
echo '111' >> aaa.txt
git add ./
git commit -m "111" ./
git checkout -b b1

find .git/objects/ -type f			# 查看所有的Git对象
.git/objects/58/c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c			# Blob对象
.git/objects/7d/811c6d8fa7794fc7a0a2371a4cf197e8cfb47d			# Commit对象
.git/objects/8f/96f2f60c766a6a6b78591e06e6c1529c0ad9af			# Tree对象

git ls-files -s						# 查看当前暂存区
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt

git log --oneline --all --graph		# 查看提交日志
* 7d811c6 (HEAD -> b1, master) 111


```

（2）使用存储状态的原理

编辑文件，使用stash命令观察效果，示例代码如下：

```
echo "222" >> aaa.txt
git status
On branch b1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")

git stash					# 使用Git存储
git ls-files -s
100644 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c 0       aaa.txt

git cat-file -p 58c9bdf9	# 暂存区没有变化
111

find .git/objects/ -type f
.git/objects/58/c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c			# Blob对象.v1
.git/objects/70/3a3923a3f4d516543ba3e6e9182467f31b328c			# Tree对象.v2
.git/objects/7d/811c6d8fa7794fc7a0a2371a4cf197e8cfb47d			# Commit对象.v1
.git/objects/8f/96f2f60c766a6a6b78591e06e6c1529c0ad9af			# Tree对象.v1
.git/objects/99/11efb0f75f3280b2e8581bd83724e9a7a10528			# Commit对象.v2
.git/objects/a3/0a52a3be2c12cbc448a5c9be960577d13f4755			# Blob对象.v2
.git/objects/b3/e1f5cd5d92a906cff3dfc4816d6e22c72afffe			# Commit对象.v3

cat .git/refs/stash			# 查看stash文件，保存的是最新Commit对象(v3)的hash值
b3e1f5cd5d92a906cff3dfc4816d6e22c72afffe

git cat-file -p a30a52a		# 查看Blob对象.v2
111								
222

git cat-file -p 703a3923a3f4d516543ba3e6e9182467f31b328c		# 查看Tree对象.v2
100644 blob a30a52a3be2c12cbc448a5c9be960577d13f4755    aaa.txt

git cat-file -p 9911efb0f75f3280b2e8581bd83724e9a7a10528		# 查看Commit对象.v2
tree 8f96f2f60c766a6a6b78591e06e6c1529c0ad9af		# 包裹的是原来的Tree对象（v1版本）
parent 7d811c6d8fa7794fc7a0a2371a4cf197e8cfb47d		# 父提交对象是Commit对象.v1
author xiaohui <xiaohui@aliyun.com> 1697278938 +0800
committer xiaohui <xiaohui@aliyun.com> 1697278938 +0800

index on b1: 7d811c6 111

git cat-file -p b3e1f5cd5d92a906cff3dfc4816d6e22c72afffe		# 查看Commit对象.v3
tree 703a3923a3f4d516543ba3e6e9182467f31b328c		# 包裹的是新的Tree对象(v2)
parent 7d811c6d8fa7794fc7a0a2371a4cf197e8cfb47d		# 指向Commit对象.v1
parent 9911efb0f75f3280b2e8581bd83724e9a7a10528		# 指向Commit对象.v2
author xiaohui <xiaohui@aliyun.com> 1697278938 +0800
committer xiaohui <xiaohui@aliyun.com> 1697278938 +0800

WIP on b1: 7d811c6 111

git log --oneline --all --graph						# 查看日志，发现生成了两个Commit对象
*   b3e1f5c (refs/stash) WIP on b1: 7d811c6 111		# Commit对象.v3
|\
| * 9911efb index on b1: 7d811c6 111				# Commit对象.v2
|/
* 7d811c6 (HEAD -> b1, master) 111					# HEAD指针还是指向b1


```

（3）读取存储状态的原理

执行如下代码观察效果：

```
git checkout master		# 由于当前是Git的工作空间状态为"所有操作均已提交",因此可以切换到master分支
git checkout b1			# 重新切换到b1分支

git stash apply stash@{0}		# 读取Git存储
On branch b1

cat aaa.txt		# 实质上就是把Blob.v2的内容读取到工作空间中来
111						
222

git status
Changes not staged for commit:		
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   aaa.txt

no changes added to commit (use "git add" and/or "git commit -a")		# 工作空间状态恢复成原来的状态了


```

（4）删除存储状态的原理

执行如下代码观察效果：

```
git stash list						# 查看所有Git存储
stash@{0}: WIP on b1: 7d811c6 111

git stash drop stash@{0}			# 删除Git存储状态
Dropped stash@{0} (b3e1f5cd5d92a906cff3dfc4816d6e22c72afffe)

ll .git/refs/						# 发现stash文件已经被删除
total 0
drwxr-xr-x 1 Adminstrator 197121 0 Oct 14 18:22 heads/
drwxr-xr-x 1 Adminstrator 197121 0 Oct 14 18:20 tags/

git log --oneline --all --graph		# 查看提交日志
* 7d811c6 (HEAD -> b1, master) 111

find .git/objects/ -type f			# 查看所有Git对象
.git/objects/58/c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c			# Blob对象.v1
.git/objects/70/3a3923a3f4d516543ba3e6e9182467f31b328c			# Tree对象.v2
.git/objects/7d/811c6d8fa7794fc7a0a2371a4cf197e8cfb47d			# Commit对象.v1
.git/objects/8f/96f2f60c766a6a6b78591e06e6c1529c0ad9af			# Tree对象.v1
.git/objects/99/11efb0f75f3280b2e8581bd83724e9a7a10528			# Commit对象.v2
.git/objects/a3/0a52a3be2c12cbc448a5c9be960577d13f4755			# Blob对象.v2
.git/objects/b3/e1f5cd5d92a906cff3dfc4816d6e22c72afffe			# Commit对象.v3


```

# 第7章 冲突提交

实际单个模块的开发往往不是单独一个人来进行操作，当多个人协同开发相同的一个项目时，就会涉及到提交冲突的问题。

## 1. 不同人修改不同文件

（1）在远程仓库添加gitLab.txt

![1706146898301](././1706146898301.png)

（2）在本地IDEA中添加代码，继续进行第二个模块的开发

```java
public class Module2 {
    public static void main(String[] args) {
        System.out.println("开始进行模块2的开发");
    }
}
```

（3）提交代码到远程仓库，此时会有报错信息

![1705549702169](././1705549702169.png)

Git会智能识别，采用merge合并命令，拉取远端文件到本地进行合并。

（4）查看Git提交的全部历史记录，可以看到中间有拉取Gitee日志的部分

![1706146278780](././1706146278780.png)



## 2. 不同人修改同文件的不同区域

（1）远程仓库修改module1代码

```java
public class Module1 {
    public static void main(String[] args) {
        System.out.println("没完成模块1的开发");
    }
}
```

（2）本地IDEA继续添加代码

```java
//添加注释
public class Module1 {
    public static void main(String[] args) {
        System.out.println("完成模块1的开发");
    }
}
```

（3）提交代码，之后push到远程仓库

![1705550474743](././1705550474743.png)

同样可以采用merge命令，git会自动合并不同的区域代码。

![1706146956838](././1706146956838.png)

![1706146975271](././1706146975271.png)

## 3. 不同人修改同文件的相同区域

（1）远程仓库添加模块开发顺利

![1705551269043](././1705551269043.png)

（2）本地IDEA添加模块开发遇到了bug

```java
public class module1 {
    public static void main(String[] args) {
        System.out.println("完成第一个模块的开发");
        System.out.println("继续进行第一个模块的二次开发");
        System.out.println("模块开发继续!!!");
        System.out.println("模块开发遇到了bug!");
    }
}
```

![1705551516941](././1705551516941.png)

无法直接采用merge命令，需要人为判断哪些作为最终的结果来保留

（3）之后需要重新提交到远程仓库

![1705551702149](././1705551702149.png)



## 4. 同时变更文件名和文件内容

（1）本地IDEA修改原先的文件名称为Module1plus，之后重新开发实现功能

```java
//添加注释
public class Module1plus {
    public static void main(String[] args) {
        System.out.println("没完成模块1的开发");
        System.out.println("模块1的开发遇到了bug");
        System.out.println("完成了模块1的开发");
        System.out.println("进一步完成了模块1的拓展开发");
    }
}
```

（3）提交代码修改到远程仓库

![1705552452300](././1705552452300.png)

可以直接提交成功。

## 5. 不同人把同一文件改成不同的文件名

（1）远程仓库把文件名称改为module1

（2）本地IDEA修改文件名称为module3

（3）提交到远程仓库

![1705552598042](././1705552598042.png)

（4）需要手动宣传使用哪一个

![1705552665960](././1705552665960.png)

push会导致报错，之后需要用户自己解决保留哪些文件。

（5）使用命令解决最终的冲突

```
C:\mybigdata\project\gitlab_demo>git status
#删除掉报红找不到的文件
C:\mybigdata\project\gitlab_demo>git rm src/main/java/com/atguigu/Module1Plus.java

```

（6）最后重新选择正确的代码提交到仓库

![1706151049392](././1706151049392.png)

# 

# 第8章 [VS Code 使用Git](https://zhuanlan.zhihu.com/p/658247945)，效率翻倍

官方文档：[在Visual Studio Code中使用Git进行源代码控制 --- Source Control with Git in Visual Studio Code](https://code.visualstudio.com/docs/sourcecontrol/overview#_viewing-diffs)

将 Git 和 VS Code 结合使用，以可视化方式更加轻松地进行代码管理、协作和追踪变更。不必依赖繁琐的命令行操作，VS Code 提供了直观的图形界面和扩展来简化 Git 的使用。本文来一起学习如何在 VS Code 中进行常见的 Git 可视化操作！

## 前置工作

在介绍如何在 VS Code 中使用 Git 之前，先来介绍一个强大的 VS Code 插件：Git Extension Pack，它旨在提供一组常用的 Git 工具和功能，以便更方便地进行[版本控制](https://zhida.zhihu.com/search?content_id=234406080&content_type=Article&match_order=1&q=%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6&zhida_source=entity)和协作开发。该插件包含了多个与 Git 相关的扩展：

- **Git History (git log**)：可以查看 Git 提交记录、文件或行的历史。通过该扩展，可以快速浏览项目的版本历史，查看每个提交包含的修改内容和作者信息，以及文件和行的详细变更情况。
- **Project Manager**：可以方便地在不同项目之间进行切换。这个扩展提供了一个[项目管理器](https://zhida.zhihu.com/search?content_id=234406080&content_type=Article&match_order=1&q=%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E5%99%A8&zhida_source=entity)，可以轻松地保存和加载不同的项目配置，快速切换工作环境。
- **GitLens**：增强了 Visual Studio Code 内置的 Git 功能。它通过行内的 Git 责任注解和代码镜头，更好地了解代码的历史和作者信息。您可以方便地查看每行代码的最后修改者、最近的提交信息，甚至可以直接查看[远程仓库](https://zhida.zhihu.com/search?content_id=234406080&content_type=Article&match_order=1&q=%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93&zhida_source=entity)上的相关代码片段。
- **gitignore**：提供了对 `.gitignore` 文件的语言支持，让您能够更简单地管理和生成这个文件。同时，还可以从 GitHub 的存储库中获取常见的 `.gitignore` 文件模板，以便快速忽略项目中不需要跟踪的文件和文件夹。
- **Open in GitHub / Bitbucket / http://VisualStudio.com**：提供了在 GitHub、Bitbucket 或 [http://VisualStudio.com](https://link.zhihu.com/?target=http%3A//VisualStudio.com) 中直接跳转到代码的功能。通过单击相应的链接，可以快速打开相关代码仓库，并跳转到指定的行号或文件位置。

一个插件囊括了五个热门插件的全部功能！

![](././v2-842dc3db54cd5fc885f247c5eb37b3c2_1440w.png)



 安装完成之后，就来看看如何在 VS Code 中可视化使用 Git。

当新打开一个 VS Code 窗口时，需要打开一个项目，可以在本地文件打开项目，也可以直接从远程仓库克隆项目：

![](././v2-b1353d15cc83029227bfc45fc2eedb77_1440w.png)



当选择从远程克隆仓库时，输入远程仓库地址，按下回车即可：

![](././v2-46366b868acbe43183999a2697bee195_1440w.png)

这里可以输入 Git 链接来克隆，可以是 Github、Gitlab、GItee，或者私有部署的 Git 仓库链接。也可以选择从 Github 远程仓库克隆，只需登录 Github，输入查找自己的仓库，然后进行克隆即可。

克隆完成之后，会将文件存储在本地，直接打开即可。

## git clone

在 Git 中，分支允许同时处理[代码库](https://zhida.zhihu.com/search?content_id=234406080&content_type=Article&match_order=1&q=%E4%BB%A3%E7%A0%81%E5%BA%93&zhida_source=entity)的多个版本。可以在源代码管理边栏的最下面看到当前所在的分支：

![](././v2-4764f180d9ca690900b69b7e0d8f39e6_1440w.png)



## git branch

如果这个分支没有变动，只会显示一个分支名，如果有修改，分支名的右上角会有一个 `*`，就像这样：

![](././v2-2929814d8c095d868de055732c287276_1440w.png)

要想切换分支，需要点击这个分支名称，就会出现所有分支的列表：

![](././v2-152111fdb12826f7a920972340d29e7a_1440w.png)

可以看到，这里面有两类分支，一类是带分支图标的，另一类是带云图标的。前者表示本地分支，后者表示远程分支。点击本地分支，就会切换到对应的分支，点击远程分支，就会远程分支同步到本地，并在本地创建一个同名的分支。

如果想重命名分支，可以执行以下操作：

![](././v2-53b125d29affe63bba3d28c928ea42f6_1440w.png)

点击之后，输入新的分支名即可。

如果分支不需要了，也可以删除分支，不过需要注意，如果想删除某个分支，需要先切换到别的分支。

![](././v2-4b46d22813927361e0152a0cc48e536a_1440w.png)

点击删除分支，然后选择要删除的分支即可。

## git rebase

可以按照以下步骤来执行变基操作：

![](././v2-416754877bf37f3414e83b1b9d8f94cc_1440w.png)

## git checkout

最上面有两个分支创建操作，第一个是从当前分支创建一个新分支，输入新分支名即可创建。第二个是从指定分支创建一个新分支，需要先选取从哪个分支创建，然后输入新分支名即可：

![](././v2-65d66e8c804261eb62c79a53553c4e37_1440w.png)

如果是使用第一种方式来创建新分支，那当前分支的更改也会带到新分支上。

## git merge

如果想要合并分支，可以执行以下操作：

![](././v2-b21343356ee70954d32711e163f9706d_1440w.png)

点击之后，需要选择从哪个分支向当前分支进行合并，选择被合并的分分支即可。

## git push

新创建的分支可以点击“**发布 Branch**”按钮来发布到远程仓库：

![](././v2-53ad0eff58bcee963067320d55a84611_1440w.png)

当我们进行代码的修改之后，在**源代码管理**边栏中可以看到更改的文件：

![](././v2-8cb3d52ad45fba7840d382096be8d1ea_1440w.png)



- 如果是删除某个文件，那在更改中显示的文件名上会有一个删除线，并且最后会有一个 `D` 标志，表示已删除；
- 如果是修改某个文件，那在更改中显示的文件名最后有个 `M` 标志，表示已修改，如果这个文件存在代码检查的错误，会在 `M` 前显示错误的数量，比如上面的 package.json 中就有 1 个错误。
- 如果是新增一个文件，那在更改中显示的文件名最后有个 `U` 标志，表示未跟踪的，因为是新增的文件，所以是未跟踪。



## git add

如果想暂存所有文件，可以鼠标悬浮在“更改”那一行，并点击后面的 ➕ 即可：

![](././v2-6d44cde8ce659ca40cc9362f34051944_1440w.png)



如果只是想暂存某些文件，可以鼠标悬浮在需要更改的文件名上，并点击后面的 ➕ 即可：

![](././v2-66f04989ed60b28c39bc3c03d24a65c7_1440w.png)

这个暂存操作就相当于执行 `git add` 命令。这里暂存其中两个，暂存完之后是这样的：

![](././v2-7ac57dc7613fa331642c9d1478cd8b7a_1440w.png)

## git reset

如果想取消更改，只需点击更改后面的撤销按钮（全部撤销）或者文件后面的撤销按钮（撤销单个）即可：

![](././v2-ee62002653d517cc4d3d94a754599b24_1440w.png)

## [git commit](https://zhida.zhihu.com/search?content_id=234406080&content_type=Article&match_order=1&q=git+commit&zhida_source=entity)

对于暂存的文件，可以进行commit 操作。只需在上面的输入框输入commit 信息，然后点击“提交”按钮即可：

![](././v2-4bec2de767e8698e7cf87f17e9bf340f_1440w.png)

对于未 commit 的文件，也是可以撤销的，只需点击暂存的更改那一行的➖或者需要撤销的文件后面的➖，点完之后，这些文件就会回到更改中，可以继续进行修改：

![](././v2-5052bf652485bb8fce04ffcf12f0f3d5_1440w.png)

## [git stash](https://zhida.zhihu.com/search?content_id=234406080&content_type=Article&match_order=1&q=git+stash&zhida_source=entity)

可以看到，无论是更改中，还是在暂存的更改中，都会有一个类似于撤回的按钮，比撤回按钮多了一个➕，这个按钮就是 stash 的意思，也就是把当前的修改暂存起来，然后在需要的时候取出来暂存的内容，以继续进行修改。当我们在开发一个需求过程中，需要紧急去别的分支进行操作，就可以先把已经更改的内容暂存起来，等再回来开发的时候，取出来这些内容，继续开发即可。

![](././v2-b9870efd6ffffc6d361bc30e5654dc4e_1440w.png)

这里我们将暂存的更改和更改都先暂存起来。可以选择弹出最新的（最后一次暂存）暂存，也可以选择性弹出暂存：

![](././v2-fedd0942ab0c2ad58d6c3d5d086a3811_1440w.png)

可以看到，**VS Code** 支持储藏暂存、应用暂存、弹出暂存、删除暂存。这里不再一一介绍。

值的注意是，在源代码管理边栏中，也可以点击最下面的**STASHES** 来查看已暂存的文件：

![](././v2-fccf812ef0fba235c23386f853788b3a_1440w.png)

这里，可以进行应用暂存、删除暂存、修改暂存名称等操作：

![](././v2-8cfdc14dfcf9ada174b49117894177e4_1440w.png)

## git push

当我们修改完代码之后，就需要推送代码到远程了，可以点击蓝色的同步更改按钮，也可以点击下面分支的更改按钮，来同步更改。

![](././v2-0d4207344f96a3ddc1ee15499a110d98_1440w.png)

可以看到蓝色按钮的↑箭头旁边有一个数字，它表示 commit 的数量。如果远程分支比本地分支领先，还有又一个↓箭头，旁边也会有一个数字，表示远程分支比本地分支领先的 commit 数量。

## git pull

如果需要从远程分支向本地分支同步代码，可以点击拉取：

![](././v2-1e1e12bf3f2a3acbfe281d00102c7d6e_1440w.png)

## git tag

可以点击创建标记来创建标签：

![](././v2-9041a17c308e9da20e40067c2a73a056_1440w.png)

当然，也可以在下面的 TAGS 中管理所有标签：

![](././v2-0814606c567a34e152bd5150a15b75ae_1440w.png)

## 合并冲突

当合并代码出现冲突时，VS Code 中会显示当前的更改的和传入的更改，可以选择保留其中一个，也可以全部保留：

![](././v2-32538e5cba83b0cecb702aa4ade2a654_1440w.png)



# 第9章 企业项目构建与开发分支

## 1. GitFlow工作流介绍

在项目开发过程中使用 Git 的方式常见的有：

### **1.1 集中式工作流**

所有修改都提交到 Master 这个分支。比较适合极小团队或单人维护的项目，不建议使用这种方式。

![img](wps1111.jpg) 

### **1.2 功能开发工作流**

功能开发应该在一个专门的分支，而不是在 master 分支上。适用于小团队开发。

![img](wps21111.jpg) 

### **1.3 GitFlow工作流**

公司中最常用于管理大型项目。为功能开发、发布准备和维护设立了独立的分支，让发布迭代过程更流畅。

![img](wps13111.jpg) 

### **1.4 Forking工作流**

在 GitFlow 基础上，充分利用了 Git 的 Fork 和 pull request 的功能以达到代码审核的目的。一般用于跨团队协作、网上开源项目。

![img](wps41111.jpg) 

## 2. 各分支功能介绍

![img](wps13111.jpg)

### 2.1 主干分支 master

主要负责管理正在运行的生产环境代码，永远保持与正在运行的生产环境完全一致。为了保持稳定性一般不会直接在这个分支上修改代码，都是通过其他分支合并过来的。

### 2.2 开发分支 develop

主要负责管理正在开发过程中的代码。一般情况下应该是最新的代码。

### 2.3 功能分支 feature

为了不影响较短周期的开发工作，一般把中长期开发模块，会从开发分支中独立出来。 开发完成后会合并到开发分支。

### 2.4 准生产分支（预发布分支） release

较大的版本上线前，会从开发分支中分出准生产分支，进行最后阶段的集成测试。该版本上线后，会合并到主干分支。生产环境运行一段阶段较稳定后可以视情况删除。

### 2.5 bug 修理分支 hotfix

主要负责管理生产环境下出现的紧急修复的代码。 从主干分支分出，修复完毕并测试上线后，并回主干分支和开发分支。并回后，视情况可以删除该分支。

## 3. 创建项目与分支管理

首先在Gitlab上面按照项目规格创建远程仓库。

![1706084894289](.\1706084894289.png)

### 3.1 idea与远程仓库连接

![1705473717653](1705473717653.png)

### 3.2 不同分支的提交与合并

（1）新建分支和切换分支

![1706087127924](1706087127924.png)

（2）不同分支提交代码与合并

首先在feature分支编写第一个模块的模拟代码，并提交

```java
package com.atguigu;


public class module1 {
    public static void main(String[] args) {
        System.out.println("完成第一个模块的开发");
    }
}
```

（3）合并feature到develop分支

![1706088019573](1706088019573.png)

![1706088077244](1706088077244.png)

审查测试通过之后，完成合并

![1706087991195](1706087991195.png)

# 第10章 GitLab功能拓展

## 1. 使用GitLab完成code review

![11170555705557549518](1705557561370.png)

## 2. CICD部署程序

使用gitLab的自动部署功能，可以快速实现自动部署，完成运行。

![1705557925090](1705557925090.png)

## 3. 安装gitLab-runner

上传安装包之后执行

```
sudo rpm -ivh gitlab-runner-16.6.1-1.x86_64.rpm
```

之后运行注册命令

```
sudo gitlab-runner register
#输入地址
http://hadoop104
#输入token 
nqaTgGDeJyFsA5fzg8ck
#输入描述
[hadoop104]: ci
#输入标签
ci
#输入记录标签

WARNING: Support for registration tokens and runner parameters in the 'register' command has been deprecated in GitLab Runner 15.6 and will be replaced with support for authentication tokens. For more information, see https://docs.gitlab.com/ee/ci/runners/new_creation_workflow 
Registering runner... succeeded                     runner=nqaTgGDe
#选择运行模式 -> 使用最简单的shell
shell
```

token的位置

![1705896052634](./1705896052634.png)

注册完成之后，runner就已经上线了。

![1705896287765](./1705896287765.png)

![1705557817529](1705557817529.png)

![1705898035403](1705898035403.png)