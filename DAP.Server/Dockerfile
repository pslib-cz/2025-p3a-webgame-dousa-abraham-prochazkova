# Updated Dockerfile

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY dap.client/*.esproj dap.client/
RUN dotnet restore dap.client/dap.client.esproj

# Copy everything else
COPY dap.client/ /app/dap.client/
COPY . .

# Publish
RUN dotnet publish -c Release -o out dap.client/dap.client.esproj

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "dap.client.dll"]