using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Drawing;
using System.Reflection.Emit;
using DAP.Server.Models;

namespace DAP.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly ApplicationDbContext _context;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
        public DbSet<Item> Items { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=UsAgainstTheOdds.sqlite");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            Item medenyDrat = new()
            {
                ItemId = 1,
                ItemName = "Měďený drát",
                RoomId = 1
            };
            Item klicRadnice = new()
            {
                ItemId = 2,
                ItemName = "Klíč od radnice",
                RoomId = 1
            };
            Item pojistka = new()
            {
                ItemId = 3,
                ItemName = "Pojistka",
                RoomId = 2
            };
            Item klicSuplik = new()
            {
                ItemId = 4,
                ItemName = "Klíč od šuplíku",
                RoomId = 3
            };
            Item karta = new()
            {
                ItemId = 5,
                ItemName = "Karta",
                RoomId = 3
            };
            Item hrnekVoda = new()
            {
                ItemId = 6,
                ItemName = "Hrnek s vodou",
                RoomId = 3
            };
            Item kombinacePaky = new()
            {
                ItemId = 7,
                ItemName = "Lístek s kombinací pák",
                RoomId = 2
            };

            Scene menu = new()
            {
                RoomId = 1,
                RoomName = "Main Menu"
            };
            Scene namesti = new()
            {
                RoomId = 2,
                RoomName = "Náměstí"
            };
            Scene recepce = new()
            {
                RoomId = 3,
                RoomName = "Recepce"
            };
            Scene kancelar = new()
            {
                RoomId = 4,
                RoomName = "Kancelář"
            };
            Scene trezor = new()
            {
                RoomId = 5,
                RoomName = "Místnost s trezorem"
            };
            Scene konec = new()
            {
                RoomId = 6,
                RoomName = "Vnitřek trezoru"
            };
        }
    }
}
