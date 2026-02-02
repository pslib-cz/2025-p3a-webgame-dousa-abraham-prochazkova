using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Drawing;
using System.Reflection.Emit;
using DAP.Server.Models;

namespace DAP.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
        public DbSet<Item> Items { get; set; }
        public DbSet<UserScene> Scene { get; set; }
        public DbSet<Dialogue> Dialogues { get; set; }
        public DbSet<Minigame> Minigames { get; set; }
        public DbSet <Zones> Zones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        

            Item medenyDrat = new()
            {
                ItemId = 1,
                ItemName = "Měďený drát",
                ImageURL = "/images/wire.png",
                UserId = 1
            };
            Item klicRadnice = new()
            {
                ItemId = 2,
                ItemName = "Klíč od radnice",
                ImageURL = "/images/key1.png",
                UserId = 1
            };
            Item pojistka = new()
            {
                ItemId = 3,
                ItemName = "Pojistka",
                ImageURL = "/images/coil.png",
                UserId = 2
            };
            Item klicSuplik = new()
            {
                ItemId = 4,
                ItemName = "Klíč od šuplíku",
                ImageURL = "/images/key2.png",
                UserId = 3
            };
            Item karta = new()
            {
                ItemId = 5,
                ItemName = "Karta",
                ImageURL = "/images/card.png",
                UserId = 3
            };
            Item hrnekVoda = new()
            {
                ItemId = 6,
                ItemName = "Hrnek s vodou",
                ImageURL = "/images/mug.png",
                UserId = 3
            };
            Item kombinacePaky = new()
            {
                ItemId = 7,
                ItemName = "Lístek s kombinací pák",
                ImageURL = "/images/levers-comb.png",
                UserId = 2
            };

            UserScene menu = new()
            {
                UserId = 1,
                Scene = "Main Menu",
                SceneImage = "/images/sc0-intro.png"
            };
            UserScene namesti = new()
            {
                UserId = 2,
                Scene = "Náměstí",
                SceneImage = "/images/sc1-square.png"
            };
            UserScene recepce = new()
            {
                UserId = 3,
                Scene = "Recepce",
                SceneImage = "/images/sc2-hall.png"
            };
            UserScene kancelar = new()
            {
                UserId = 4,
                Scene = "Kancelář",
                SceneImage = "/images/sc3-office.png"
            };
            UserScene trezor = new()
            {
                UserId = 5,
                Scene = "Trezor",
                SceneImage = "/images/sc4-vault.png"
            };
            UserScene konec = new()
            {
                UserId = 6,
                Scene = "Konec",
                SceneImage = "/images/sc5-end.png"
            };
            UserScene phone = new()
            {
                UserId = 7,
                Scene = "PhoneOverlay",
                SceneImage = "/images/phone-overlay.png"
            };
            UserScene drawer = new()
            {
                UserId = 8,
                Scene = "DrawerOverlay",
                SceneImage = "/images/kod.png"
            };
            UserScene levers = new()
            {
                UserId = 9,
                Scene = "LeversOverlay",
                SceneImage = "/images/levers-bg.png"
            };

            //Zones
            Zones zone1 = new()
            {
                ZoneId = 1,
                Bottom = 0,
                Left = 6,
                Width = 8,
                Height = 22,
                InteractionName = "wire",
                InteractionType = "getItem",
                UserId = 2
            };

            Zones zone2 = new()
            {
                ZoneId = 2,
                Bottom = 0,
                Left = 35,
                Width = 12,
                Height = 6,
                InteractionName = "klic-od-radnice",
                InteractionType = "getItem",
                RequiredItem = "wire",
                UserId = 2
            };

            Zones zone3 = new()
            {
                ZoneId = 3,
                Bottom = 33,
                Left = 36,
                Width = 7,
                Height = 18,
                InteractionName = "3",
                InteractionType = "nextScene",
                RequiredItem = "klic-od-radnice",
                UserId = 2
            };

            Zones zone4 = new()
            {
                ZoneId = 4,
                Bottom = 52,
                Left = 2,
                Width = 7,
                Height = 26,
                InteractionName = "7",
                InteractionType = "nextScene",
                RequiredItem = "coil",
                UserId = 3
            };

            Zones zone5 = new()
            {
                ZoneId = 5,
                Bottom = 40,
                Left = 82,
                Width = 10,
                Height = 45,
                InteractionName = "3",
                InteractionType = "nextScene",
                UserId = 3
            };

            Zones zone6 = new()
            {
                ZoneId = 6,
                Bottom = 40,
                Left = 62,
                Width = 12,
                Height = 34,
                InteractionName = "coil",
                InteractionType = "getItem",
                UserId = 3
            };

            Zones zone7 = new()
            {
                ZoneId = 7,
                Bottom = 43,
                Left = 17,
                Width = 28,
                Height = 16,
                InteractionName = "levers-comb",
                InteractionType = "getItem",
                UserId = 3
            };

            Zones zone8 = new()
            {
                ZoneId = 8,
                Bottom = 38,
                Left = 5,
                Width = 14,
                Height = 27,
                InteractionName = "klic-od-supliku",
                InteractionType = "getItem",
                UserId = 4
            };

            Zones zone9 = new()
            {
                ZoneId = 9,
                Bottom = 30,
                Left = 75,
                Width = 18,
                Height = 36,
                InteractionName = "card",
                InteractionType = "getItem",
                RequiredItem = "wire",
                UserId = 4
            };

            Zones zone10 = new()
            {
                ZoneId = 10,
                Bottom = 45,
                Left = 57,
                Width = 7,
                Height = 15,
                InteractionName = "mug",
                InteractionType = "getItem",
                UserId = 4
            };

            Zones zone11 = new()
            {
                ZoneId = 11,
                Bottom = 20,
                Left = 62,
                Width = 7,
                Height = 15,
                InteractionName = "8",
                InteractionType = "nextScene",
                RequiredItem = "klic-od-supliku",
                UserId = 4
            };
            //Levers scene 9
            Zones zone12 = new()
            {
                ZoneId = 12,
                Bottom = 27,
                Left = 30,
                Width = 5,
                Height = 40,
                InteractionName = "leverSwitch",
                InteractionType = "prepniPaku",
                UserId = 9
            };

            Zones zone13 = new()
            {
                ZoneId = 13,
                Bottom = 27,
                Left = 45,
                Width = 5,
                Height = 40,
                InteractionName = "leverSwitch",
                InteractionType = "prepniPaku",
                UserId = 9
            };

            Zones zone14 = new()
            {
                ZoneId = 14,
                Bottom = 27,
                Left = 60,
                Width = 5,
                Height = 40,
                InteractionName = "leverSwitch",
                InteractionType = "prepniPaku",
                UserId = 9
            };

            Zones zone15 = new()
            {
                ZoneId = 15,
                Bottom = 27,
                Left = 75,
                Width = 5,
                Height = 40,
                InteractionName = "leverSwitch",
                InteractionType = "prepniPaku",
                UserId = 9
            };

            Zones zone16 = new()
            {
                ZoneId = 16,
                Bottom = 39,
                Left = 72,
                Width = 6,
                Height = 13,
                InteractionName = "vaultDoors",
                InteractionType = "finalScene",
                RequiredItem = "card",
                UserId = 5
            };

            Zones zone17 = new()
            {
                ZoneId = 17,
                Bottom = 52,
                Left = 20,
                Width = 15,
                Height = 15,
                InteractionName = "9",
                InteractionType = "nextScene",
                UserId = 5
            };

            Zones zone18 = new()
            {
                ZoneId = 18,
                Bottom = 12,
                Left = 2,
                Width = 15,
                Height = 38,
                InteractionName = "generator",
                InteractionType = "useItem",
                RequiredItem = "mug",
                UserId = 5
            };

            modelBuilder.Entity<Zones>().HasData(
                zone1,
                zone2,
                zone3,
                zone4,
                zone5,
                zone6,
                zone7,
                zone8,
                zone9,
                zone10,
                zone11,
                zone12,
                zone13,
                zone14,
                zone15,
                zone16,
                zone17,
                zone18
            );

            modelBuilder.Entity<Item>().HasData(
                medenyDrat,
                klicRadnice,
                pojistka,
                klicSuplik,
                karta,
                hrnekVoda,
                kombinacePaky
            );

            modelBuilder.Entity<UserScene>().HasData(
                menu,
                namesti,
                recepce,
                kancelar,
                trezor,
                konec,
                phone,
                drawer,
                levers
            );
        }
    }
}
