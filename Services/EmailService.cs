using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace ECommerceBackend.Services;

public class EmailService(IOptions<SmtpOptions> options, ILogger<EmailService> logger) : IEmailService
{
    private readonly SmtpOptions _options = options.Value;

    public async Task SendAsync(string toEmail, string subject, string body, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_options.Host))
        {
            logger.LogInformation("SMTP is not configured. Email skipped. To={ToEmail}, Subject={Subject}", toEmail, subject);
            return;
        }

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_options.FromName, _options.FromEmail));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = subject;
        message.Body = new TextPart("html") { Text = body };

        using var client = new SmtpClient();
        await client.ConnectAsync(_options.Host, _options.Port, _options.EnableSsl, cancellationToken);

        if (!string.IsNullOrWhiteSpace(_options.Username))
        {
            await client.AuthenticateAsync(_options.Username, _options.Password, cancellationToken);
        }

        await client.SendAsync(message, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);
    }
}
