### How to build

```
cd client
npm install
npm run build
cd ..
dotnet publish server/src/MyCompany.MyStack.sln --configuration Release
docker build --pull --tag mycompany.mystack:latest server/src/MyCompany.MyStack.MyRestApp
```

### How to run

```
docker run -it --rm -p 8080:8080 mycompany.mystack:latest
```