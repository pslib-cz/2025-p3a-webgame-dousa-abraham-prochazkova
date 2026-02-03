using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class ZonesGetItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GetItemId",
                table: "Zones",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 1,
                column: "GetItemId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 2,
                column: "GetItemId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 3,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 4,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 5,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 6,
                column: "GetItemId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 7,
                column: "GetItemId",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 8,
                column: "GetItemId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 9,
                column: "GetItemId",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 10,
                column: "GetItemId",
                value: 6);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 11,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 12,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 13,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 14,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 15,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 16,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 17,
                column: "GetItemId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 18,
                column: "GetItemId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Zones_GetItemId",
                table: "Zones",
                column: "GetItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Zones_Items_GetItemId",
                table: "Zones",
                column: "GetItemId",
                principalTable: "Items",
                principalColumn: "ItemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zones_Items_GetItemId",
                table: "Zones");

            migrationBuilder.DropIndex(
                name: "IX_Zones_GetItemId",
                table: "Zones");

            migrationBuilder.DropColumn(
                name: "GetItemId",
                table: "Zones");
        }
    }
}
