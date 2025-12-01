```markdown
# API 문서

> 우리 서비스의 RESTful API 문서입니다.

## 시작하기

이 문서는 API를 사용하는 방법을 안내합니다.

### Base URL

```
https://api.example.com/v1
```

### 인증

모든 API 요청에는 API 키가 필요합니다.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/v1/users
```

## 빠른 시작

1. [인증](/api/authentication.md)
2. [사용자 API](/api/users.md)
3. [제품 API](/api/products.md)
```