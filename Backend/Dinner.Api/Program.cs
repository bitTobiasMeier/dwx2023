
using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;

namespace Dinner.Api
{
    public class Program
    {
        public static string AllowOrigins => "AllowOrigins";
        
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers().AddJsonOptions(options=>
                options.JsonSerializerOptions.Converters.Add(
                    new JsonStringEnumConverter()));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(AllowOrigins,
                    builder => builder.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo() {Title = "Effektive Entwicklung mit TypeScript", Version="v1",});
            });

            var app = builder.Build();

            app.UseSwagger();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                //app.UseSwagger();
                app.UseStaticFiles();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.yaml", "API zum Vortrag Effektive Entwicklung mit TypeScript");
                });
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}