namespace FormSubmissionApi.Services;

public interface ISubmissionService
{
    Task<string> CreateSubmissionAsync(Dictionary<string, object> data);
    Task<Dictionary<string, object>?> GetSubmissionAsync(string id);
    Task<IEnumerable<Dictionary<string, object>>> GetAllSubmissionsAsync();
    Task<IEnumerable<Dictionary<string, object>>> SearchSubmissionsAsync(string searchTerm);
}