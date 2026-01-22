
```markdown
# 사용자 API

## 사용자 목록 조회

사용자 목록을 가져옵니다.

**Endpoint**
```
GET /users
```

**Parameters**

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| page | integer | 선택 | 페이지 번호 (기본값: 1) |
| limit | integer | 선택 | 페이지당 항목 수 (기본값: 20) |

**Request Example**

```bash
curl -X GET "https://api.example.com/v1/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response Example**

```json
{
  "data": [
    {
      "id": 1,
      "name": "홍길동",
      "email": "hong@example.com",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

**Response Fields**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | integer | 사용자 ID |
| name | string | 사용자 이름 |
| email | string | 이메일 주소 |
| created_at | datetime | 생성 일시 |

## 사용자 생성

새로운 사용자를 생성합니다.

**Endpoint**
```
POST /users
```

**Request Body**

```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "password": "securepassword"
}
```

**Response**

```json
{
  "id": 1,
  "name": "홍길동",
  "email": "hong@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}
```

```