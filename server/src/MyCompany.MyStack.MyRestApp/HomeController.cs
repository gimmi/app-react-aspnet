using Microsoft.AspNetCore.Mvc;

namespace MyCompany.MyStack.MyRestApp
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // ~/ match {Content Root}/wwwroot
            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/index?view=aspnetcore-2.2&tabs=windows#web-root
            return File("~/index.html", "text/html");
        }

    }
}