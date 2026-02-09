export default defineEventHandler(() => {
  return {
    code: 200,
    message: '登录成功',
    data: {
      token: 'mocked-token',
      user: {
        id: '123',
        name: 'Mock User',
        email: 'OZSdM@example.com',
      },
    },
  }
})
