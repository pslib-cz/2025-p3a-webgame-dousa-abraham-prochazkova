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
        public DbSet<Scene> Scenes { get; set; }
        public DbSet<Dialogue> Dialogues { get; set; }
        public DbSet<Minigame> Minigames { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=DAP.sqlite");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            Item medenyDrat = new()
            {
                ItemId = 1,
                ItemName = "Měďený drát",
                ImageURL = "./images/wire.png",
                RoomId = 1
            };
            Item klicRadnice = new()
            {
                ItemId = 2,
                ItemName = "Klíč od radnice",
                ImageURL = "./images/key1.png",
                RoomId = 1
            };
            Item pojistka = new()
            {
                ItemId = 3,
                ItemName = "Pojistka",
                ImageURL = "./images/coil.png",
                RoomId = 2
            };
            Item klicSuplik = new()
            {
                ItemId = 4,
                ItemName = "Klíč od šuplíku",
                ImageURL = "./images/key2.png",
                RoomId = 3
            };
            Item karta = new()
            {
                ItemId = 5,
                ItemName = "Karta",
                ImageURL = "./images/card.png",
                RoomId = 3
            };
            Item hrnekVoda = new()
            {
                ItemId = 6,
                ItemName = "Hrnek s vodou",
                ImageURL = "./images/mug.png",
                RoomId = 3
            };
            Item kombinacePaky = new()
            {
                ItemId = 7,
                ItemName = "Lístek s kombinací pák",
                ImageURL = "./images/levers-comb.png",
                RoomId = 2
            };

            Scene menu = new()
            {
                RoomId = 1,
                RoomName = "Main Menu",
                ImageURL = "./images/sc0-intro.png"
            };
            Scene namesti = new()
            {
                RoomId = 2,
                RoomName = "Náměstí",
                ImageURL = "./images/sc1-square.png"
            };
            Scene recepce = new()
            {
                RoomId = 3,
                RoomName = "Recepce",
                ImageURL = "./images/sc2-hall.png"
            };
            Scene kancelar = new()
            {
                RoomId = 4,
                RoomName = "Kancelář",
                ImageURL = "./images/sc3-office.png"
            };
            Scene trezor = new()
            {
                RoomId = 5,
                RoomName = "Místnost s trezorem",
                ImageURL = "./images/sc4-vault.png"
            };
            Scene konec = new()
            {
                RoomId = 6,
                RoomName = "Vnitřek trezoru",
                ImageURL = "./images/sc5-end.png"
            };
        }
    }
}
