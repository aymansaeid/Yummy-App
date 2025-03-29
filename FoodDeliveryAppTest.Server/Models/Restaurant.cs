using System;
using System.Collections.Generic;

namespace FoodDeliveryAppTest.Server.Models;

public partial class Restaurant
{
    public int RestaurantId { get; set; }

    public int OwnerId { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public decimal? Rating { get; set; }

    public string OpeningHours { get; set; } = null!;

    public string? Logo { get; set; }

    public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User Owner { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
