const fetch = require('node-fetch');

test('should insert user', () => {
  const body = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'marcos@wolox.com.ar',
    password: '123123123'
  };
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => expect(res).toBe('OK'));
});
