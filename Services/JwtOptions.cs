namespace ECommerceBackend.Services;

public class JwtOptions
{
    public string Issuer { get; set; } = "ECommerceBackend";
    public string Audience { get; set; } = "ECommerceBackendClient";
    public string Secret { get; set; } = "ChangeThisDevelopmentSecretKeyToAtLeast32Characters";
    public int AccessTokenMinutes { get; set; } = 30;
    public int RefreshTokenDays { get; set; } = 7;
}
