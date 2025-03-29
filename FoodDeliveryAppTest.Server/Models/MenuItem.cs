using System;
using System.Collections.Generic;

namespace FoodDeliveryAppTest.Server.Models;

public partial class MenuItem
{
    public int ItemId { get; set; }

    public int RestaurantId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public string Category { get; set; } = null!;

    public bool? Availability { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual Restaurant Restaurant { get; set; } = null!;
}
