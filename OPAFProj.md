---
title: OPAFProj
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# OPAFProj

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# 用户

## POST 注册

POST /account/register

注册接口

> Body 请求参数

```json
{
  "username": "string",
  "password": "string",
  "authToken": "string",
  "inviteCode": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» username|body|string| 是 | 用户名称|none|
|» password|body|string| 是 | 用户密码|none|
|» authToken|body|string| 是 | 人机验证返回token|none|
|» inviteCode|body|string| 是 | 邀请码|none|

> 返回示例

> 200 Response

```json
{
  "status": "string",
  "token": "string",
  "reason": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|string|true|none|返回状态码|0为成功，1为失败|
|» token|string|false|none|假设成功，此为本次注册登录token|none|
|» reason|string|false|none|假设失败，此为失败原因|none|

## POST 登录

POST /account/login

> Body 请求参数

```json
{
  "username": "string",
  "password": "string",
  "authToken": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» username|body|string| 是 | 用户名|用户名|
|» password|body|string| 是 | 用户密码|none|
|» authToken|body|string| 是 | 人机验证token|none|

> 返回示例

> 200 Response

```json
{
  "token": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» token|string|true|none|返回的webtoken|none|

## GET 创建邀请码

GET /account/newInvitecode

> 返回示例

> 200 Response

```json
{
  "state": "string",
  "inviteCode": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» state|string|true|none||0.成功,1.无权限|
|» inviteCode|string|true|none||none|

# 文件访问

## PUT 上传文件

PUT /files/upload

上传文件

> Body 请求参数

```json
{
  "tag": {
    "name": "string",
    "time": "string",
    "belong": "string",
    "specialtag": "string",
    "objective": "string",
    "postscript": "string",
    "previewImg": "string"
  },
  "md5": "string",
  "path": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» tag|body|object| 是 | 标签|none|
|»» name|body|string| 否 | 文本|none|
|»» time|body|string| 否 | 时间戳|Unix Time|
|»» belong|body|string| 否 | 属于哪个工作流的产物，id|none|
|»» specialtag|body|string| 否 | 特殊标签，包括星标，待处理等等|none|
|»» objective|body|string| 否 | 拍摄对象备注，文本|none|
|»» postscript|body|string| 否 | 备注信息，文本|none|
|»» previewImg|body|string| 否 | 预览图ID|none|
|» md5|body|string| 否 | md5校验|none|
|» path|body|string| 是 ||none|

> 返回示例

> 201 Response

```json
{
  "status": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|string|true|none||0:成功；1:文件已存在；2:无权限上传；3:校验失败|

## POST 删除文件

POST /files/delete

> Body 请求参数

```json
{
  "path": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» path|body|string| 是 ||虚拟路径(包含文件名则删除文件，为目录路径则删除文件夹)|

> 返回示例

> 200 Response

```json
{
  "status": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|string|true|none||0:成功；1:找不到文件；2:无权限删除；3:删除失败|

## POST 修改标签

POST /files/modify

> Body 请求参数

```json
{
  "tags": {
    "name": "string",
    "belong": "string",
    "specialtag": "string",
    "objective": "string",
    "postscript": "string"
  },
  "path": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» tags|body|object| 是 ||标签|
|»» name|body|string| 否 | 文本|none|
|»» belong|body|string| 否 | 属于哪个工作流的产物，id|none|
|»» specialtag|body|string| 否 | 特殊标签，包括星标，待处理等等|none|
|»» objective|body|string| 否 | 拍摄对象备注，文本|none|
|»» postscript|body|string| 否 | 备注信息，文本|none|
|» path|body|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "status": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|string|true|none||0:成功；1:文件不存在；2:无权限修改|

## POST 搜索列表

POST /files/search

> Body 请求参数

```json
{
  "tag": {
    "id": 0,
    "name": "string",
    "path": "string",
    "time": "string",
    "rangeStartTime": "string",
    "rangeStopTime": "string",
    "belong": "string",
    "specialtag": "string",
    "objective": "string",
    "postscript": "string"
  }
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» tag|body|object| 是 ||none|
|»» id|body|integer| 否 ||ID 编号|
|»» name|body|string| 否 | 文本|none|
|»» path|body|string| 否 | 路径|none|
|»» time|body|string| 否 | 时间戳|Unix Time|
|»» rangeStartTime|body|string| 否 ||none|
|»» rangeStopTime|body|string| 否 ||none|
|»» belong|body|string| 否 | 属于哪个工作流的产物，id|none|
|»» specialtag|body|string| 否 | 特殊标签，包括星标，待处理等等|none|
|»» objective|body|string| 否 | 拍摄对象备注，文本|none|
|»» postscript|body|string| 否 | 备注信息，文本|none|

> 返回示例

> 200 Response

```json
[
  {
    "name": "string",
    "time": "string",
    "belong": "string",
    "specialtag": "string",
    "objective": "string",
    "postscript": "string",
    "previewImg": "string"
  }
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» name|string|false|none|文本|none|
|» time|string|false|none|时间戳|Unix Time|
|» belong|string|false|none|属于哪个工作流的产物，id|none|
|» specialtag|string|false|none|特殊标签，包括星标，待处理等等|none|
|» objective|string|false|none|拍摄对象备注，文本|none|
|» postscript|string|false|none|备注信息，文本|none|
|» previewImg|string|false|none|预览图ID|none|

## GET 获取列表

GET /files/getlist

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|path|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "files": [
    {
      "name": "string",
      "time": "string",
      "belong": "string",
      "specialtag": "string",
      "objective": "string",
      "postscript": "string",
      "previewImg": "string"
    }
  ],
  "dictionaries": [
    "string"
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» files|[object]|true|none||none|
|»» name|string|false|none|文本|none|
|»» time|string|false|none|时间戳|Unix Time|
|»» belong|string|false|none|属于哪个工作流的产物，id|none|
|»» specialtag|string|false|none|特殊标签，包括星标，待处理等等|none|
|»» objective|string|false|none|拍摄对象备注，文本|none|
|»» postscript|string|false|none|备注信息，文本|none|
|»» previewImg|string|false|none|预览图ID|none|
|» dictionaries|[string]|true|none||none|

## GET 获取文件标签

GET /files/getfile

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|path|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "tag": {
    "name": "string",
    "time": "string",
    "belong": "string",
    "specialtag": "string",
    "objective": "string",
    "postscript": "string",
    "previewImg": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» tag|object|true|none||none|
|»» name|string|false|none|文本|none|
|»» time|string|false|none|时间戳|Unix Time|
|»» belong|string|false|none|属于哪个工作流的产物，id|none|
|»» specialtag|string|false|none|特殊标签，包括星标，待处理等等|none|
|»» objective|string|false|none|拍摄对象备注，文本|none|
|»» postscript|string|false|none|备注信息，文本|none|
|»» previewImg|string|false|none|预览图ID|none|

## GET 下载文件

GET /files/download

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|path|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "md5": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» md5|string|true|none||none|

# 工作流

## POST 新增工作流

POST /workflow/add

> Body 请求参数

```json
{
  "workflow": {
    "id": 0,
    "name": "string",
    "workDictionary": "string",
    "createTime": "string",
    "startTime": "string",
    "stopTime": "string",
    "typetag": "string",
    "postscript": "string",
    "previewImg": "string",
    "workUsers": [
      {
        "id": 0,
        "name": "string",
        "password": "string",
        "level": 0,
        "role": "string"
      }
    ]
  }
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» workflow|body|[workflow_tag](#schemaworkflow_tag)| 是 ||none|
|»» id|body|integer| 否 | ID 编号|none|
|»» name|body|string| 否 | 文本|none|
|»» workDictionary|body|string| 否 | 关联路径|none|
|»» createTime|body|string| 否 | 创建时间|Unix Time|
|»» startTime|body|string| 否 | 开始时间|Unix Time,标记工作流开始时间|
|»» stopTime|body|string| 否 | 结束时间|Unix Time,标记工作流结束时间|
|»» typetag|body|string| 否 | 种类标签|工作流肯定得有其种类，用来标记这个工作流用来干嘛的|
|»» postscript|body|string| 否 | 备注信息|none|
|»» previewImg|body|string| 否 | 预览图ID|none|
|»» workUsers|body|[object]| 否 ||none|
|»»» id|body|integer| 是 | 用户唯一标识符|ID 编号|
|»»» name|body|string| 是 | 用户名称|名称|
|»»» password|body|string| 是 | 用户密码|sha256存储|
|»»» level|body|integer| 是 | 用户权限|0.未认证/异常用户|
|»»» role|body|string| 是 ||0.上传者,1.筛选打标签者|

#### 详细说明

**»»» level**: 0.未认证/异常用户
1.可预览用户（r）
2.工作用户（rw）
3.管理员用户（admin）

> 返回示例

> 200 Response

```json
{
  "status": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|string|true|none||0:成功；1:工作流已存在；2:无权限新建|

## POST 删除工作流

POST /workflow/delete

> Body 请求参数

```json
{
  "id": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» id|body|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "status": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|string|true|none||0:成功；1:找不到工作流；2:无权限删除；3:删除失败|

## POST 修改工作流

POST /workflow/modify

> Body 请求参数

```json
{
  "tags": {
    "id": 0,
    "name": "string",
    "workDictionary": "string",
    "startTime": "string",
    "stopTime": "string",
    "typetag": "string",
    "postscript": "string",
    "previewImg": "string",
    "workUsers": [
      {
        "id": 0,
        "name": "string",
        "password": "string",
        "level": 0,
        "role": "string"
      }
    ]
  }
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» tags|body|object| 是 ||标签|
|»» id|body|integer| 否 | ID 编号|none|
|»» name|body|string| 否 | 文本|none|
|»» workDictionary|body|string| 否 | 关联路径|none|
|»» startTime|body|string| 否 | 开始时间|Unix Time,标记工作流开始时间|
|»» stopTime|body|string| 否 | 结束时间|Unix Time,标记工作流结束时间|
|»» typetag|body|string| 否 | 种类标签|工作流肯定得有其种类，用来标记这个工作流用来干嘛的|
|»» postscript|body|string| 否 | 备注信息|none|
|»» previewImg|body|string| 否 | 预览图ID|none|
|»» workUsers|body|[object]| 否 ||none|
|»»» id|body|integer| 是 | 用户唯一标识符|ID 编号|
|»»» name|body|string| 是 | 用户名称|名称|
|»»» password|body|string| 是 | 用户密码|sha256存储|
|»»» level|body|integer| 是 | 用户权限|0.未认证/异常用户|
|»»» role|body|string| 是 ||0.上传者,1.筛选打标签者|

#### 详细说明

**»»» level**: 0.未认证/异常用户
1.可预览用户（r）
2.工作用户（rw）
3.管理员用户（admin）

> 返回示例

> 200 Response

```json
{
  "status": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|string|true|none||0:成功；1:工作流不存在；2:无权限修改|

## GET 获取工作流列表

GET /workflow/getlist

统一根据条件获取工作流列表的接口
Todo:返回响应，返回workflow_tag列表

> 返回示例

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "workDictionary": "string",
    "createTime": "string",
    "startTime": "string",
    "stopTime": "string",
    "typetag": "string",
    "postscript": "string",
    "previewImg": "string",
    "workUsers": [
      {
        "id": 0,
        "name": "string",
        "password": "string",
        "level": 0,
        "role": "string"
      }
    ]
  }
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[[workflow_tag](#schemaworkflow_tag)]|false|none||none|
|» id|integer|false|none|ID 编号|none|
|» name|string|false|none|文本|none|
|» workDictionary|string|false|none|关联路径|none|
|» createTime|string|false|none|创建时间|Unix Time|
|» startTime|string|false|none|开始时间|Unix Time,标记工作流开始时间|
|» stopTime|string|false|none|结束时间|Unix Time,标记工作流结束时间|
|» typetag|string|false|none|种类标签|工作流肯定得有其种类，用来标记这个工作流用来干嘛的|
|» postscript|string|false|none|备注信息|none|
|» previewImg|string|false|none|预览图ID|none|
|» workUsers|[object]|false|none||none|
|»» id|integer|true|none|用户唯一标识符|ID 编号|
|»» name|string|true|none|用户名称|名称|
|»» password|string|true|none|用户密码|sha256存储|
|»» level|integer|true|none|用户权限|0.未认证/异常用户<br />1.可预览用户（r）<br />2.工作用户（rw）<br />3.管理员用户（admin）|
|»» role|string|true|none||0.上传者,1.筛选打标签者|

## GET 获取工作流信息

GET /workflow/getworkflow

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "tag": {
    "id": 0,
    "name": "string",
    "workDictionary": "string",
    "createTime": "string",
    "startTime": "string",
    "stopTime": "string",
    "typetag": "string",
    "postscript": "string",
    "previewImg": "string",
    "workUsers": [
      {
        "id": 0,
        "name": "string",
        "password": "string",
        "level": 0,
        "role": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» tag|[workflow_tag](#schemaworkflow_tag)|true|none||标签|
|»» id|integer|false|none|ID 编号|none|
|»» name|string|false|none|文本|none|
|»» workDictionary|string|false|none|关联路径|none|
|»» createTime|string|false|none|创建时间|Unix Time|
|»» startTime|string|false|none|开始时间|Unix Time,标记工作流开始时间|
|»» stopTime|string|false|none|结束时间|Unix Time,标记工作流结束时间|
|»» typetag|string|false|none|种类标签|工作流肯定得有其种类，用来标记这个工作流用来干嘛的|
|»» postscript|string|false|none|备注信息|none|
|»» previewImg|string|false|none|预览图ID|none|
|»» workUsers|[object]|false|none||none|
|»»» id|integer|true|none|用户唯一标识符|ID 编号|
|»»» name|string|true|none|用户名称|名称|
|»»» password|string|true|none|用户密码|sha256存储|
|»»» level|integer|true|none|用户权限|0.未认证/异常用户<br />1.可预览用户（r）<br />2.工作用户（rw）<br />3.管理员用户（admin）|
|»»» role|string|true|none||0.上传者,1.筛选打标签者|

## POST 搜索工作流

POST /workflow/search

> Body 请求参数

```json
{
  "tags": {
    "id": 0,
    "name": "string",
    "workDictionary": "string",
    "createTime": "string",
    "startTime": "string",
    "stopTime": "string",
    "typetag": "string",
    "postscript": "string",
    "workUsers": [
      {
        "id": 0,
        "name": "string",
        "password": "string",
        "level": 0,
        "role": "string"
      }
    ]
  }
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» tags|body|object| 是 ||标签|
|»» id|body|integer| 否 | ID 编号|none|
|»» name|body|string| 否 | 文本|none|
|»» workDictionary|body|string| 否 | 关联路径|none|
|»» createTime|body|string| 否 | 创建时间|Unix Time|
|»» startTime|body|string| 否 | 开始时间|Unix Time,标记工作流开始时间|
|»» stopTime|body|string| 否 | 结束时间|Unix Time,标记工作流结束时间|
|»» typetag|body|string| 否 | 种类标签|工作流肯定得有其种类，用来标记这个工作流用来干嘛的|
|»» postscript|body|string| 否 | 备注信息|none|
|»» workUsers|body|[object]| 否 ||none|
|»»» id|body|integer| 是 | 用户唯一标识符|ID 编号|
|»»» name|body|string| 是 | 用户名称|名称|
|»»» password|body|string| 是 | 用户密码|sha256存储|
|»»» level|body|integer| 是 | 用户权限|0.未认证/异常用户|
|»»» role|body|string| 是 ||0.上传者,1.筛选打标签者|

#### 详细说明

**»»» level**: 0.未认证/异常用户
1.可预览用户（r）
2.工作用户（rw）
3.管理员用户（admin）

> 返回示例

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "workDictionary": "string",
    "createTime": "string",
    "startTime": "string",
    "stopTime": "string",
    "typetag": "string",
    "postscript": "string",
    "previewImg": "string",
    "workUsers": [
      {
        "id": 0,
        "name": "string",
        "password": "string",
        "level": 0,
        "role": "string"
      }
    ]
  }
]
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[[workflow_tag](#schemaworkflow_tag)]|false|none||none|
|» id|integer|false|none|ID 编号|none|
|» name|string|false|none|文本|none|
|» workDictionary|string|false|none|关联路径|none|
|» createTime|string|false|none|创建时间|Unix Time|
|» startTime|string|false|none|开始时间|Unix Time,标记工作流开始时间|
|» stopTime|string|false|none|结束时间|Unix Time,标记工作流结束时间|
|» typetag|string|false|none|种类标签|工作流肯定得有其种类，用来标记这个工作流用来干嘛的|
|» postscript|string|false|none|备注信息|none|
|» previewImg|string|false|none|预览图ID|none|
|» workUsers|[object]|false|none||none|
|»» id|integer|true|none|用户唯一标识符|ID 编号|
|»» name|string|true|none|用户名称|名称|
|»» password|string|true|none|用户密码|sha256存储|
|»» level|integer|true|none|用户权限|0.未认证/异常用户<br />1.可预览用户（r）<br />2.工作用户（rw）<br />3.管理员用户（admin）|
|»» role|string|true|none||0.上传者,1.筛选打标签者|

# 数据模型

<h2 id="tocS_user">user</h2>

<a id="schemauser"></a>
<a id="schema_user"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "name": "string",
  "password": "string",
  "level": 0
}

```

用户表

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none|用户唯一标识符|ID 编号|
|name|string|true|none|用户名称|名称|
|password|string|true|none|用户密码|sha256存储|
|level|integer|true|none|用户权限|0.未认证/异常用户<br />1.可预览用户（r）<br />2.工作用户（rw）<br />3.管理员用户（admin）|

<h2 id="tocS_invite_code">invite_code</h2>

<a id="schemainvite_code"></a>
<a id="schema_invite_code"></a>
<a id="tocSinvite_code"></a>
<a id="tocsinvite_code"></a>

```json
{
  "id": 0,
  "invite_code": "string",
  "from_user": 0,
  "end_date": 0
}

```

邀请码表

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none|邀请码编号|ID 编号|
|invite_code|string|true|none|邀请码|UUID|
|from_user|integer|true|none|邀请码创建用户ID|none|
|end_date|integer|true|none|邀请码过期时间|Unix Time存储|

<h2 id="tocS_file_tag">file_tag</h2>

<a id="schemafile_tag"></a>
<a id="schema_file_tag"></a>
<a id="tocSfile_tag"></a>
<a id="tocsfile_tag"></a>

```json
{
  "id": 0,
  "name": "string",
  "time": "string",
  "belong": "string",
  "specialtag": "string",
  "objective": "string",
  "postscript": "string",
  "previewImg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none||ID 编号|
|name|string|false|none|文本|none|
|time|string|false|none|时间戳|Unix Time|
|belong|string|false|none|属于哪个工作流的产物，id|none|
|specialtag|string|false|none|特殊标签，包括星标，待处理等等|none|
|objective|string|false|none|拍摄对象备注，文本|none|
|postscript|string|false|none|备注信息，文本|none|
|previewImg|string|false|none|预览图ID|none|

<h2 id="tocS_workflow_tag">workflow_tag</h2>

<a id="schemaworkflow_tag"></a>
<a id="schema_workflow_tag"></a>
<a id="tocSworkflow_tag"></a>
<a id="tocsworkflow_tag"></a>

```json
{
  "id": 0,
  "name": "string",
  "workDictionary": "string",
  "createTime": "string",
  "startTime": "string",
  "stopTime": "string",
  "typetag": "string",
  "postscript": "string",
  "previewImg": "string",
  "workUsers": [
    {
      "id": 0,
      "name": "string",
      "password": "string",
      "level": 0,
      "role": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none|ID 编号|none|
|name|string|false|none|文本|none|
|workDictionary|string|false|none|关联路径|none|
|createTime|string|false|none|创建时间|Unix Time|
|startTime|string|false|none|开始时间|Unix Time,标记工作流开始时间|
|stopTime|string|false|none|结束时间|Unix Time,标记工作流结束时间|
|typetag|string|false|none|种类标签|工作流肯定得有其种类，用来标记这个工作流用来干嘛的|
|postscript|string|false|none|备注信息|none|
|previewImg|string|false|none|预览图ID|none|
|workUsers|[object]|false|none||none|
|» id|integer|true|none|用户唯一标识符|ID 编号|
|» name|string|true|none|用户名称|名称|
|» password|string|true|none|用户密码|sha256存储|
|» level|integer|true|none|用户权限|0.未认证/异常用户<br />1.可预览用户（r）<br />2.工作用户（rw）<br />3.管理员用户（admin）|
|» role|string|true|none||0.上传者,1.筛选打标签者|

