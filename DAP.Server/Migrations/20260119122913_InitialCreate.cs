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
                    { 6, "Konec", "/images/sc5-end.png" }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "ItemId", "ImageURL", "ItemName", "RoomId" },
                values: new object[,]
                {
                    { 1, "/images/wire.png", "Měďený drát", 1 },
                    { 2, "/images/key1.png", "Klíč od radnice", 1 },
                    { 3, "/images/coil.png", "Pojistka", 2 },
                    { 4, "/images/key2.png", "Klíč od šuplíku", 3 },
                    { 5, "/images/card.png", "Karta", 3 },
                    { 6, "/images/mug.png", "Hrnek s vodou", 3 },
                    { 7, "/images/levers-comb.png", "Lístek s kombinací pák", 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 3);
        }
    }
}
