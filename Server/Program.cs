using FormSubmissionApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

builder.Services.AddSingleton<ISubmissionService, SubmissionService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVueApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", 
                          "https://localhost:7064", "http://localhost:5058",
                          "https://localhost:5001", "http://localhost:5000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowVueApp");
app.UseHttpsRedirection();

app.UseStaticFiles();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();