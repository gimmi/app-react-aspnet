using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.TestHost;
using NUnit.Framework;

namespace MyCompany.MyStack.MyRestApp.Tests
{
    public class ContextControllerTest
    {
        private TestUtils _tu;
        private TestServer _server;
        private HttpClient _client;

        [SetUp]
        public void SetUp()
        {
            _tu = new TestUtils();
            var webHostBuilder = Program.CreateHostBuilder(new AppConfig {
                DataDir = _tu.TestDir
            });
            _server = new TestServer(webHostBuilder);
            _client = _server.CreateClient();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", "cm9vdDpyb290");
        }

        [TearDown]
        public void TearDown()
        {
            _tu.Dispose();
        }

        [Test]
        public async Task Should_get_context()
        {
            var resp = await _client.GetAsync("api/context");

            Assert.That(resp.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(resp.Content.Headers.ContentType.ToString(), Is.EqualTo("application/json; charset=utf-8"));

            var json = await resp.Content.ReadAsStringAsync();
            Assert.That(json, new JsonEqualConstraint(@"{
                userName: 'FooBar'
            }"));
        }
    }
}
