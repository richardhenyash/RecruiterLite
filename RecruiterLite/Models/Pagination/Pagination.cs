namespace RecruiterLite.Models.Pagination;

public class Pagination<T> where T : class
{
    public Pagination(int pageIndex, int pageSize, int count, string? search, IReadOnlyList<T>? data)
    {
        PageIndex = pageIndex;
        PageSize = pageSize;
        Count = count;
        Search = search;
        Data = data;
    }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int Count { get; set; }
    public string? Search { get; set; }
    public IReadOnlyList<T> Data { get; set; }
}
