using System;
using System.Collections.Generic;

namespace FoodDeliveryAppTest.Server.Models;

public partial class Promotion
{
    public int PromoId { get; set; }

    public string Code { get; set; } = null!;

    public decimal DiscountAmount { get; set; }

    public DateOnly ExpirationDate { get; set; }

    public decimal MinOrderAmount { get; set; }
}
