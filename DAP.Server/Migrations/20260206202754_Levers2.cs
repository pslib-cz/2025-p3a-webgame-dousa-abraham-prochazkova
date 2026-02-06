using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class Levers2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SceneId",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "ItemDownId",
                table: "Zones",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Zones",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 1,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 2,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 3,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 4,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 5,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 6,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 7,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 8,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 9,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 10,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 11,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 12,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { 9, 8 });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 13,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { 9, 8 });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 14,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { 9, 8 });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 15,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { 9, 8 });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 16,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 17,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "ZoneId",
                keyValue: 18,
                columns: new[] { "ItemDownId", "ItemId" },
                values: new object[] { null, null });

            migrationBuilder.CreateIndex(
                name: "IX_Zones_ItemDownId",
                table: "Zones",
                column: "ItemDownId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_ItemId",
                table: "Zones",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Zones_Items_ItemDownId",
                table: "Zones",
                column: "ItemDownId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Zones_Items_ItemId",
                table: "Zones",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zones_Items_ItemDownId",
                table: "Zones");

            migrationBuilder.DropForeignKey(
                name: "FK_Zones_Items_ItemId",
                table: "Zones");

            migrationBuilder.DropIndex(
                name: "IX_Zones_ItemDownId",
                table: "Zones");

            migrationBuilder.DropIndex(
                name: "IX_Zones_ItemId",
                table: "Zones");

            migrationBuilder.DropColumn(
                name: "ItemDownId",
                table: "Zones");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Zones");

            migrationBuilder.AddColumn<int>(
                name: "SceneId",
                table: "Items",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 1,
                column: "SceneId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 2,
                column: "SceneId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 3,
                column: "SceneId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 4,
                column: "SceneId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 5,
                column: "SceneId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 6,
                column: "SceneId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 7,
                column: "SceneId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 8,
                column: "SceneId",
                value: 9);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 9,
                column: "SceneId",
                value: 9);
        }
    }
}
