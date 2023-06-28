using Dinner.Api.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Dinner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RestaurantController : ControllerBase
{

    private readonly ILogger<RestaurantController> logger;

    public RestaurantController(ILogger<RestaurantController> logger)
    {
        this.logger = logger;
    }

    [HttpGet(Name = "GetRestaurants")]
    public IEnumerable<Restaurant> Get()
    {
        return Enumerable.Range(1, 20).Select(index => new Restaurant(index, $"Restaurant {index}", new Address("Hauptstra�e", $"{index}", $"City {index}", $"7633{index}", "Deutschland"))
            )
            .ToArray();
    }
}