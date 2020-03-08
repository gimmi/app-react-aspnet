using Microsoft.AspNetCore.TestHost;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace MyCompany.MyStack.MyRestApp.Tests
{
    public class ValuesControllerTest
    {
        private TestUtils _tu;
        private IHost _host;
        private HttpClient _client;

        [SetUp]
        public async Task SetUp()
        {
            _tu = new TestUtils();
            var appConfig = new AppConfig {
                DataDir = _tu.TestDir
            };
            _host = await Program.CreateHostBuilder(appConfig)
                .ConfigureWebHost(web => {
                    web.UseTestServer();
                })
                .StartAsync();

            _client = _host.GetTestServer().CreateClient();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", "cm9vdDpyb290");
        }

        [TearDown]
        public async Task TearDown()
        {
            await _host.StopAsync();
            _tu.Dispose();
        }

        [Test]
        public async Task Should_get_sample_data()
        {
            var resp = await _client.GetAsync("api/jsonserialization");

            Assert.That(resp.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(resp.Content.Headers.ContentType.ToString(), Is.EqualTo("application/json; charset=utf-8"));

            var json = await resp.Content.ReadAsStringAsync();
            Assert.That(json, new JsonEqualConstraint(@"{
                pascalCaseProperty: 'value',
                camelCaseProperty: 'value',
                dictionary: {
                    PascalCaseKey: 'value',
                    camelCaseKey: 'value'
                },
                array: [ 'value1', 'value2' ],
                utcDateTime: '2018-05-11T08:20:31.123Z',
                localDateTime: '2018-05-11T08:20:31.123'
            }"));
        }
    }
}
