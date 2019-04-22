using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MyCompany.MyStack.MyRestApp
{
    public class ValuesController : Controller
    {
        [HttpGet("api/jsonserialization")]
        public object GetJsonSerialization()
        {
            return new {
                PascalCaseProperty = "value",
                camelCaseProperty = "value",
                dictionary = new Dictionary<string, object> {
                    ["PascalCaseKey"] = "value",
                    ["camelCaseKey"] = "value"
                },
                array = new[]{ "value1", "value2" },
                utcDateTime = new DateTime(2018, 5, 11, 8, 20, 31, 123, DateTimeKind.Utc),
                localDateTime = new DateTime(2018, 5, 11, 8, 20, 31, 123, DateTimeKind.Local),
            };
        }
    }
}
