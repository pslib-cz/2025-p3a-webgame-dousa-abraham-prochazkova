using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
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
                name: "Scene",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
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
                    RequiredItemId = table.Column<int>(type: "INTEGER", nullable: true),
                    GetItemId = table.Column<int>(type: "INTEGER", nullable: true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    TargetSceneId = table.Column<int>(type: "INTEGER", nullable: true),
                    ItemId = table.Column<int>(type: "INTEGER", nullable: true),
                    ItemDownId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zones", x => x.ZoneId);
                    table.ForeignKey(
                        name: "FK_Zones_Items_GetItemId",
                        column: x => x.GetItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Zones_Items_ItemDownId",
                        column: x => x.ItemDownId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Zones_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Zones_Items_RequiredItemId",
                        column: x => x.RequiredItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Zones_Scene_TargetSceneId",
                        column: x => x.TargetSceneId,
                        principalTable: "Scene",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Zones_Scene_UserId",
                        column: x => x.UserId,
                        principalTable: "Scene",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "ItemId", "ImageURL", "ItemName", "UserSceneUserId" },
                values: new object[,]
                {
                    { 1, "/images/wire.png", "Měďený drát", null },
                    { 2, "/images/key1.png", "Klíč od radnice", null },
                    { 3, "/images/coil.png", "Pojistka", null },
                    { 4, "/images/key2.png", "Klíč od šuplíku", null },
                    { 5, "/images/card.png", "Karta", null },
                    { 6, "/images/mug.png", "Hrnek s vodou", null },
                    { 7, "/images/levers-comb.png", "Lístek s kombinací pák", null },
                    { 8, "/images/up.png", "Páka nahoře", null },
                    { 9, "/images/down.png", "Páka dole", null }
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
                    { 7, "PhoneOverlay", "/images/phone-overlay.png" },
                    { 8, "DrawerOverlay", "/images/kod.png" },
                    { 9, "LeversOverlay", "/images/levers-bg.png" }
                });

            migrationBuilder.InsertData(
                table: "Zones",
                columns: new[] { "ZoneId", "Bottom", "GetItemId", "Height", "InteractionName", "InteractionType", "ItemDownId", "ItemId", "Left", "RequiredItemId", "TargetSceneId", "UserId", "Width" },
                values: new object[,]
                {
                    { 1, 0m, 1, 22m, "wire", "getItem", null, null, 6m, null, null, 2, 8m },
                    { 2, 0m, 2, 6m, "klic-od-radnice", "getItem", null, null, 35m, 1, null, 2, 12m },
                    { 3, 33m, null, 18m, "Přechod do recepce", "nextScene", null, null, 36m, 2, 3, 2, 7m },
                    { 4, 52m, null, 26m, "7", "phoneClicked", null, null, 2m, 3, null, 3, 7m },
                    { 5, 40m, null, 45m, "Přechod do kanceláře", "nextScene", null, null, 82m, null, 4, 3, 10m },
                    { 6, 40m, 3, 34m, "coil", "getItem", null, null, 62m, null, null, 3, 12m },
                    { 7, 43m, 7, 16m, "levers-comb", "getItem", null, null, 17m, null, null, 3, 28m },
                    { 8, 38m, 4, 27m, "klic-od-supliku", "getItem", null, null, 5m, null, null, 4, 14m },
                    { 9, 30m, 5, 36m, "card", "getItem", null, null, 75m, 1, null, 4, 18m },
                    { 10, 45m, 6, 15m, "mug", "getItem", null, null, 57m, null, null, 4, 7m },
                    { 11, 20m, null, 15m, "Zobrazení šuplíku s kódem", "nextScene", null, null, 62m, 4, 8, 4, 7m },
                    { 12, 27m, null, 40m, "leverSwitch", "prepniPaku", 9, 8, 30m, null, null, 9, 5m },
                    { 13, 27m, null, 40m, "leverSwitch", "prepniPaku", 9, 8, 45m, null, null, 9, 5m },
                    { 14, 27m, null, 40m, "leverSwitch", "prepniPaku", 9, 8, 60m, null, null, 9, 5m },
                    { 15, 27m, null, 40m, "leverSwitch", "prepniPaku", 9, 8, 75m, null, null, 9, 5m },
                    { 16, 39m, null, 13m, "vaultDoors", "finalScene", null, null, 72m, 5, null, 5, 6m },
                    { 17, 52m, null, 15m, "Zobrazení pák", "nextScene", null, null, 20m, null, 9, 5, 15m },
                    { 18, 12m, null, 38m, "generator", "useItem", null, null, 2m, 6, null, 5, 15m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_UserSceneUserId",
                table: "Items",
                column: "UserSceneUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_GetItemId",
                table: "Zones",
                column: "GetItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_ItemDownId",
                table: "Zones",
                column: "ItemDownId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_ItemId",
                table: "Zones",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_RequiredItemId",
                table: "Zones",
                column: "RequiredItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_TargetSceneId",
                table: "Zones",
                column: "TargetSceneId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_UserId",
                table: "Zones",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dialogues");

            migrationBuilder.DropTable(
                name: "Zones");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Scene");
        }
    }
}
