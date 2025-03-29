using System;
using System.Collections.Generic;

namespace FoodDeliveryAppTest.Server.Models;

public partial class Delivery
{
    public int DeliveryId { get; set; }

    public int OrderId { get; set; }

    public int DeliveryPersonId { get; set; }

    public string? Status { get; set; }

    public DateTime? DeliveryTime { get; set; }

    public virtual User DeliveryPerson { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
