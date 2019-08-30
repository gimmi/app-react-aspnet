using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace MyCompany.MyStack.MyRestApp
{
    // See https://joonasw.net/view/creating-auth-scheme-in-aspnet-core-2
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync() => Task.FromResult(HandleAuthenticate());


        protected override Task HandleChallengeAsync(AuthenticationProperties properties)
        {
            Response.Headers["WWW-Authenticate"] = "Basic";
            return base.HandleChallengeAsync(properties);
        }

        private AuthenticateResult HandleAuthenticate()
        {
            if (!Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                return AuthenticateResult.NoResult();
            }

            if (!AuthenticationHeaderValue.TryParse(authHeader, out var authValue))
            {
                return AuthenticateResult.NoResult();
            }

            if (authValue.Scheme != Scheme.Name)
            {
                return AuthenticateResult.NoResult();
            }

            var credentialBytes = Convert.FromBase64String(authValue.Parameter);
            var credentials = Encoding.ASCII.GetString(credentialBytes);
            if (credentials == "root:root")
            {
                var claimsIdentity = new ClaimsIdentity(new []{ new Claim(ClaimTypes.Name, "root") }, Scheme.Name);
                var principal = new ClaimsPrincipal(claimsIdentity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);
                return AuthenticateResult.Success(ticket);
            }

            return AuthenticateResult.Fail("Invalid authorization scheme " + Scheme.Name);
        }
    }
}
