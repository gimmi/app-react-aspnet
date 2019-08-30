using Microsoft.AspNetCore.Mvc;

namespace MyCompany.MyStack.MyRestApp
{
    public class ContextController : Controller
    {
        [HttpGet("api/context")]
        public object GetContext()
        {
            return new {
                UserName = "FooBar"
            };
        }
    }
}
