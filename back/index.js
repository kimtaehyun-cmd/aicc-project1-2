const PORT = '8080'; // 8080 포트를 사용
const express = require('express'); // express 모듈 사용
const cors = require('cors'); // cors 모듈 사용
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express(); // express 모듈을 app 변수 할당

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(require('./routes/getRoutes'));
app.use(require('./routes/postRoutes'));
app.use(require('./routes/updateRoutes'));
app.use(require('./routes/deleteRoutes'));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); // 서버 실행 시 메시지 출력
