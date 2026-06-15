namespace ECommerceBackend.Services;

public class SmtpOptions
{
    public string Host { get; set; } = "";
    public int Port { get; set; } = 587;
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public string FromEmail { get; set; } = "noreply@example.com";
    public string FromName { get; set; } = "E-Commerce Store";
    public bool EnableSsl { get; set; } = true;
}
