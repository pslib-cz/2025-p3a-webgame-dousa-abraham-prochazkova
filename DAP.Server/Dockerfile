# Multi-stage Dockerfile for dap.client and dap.server

# 1. Build Stage for Client (Frontend)
FROM node:18-alpine AS client-build
WORKDIR /app

# Install dependencies and build the React-based client
COPY dap.client/package*.json ./dap.client/
RUN npm install --prefix dap.client

# Copy the client source code and build it
COPY dap.client ./dap.client
RUN npm run build --prefix dap.client

# 2. Build Stage for Server (Backend)
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS server-build
WORKDIR /app

# Copy server-related project files (C# and dependencies)
COPY DAP.Server/*.csproj DAP.Server/
RUN dotnet restore DAP.Server/DAP.Server.csproj

# Copy the entire backend code and build the ASP.NET WebAPI
COPY DAP.Server ./
RUN dotnet publish -c Release -o /app/out

# 3. Final Stage for Combined Environment
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app

# Copy server application files
COPY --from=server-build /app/out .

# Copy pre-built client static files
COPY --from=client-build /app/dap.client/dist ./wwwroot

# Set the entrypoint and expose necessary ports
ENTRYPOINT ["dotnet", "DAP.Server.dll"]
EXPOSE 80
EXPOSE 443