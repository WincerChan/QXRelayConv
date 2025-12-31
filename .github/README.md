## 自行部署步骤

### .env 文件

把 .env.sample 文件重命名为 .env.local。
可选：设置 QXRELAY_PUBLIC_HOST 用于订阅返回的公网地址（建议公网 IP 或域名）。

### Turso 初始化

配置信息使用 Turso 的数据库保存，这是唯一的外部依赖。在网页端授权 Github 登陆创建好账号后，可以在本地安装 [Turso Cli](https://docs.turso.tech/reference/turso-cli) 工具，安装好后：

1. turso auth login
2. turso db create [db-name]
3. turso db show [db-name] --url
4. turso db tokens create [db-name]

把第三行和第四行的输出分别填写到 .env.local 的第一行和第二行（QXRELAY_TURSO_URL / QXRELAY_TURSO_AUTH_TOKEN）。

### Turso 建表

输入 turso db shell [db-name] 命令，这会开启一个 SQL 会话，把 [SQL 的建表语句](../db/create_table.sql)输入进去。

### 最后

把本目录拷贝到服务器上，然后：

1. pnpm build
2. pnpm start

即可运行。

### 效果图

![配置页面](./usage.png)

## 合作推广

如果你还在选机场，可以参考下面两家我近期合作体验的机场，均能确保晚间高峰时期的访问速度。

### 青云梯

2020 年成立，SS 协议 + IPLC 线路。80+ 全球节点（港 / 台 / 日 / 新 / 美等），全流媒媒体解锁。

月付 ¥25 起，150 GB 流量，另有少流量用户特惠：年付 ¥96，每月 60 GB流量，[点我注册](https://ponzicc.qytvipaff.cc/register?aff=noUz4H25)。

### 银河云

2024 年新成立， Trojan + IEPL 线路。30+ 常用地区节点。

月付 ¥18 起，100GB 流量，另有 ¥680 售价的 1000G 不限时套餐可选，[点我注册](https://ponzicc.galaxyvipaff01.cc/register?aff=v6mY636X)。

可点击上方注册链接选择月付体验稳定性，再考虑季付 / 年付。
