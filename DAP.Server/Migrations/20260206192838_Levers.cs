using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class Levers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SceneId",
                table: "Items",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserSceneUserId",
                table: "Items",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 1,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 2,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 3,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 4,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 5,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 6,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 7,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 8,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { 9, null });

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "ItemId",
                keyValue: 9,
                columns: new[] { "SceneId", "UserSceneUserId" },
                values: new object[] { 9, null });

            migrationBuilder.CreateIndex(
                name: "IX_Items_UserSceneUserId",
                table: "Items",
                column: "UserSceneUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Scene_UserSceneUserId",
                table: "Items",
                column: "UserSceneUserId",
                principalTable: "Scene",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Scene_UserSceneUserId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_UserSceneUserId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "SceneId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "UserSceneUserId",
                table: "Items");
        }
    }
}
