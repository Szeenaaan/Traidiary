using System.Net;
using System.Text.Json;
using SmartTradeJournal.Application.Common;

namespace SmartTradeJournal.API.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
                {
                    context.Response.ContentType = "application/json";

                    int statusCode = StatusCodes.Status500InternalServerError;

                    if (ex is KeyNotFoundException)
                        statusCode = StatusCodes.Status404NotFound;

                    else if (ex is ArgumentException)
                        statusCode = StatusCodes.Status400BadRequest;   // ✅ ADD THIS

                    context.Response.StatusCode = statusCode;

                    var response = new ApiResponse<object>(
                        false,
                        ex.Message,
                        null
                    );

                    var json = JsonSerializer.Serialize(response);

                    await context.Response.WriteAsync(json);
}
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = new
        {
            message = "Something went wrong",
            details = ex.Message
        };

        return context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}