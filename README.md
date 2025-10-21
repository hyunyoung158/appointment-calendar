# 약속 모임용 캘린더

누구누구 언제되나 체크하기 번거로워서 만듬

## 실행방법

### `npm start`

로컬 테스트 용도
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 빌드&배포 방법

#### firebase를 사용하여 배포합니다.

[배포 방법]

1. .env에 firebase 웹앱 정보를 입력합니다.
2. 다음과 같이 명령어를 입력합니다.

```
$ firebase init // 초기 세팅시
$ npm run build
$ firebase deploy
```

3. 결과에 나오는 URL로 접속하여 확인합니다.