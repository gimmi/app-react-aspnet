using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Hosting;

namespace MyCompany.MyStack.MyRestApp
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var appConfig = new AppConfig {
                DataDir = args.FirstOrDefault() ?? Directory.GetCurrentDirectory()
            };

            var host = CreateHostBuilder(appConfig).Build();

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(AppConfig appConfig)
        {
            return new HostBuilder()
                .ConfigureWebHostDefaults(web => {
                    web.UseUrls("http://0.0.0.0:8080");
                    web.UseKestrel(options => {
                        options.AddServerHeader = false;
                    });
                    web.Configure(app => {
                        app.UseDeveloperExceptionPage();
                        app.UseStaticFiles();
                        app.UseAuthentication();
                        // app.UseMvc(routes => {
                        //     routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
                        // });
                        app.UseRouting();
                        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
                        app.UseSpa(spa => { }); // https://stackoverflow.com/a/59896579/66629
                    });
                })
                .UseEnvironment(Environments.Development)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .ConfigureLogging(logging => {
                    logging.SetMinimumLevel(LogLevel.Warning);
                    logging.AddFilter(typeof(Program).Namespace, LogLevel.Trace);
                    logging.AddConsole();
                })
                .ConfigureServices(services => {
                    services.AddMvc(mvc => {
                            var policy = new AuthorizationPolicyBuilder()
                                .RequireAuthenticatedUser()
                                .Build();
                            mvc.Filters.Add(new AuthorizeFilter(policy));
                        })
                        .AddNewtonsoftJson(json => {
                            json.SerializerSettings.Formatting = Formatting.Indented;
                            json.SerializerSettings.ContractResolver = new DefaultContractResolver {
                                NamingStrategy = new CamelCaseNamingStrategy {
                                    ProcessDictionaryKeys = false
                                }
                            };
                        });
                    services.AddSingleton(appConfig);

                    services.AddAuthentication("Basic")
                        .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("Basic", null);
                });
        }
    }
}
