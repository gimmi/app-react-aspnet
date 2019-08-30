FROM mcr.microsoft.com/dotnet/core/runtime:2.2

WORKDIR /app

COPY bin/Release/netcoreapp2.2/publish ./
COPY wwwroot ./wwwroot

EXPOSE 8080

ENTRYPOINT ["dotnet", "MyCompany.MyStack.MyRestApp.dll"]
