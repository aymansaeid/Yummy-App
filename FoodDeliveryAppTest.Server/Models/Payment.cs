using System;
using System.Collections.Generic;

namespace FoodDeliveryAppTest.Server.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int OrderId { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public decimal AmountPaid { get; set; }

    public string? TransactionId { get; set; }

    public string? Status { get; set; }

    public virtual Order Order { get; set; } = null!;
}
