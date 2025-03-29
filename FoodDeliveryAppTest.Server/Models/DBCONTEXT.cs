using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryAppTest.Server.Models;

public partial class DBCONTEXT : DbContext
{
    public DBCONTEXT()
    {
    }

    public DBCONTEXT(DbContextOptions<DBCONTEXT> options)
        : base(options)
    {
    }

    public virtual DbSet<Delivery> Deliveries { get; set; }

    public virtual DbSet<MenuItem> MenuItems { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Restaurant> Restaurants { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Delivery>(entity =>
        {
            entity.HasKey(e => e.DeliveryId).HasName("PK__Delivery__626D8FEE79239770");

            entity.ToTable("Delivery");

            entity.Property(e => e.DeliveryId).HasColumnName("DeliveryID");
            entity.Property(e => e.DeliveryPersonId).HasColumnName("DeliveryPersonID");
            entity.Property(e => e.DeliveryTime).HasColumnType("datetime");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("Assigned");

            entity.HasOne(d => d.DeliveryPerson).WithMany(p => p.Deliveries)
                .HasForeignKey(d => d.DeliveryPersonId)
                .HasConstraintName("FK__Delivery__Delive__5CD6CB2B");

            entity.HasOne(d => d.Order).WithMany(p => p.Deliveries)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Delivery__OrderI__5BE2A6F2");
        });

        modelBuilder.Entity<MenuItem>(entity =>
        {
            entity.HasKey(e => e.ItemId).HasName("PK__MenuItem__727E83EB6F00A888");

            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.Availability).HasDefaultValue(true);
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("ImageURL");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.RestaurantId).HasColumnName("RestaurantID");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.MenuItems)
                .HasForeignKey(d => d.RestaurantId)
                .HasConstraintName("FK__MenuItems__Resta__403A8C7D");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAFA880A133");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.OrderDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PaymentStatus)
                .HasMaxLength(20)
                .HasDefaultValue("Unpaid");
            entity.Property(e => e.RestaurantId).HasColumnName("RestaurantID");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("Pending");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.Orders)
                .HasForeignKey(d => d.RestaurantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__Restaura__52593CB8");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__UserID__5165187F");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30CC60CFE1F");

            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");
            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.Subtotal).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Item).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ItemId)
                .HasConstraintName("FK__OrderDeta__ItemI__571DF1D5");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__OrderDeta__Order__5629CD9C");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payments__9B556A583BC6B311");

            entity.HasIndex(e => e.TransactionId, "UQ__Payments__55433A4A3AB67435").IsUnique();

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.AmountPaid).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.PaymentMethod).HasMaxLength(20);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("Pending");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(255)
                .HasColumnName("TransactionID");

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Payments__OrderI__6383C8BA");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.PromoId).HasName("PK__Promotio__33D334D097835632");

            entity.HasIndex(e => e.Code, "UQ__Promotio__A25C5AA7072404D4").IsUnique();

            entity.Property(e => e.PromoId).HasColumnName("PromoID");
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.DiscountAmount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.MinOrderAmount).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<Restaurant>(entity =>
        {
            entity.HasKey(e => e.RestaurantId).HasName("PK__Restaura__87454CB5D5E4EFFD");

            entity.Property(e => e.RestaurantId).HasColumnName("RestaurantID");
            entity.Property(e => e.Logo).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.OpeningHours).HasMaxLength(255);
            entity.Property(e => e.OwnerId).HasColumnName("OwnerID");
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.Rating)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(2, 1)");

            entity.HasOne(d => d.Owner).WithMany(p => p.Restaurants)
                .HasForeignKey(d => d.OwnerId)
                .HasConstraintName("FK__Restauran__Owner__3C69FB99");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("PK__Reviews__74BC79AE2B5633A0");

            entity.Property(e => e.ReviewId).HasColumnName("ReviewID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.RestaurantId).HasColumnName("RestaurantID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.RestaurantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Reviews__Restaur__6EF57B66");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Reviews__UserID__6E01572D");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC4A51C604");

            entity.HasIndex(e => e.PhoneNumber, "UQ__Users__85FB4E38A54E0483").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Users__A9D10534F3713ECD").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.Role).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
