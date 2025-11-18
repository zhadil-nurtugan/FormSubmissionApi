using System.Collections.Concurrent;

namespace FormSubmissionApi.Services;

public class SubmissionService : ISubmissionService
{
    private readonly ConcurrentDictionary<string, Dictionary<string, object>> _submissions = new();
    private readonly ILogger<SubmissionService> _logger;

    public SubmissionService(ILogger<SubmissionService> logger)
    {
        _logger = logger;
    }

    public Task<string> CreateSubmissionAsync(Dictionary<string, object> data)
    {
        var id = Guid.NewGuid().ToString();
        var submission = new Dictionary<string, object>(data)
        {
            ["id"] = id,
            ["submittedAt"] = DateTime.UtcNow
        };
        
        _submissions[id] = submission;
        _logger.LogInformation("Created submission with ID: {Id}", id);
        
        return Task.FromResult(id);
    }

    public Task<Dictionary<string, object>?> GetSubmissionAsync(string id)
    {
        _submissions.TryGetValue(id, out var submission);
        return Task.FromResult(submission);
    }

    public Task<IEnumerable<Dictionary<string, object>>> GetAllSubmissionsAsync()
    {
        return Task.FromResult(_submissions.Values.AsEnumerable());
    }

    public Task<IEnumerable<Dictionary<string, object>>> SearchSubmissionsAsync(string searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
        {
            return GetAllSubmissionsAsync();
        }

        var term = searchTerm.ToLowerInvariant();
        var results = _submissions.Values
            .Where(submission => 
                submission.Any(kvp => 
                    kvp.Value?.ToString()?.ToLowerInvariant().Contains(term) == true))
            .ToList();

        return Task.FromResult(results.AsEnumerable());
    }
}