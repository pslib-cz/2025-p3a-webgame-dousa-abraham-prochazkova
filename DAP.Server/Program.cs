using DAP.Server.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default") ?? "Filename=DAP.sqlite"));


// read allowed origins from configuration, fallback to localhost http/https
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                     ?? new[] { "http://localhost:5173", "https://localhost:5173", "http://localhost:5174", "https://localhost:5174" };

// Configure CORS to allow requests from configured origins
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseDeveloperExceptionPage();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseRouting();

// Enable CORS
app.UseCors("DevCors");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.UseStaticFiles();

app.Run();
