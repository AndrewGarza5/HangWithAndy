using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hangwithandyapi.Controllers
{
    [ApiController]
    [Route("hang-out")]
    public class HangOutController : Controller
    {
        [HttpGet]
        public string Get()
        {
            
            return "";
        }

        [HttpPost]
        public async void Post([FromBody] Models.HangOut hangOut)
        {
            Console.WriteLine("*****************************");
            Console.WriteLine(hangOut);
            return;
        }

        [HttpDelete]
        public string Delete()
        {
            var rng = new Random();
            return "";
        }
    }
}
