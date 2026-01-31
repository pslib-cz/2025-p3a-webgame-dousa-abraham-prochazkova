using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dialogues",
                columns: table => new
                {
                    DialogueId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DialogueText = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dialogues", x => x.DialogueId);
                });

            migrationBuilder.CreateTable(
                name: "Minigames",
                columns: table => new
                {
                    MinigameId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MinigameName = table.Column<string>(type: "TEXT", nullable: false),
                    MinigameDesc = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Minigames", x => x.MinigameId);
                });

            migrationBuilder.CreateTable(
                name: "Scene",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Scene = table.Column<string>(type: "TEXT", nullable: false),
                    SceneImage = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scene", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ItemName = table.Column<string>(type: "TEXT", nullable: false),
                    ImageURL = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserSceneUserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemId);
                    table.ForeignKey(
                        name: "FK_Items_Scene_UserSceneUserId",
                        column: x => x.UserSceneUserId,
                        principalTable: "Scene",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "Zones",
                columns: table => new
                {
                    ZoneId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Bottom = table.Column<decimal>(type: "TEXT", nullable: false),
                    Left = table.Column<decimal>(type: "TEXT", nullable: false),
                    Width = table.Column<decimal>(type: "TEXT", nullable: false),
                    Height = table.Column<decimal>(type: "TEXT", nullable: false),
                    InteractionName = table.Column<string>(type: "TEXT", nullable: false),
                    InteractionType = table.Column<string>(type: "TEXT", nullable: false),
                    RequiredItem = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserSceneUserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zones", x => x.ZoneId);
                    table.ForeignKey(
                        name: "FK_Zones_Scene_UserSceneUserId",
                        column: x => x.UserSceneUserId,
                        principalTable: "Scene",
                        principalColumn: "UserId");
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "ItemId", "ImageURL", "ItemName", "UserId", "UserSceneUserId" },
                values: new object[,]
                {
                    { 1, "/images/wire.png", "Měďený drát", 1, null },
                    { 2, "/images/key1.png", "Klíč od radnice", 1, null },
                    { 3, "/images/coil.png", "Pojistka", 2, null },
                    { 4, "/images/key2.png", "Klíč od šuplíku", 3, null },
                    { 5, "/images/card.png", "Karta", 3, null },
                    { 6, "/images/mug.png", "Hrnek s vodou", 3, null },
                    { 7, "/images/levers-comb.png", "Lístek s kombinací pák", 2, null }
                });

            migrationBuilder.InsertData(
                table: "Scene",
                columns: new[] { "UserId", "Scene", "SceneImage" },
                values: new object[,]
                {
                    { 1, "Main Menu", "/images/sc0-intro.png" },
                    { 2, "Náměstí", "/images/sc1-square.png" },
                    { 3, "Recepce", "/images/sc2-hall.png" },
                    { 4, "Kancelář", "/images/sc3-office.png" },
                    { 5, "Trezor", "/images/sc4-vault.png" },
                    { 6, "Konec", "/images/sc5-end.png" },
                    { 7, "PhoneOverlay", "/images/phone-oerlay.png" },
                    { 8, "DrawerOverlay", "/images/kod.png" },
                    { 9, "LeversOverlay", "/images/levers-bg.png" }
                });

            migrationBuilder.InsertData(
                table: "Zones",
                columns: new[] { "ZoneId", "Bottom", "Height", "InteractionName", "InteractionType", "Left", "RequiredItem", "UserId", "UserSceneUserId", "Width" },
                values: new object[,]
                {
                    { 1, 0m, 22m, "wire", "getItem", 6m, null, 1, null, 8m },
                    { 2, 0m, 6m, "klic-od-radnice", "getItem", 35m, "wire", 1, null, 12m },
                    { 3, 33m, 18m, "dvereRadnice", "useItem", 36m, "klic-od-radnice", 1, null, 7m },
                    { 4, 52m, 26m, "phoneOverlay", "nextScene", 2m, "coil", 2, null, 7m },
                    { 5, 40m, 45m, "DoorSc3", "nextScene", 82m, null, 2, null, 10m },
                    { 6, 40m, 34m, "coil", "getItem", 62m, null, 2, null, 12m },
                    { 7, 43m, 16m, "levers-comb", "getItem", 17m, null, 2, null, 28m },
                    { 8, 38m, 27m, "klic-od-supliku", "getItem", 5m, null, 3, null, 14m },
                    { 9, 30m, 36m, "card", "getItem", 75m, "wire", 3, null, 18m },
                    { 10, 45m, 15m, "mug", "getItem", 57m, null, 3, null, 7m },
                    { 11, 20m, 15m, "drawer", "nextScene", 62m, "klic-od-supliku", 3, null, 7m },
                    { 12, 27m, 40m, "leverSwitch", "prepniPaku", 30m, null, 9, null, 5m },
                    { 13, 27m, 40m, "leverSwitch", "prepniPaku", 45m, null, 9, null, 5m },
                    { 14, 27m, 40m, "leverSwitch", "prepniPaku", 60m, null, 9, null, 5m },
                    { 15, 27m, 40m, "leverSwitch", "prepniPaku", 75m, null, 9, null, 5m },
                    { 16, 39m, 13m, "vaultDoors", "finalScene", 72m, "card", 4, null, 6m },
                    { 17, 52m, 15m, "leversOverlay", "nextScene", 20m, null, 4, null, 15m },
                    { 18, 12m, 38m, "generator", "useItem", 2m, "mug", 4, null, 15m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_UserSceneUserId",
                table: "Items",
                column: "UserSceneUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_UserSceneUserId",
                table: "Zones",
                column: "UserSceneUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dialogues");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Minigames");

            migrationBuilder.DropTable(
                name: "Zones");

            migrationBuilder.DropTable(
                name: "Scene");
        }
    }
}
