using Microsoft.AspNetCore.Mvc;
using FormSubmissionApi.Services;
using System.Text.Json;

namespace FormSubmissionApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubmissionsController : ControllerBase
{
    private readonly ISubmissionService _submissionService;
    private readonly ILogger<SubmissionsController> _logger;

    public SubmissionsController(ISubmissionService submissionService, ILogger<SubmissionsController> logger)
    {
        _submissionService = submissionService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreateSubmission([FromBody] JsonElement jsonData)
    {
        try
        {
            if (jsonData.ValueKind == JsonValueKind.Null || jsonData.ValueKind == JsonValueKind.Undefined)
            {
                return BadRequest(new { error = "Submission data cannot be empty" });
            }

            var data = ConvertJsonElementToDictionary(jsonData);

            if (data == null || data.Count == 0)
            {
                return BadRequest(new { error = "Submission data cannot be empty" });
            }

            _logger.LogInformation("Deserialized data with {Count} fields", data.Count);

            var id = await _submissionService.CreateSubmissionAsync(data);
            _logger.LogInformation("Successfully created submission with ID: {Id}", id);
            
            return CreatedAtAction(nameof(GetSubmission), new { id }, new { id });
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "JSON deserialization error: {Message}", ex.Message);
            return BadRequest(new { error = "Invalid JSON format", details = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating submission: {Message}\nStackTrace: {StackTrace}", ex.Message, ex.StackTrace);
            return StatusCode(500, new { error = "An error occurred while creating the submission", details = ex.Message });
        }
    }

    private Dictionary<string, object> ConvertJsonElementToDictionary(JsonElement element)
    {
        var dict = new Dictionary<string, object>();

        foreach (var property in element.EnumerateObject())
        {
            dict[property.Name] = ConvertJsonElementToObject(property.Value);
        }

        return dict;
    }

    private object ConvertJsonElementToObject(JsonElement element)
    {
        return element.ValueKind switch
        {
            JsonValueKind.String => element.GetString() ?? string.Empty,
            JsonValueKind.Number => element.TryGetInt64(out var intValue) ? intValue : element.GetDouble(),
            JsonValueKind.True => true,
            JsonValueKind.False => false,
            JsonValueKind.Null => null!,
            JsonValueKind.Array => element.EnumerateArray().Select(ConvertJsonElementToObject).ToArray(),
            JsonValueKind.Object => ConvertJsonElementToDictionary(element),
            _ => element.GetRawText()
        };
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSubmission(string id)
    {
        var submission = await _submissionService.GetSubmissionAsync(id);
        
        if (submission == null)
        {
            return NotFound(new { error = "Submission not found" });
        }

        return Ok(submission);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSubmissions([FromQuery] string? search = null)
    {
        try
        {
            IEnumerable<Dictionary<string, object>> submissions;
            
            if (!string.IsNullOrWhiteSpace(search))
            {
                submissions = await _submissionService.SearchSubmissionsAsync(search);
            }
            else
            {
                submissions = await _submissionService.GetAllSubmissionsAsync();
            }

            return Ok(submissions);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving submissions");
            return StatusCode(500, new { error = "An error occurred while retrieving submissions" });
        }
    }
}

