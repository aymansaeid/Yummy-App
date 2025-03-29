using System;
using System.Collections.Generic;

namespace FoodDeliveryAppTest.Server.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int UserId { get; set; }

    public int RestaurantId { get; set; }

    public decimal TotalAmount { get; set; }

    public string? Status { get; set; }

    public DateTime? OrderDate { get; set; }

    public string? PaymentStatus { get; set; }

    public virtual ICollection<Delivery> Deliveries { get; set; } = new List<Delivery>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Restaurant Restaurant { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
