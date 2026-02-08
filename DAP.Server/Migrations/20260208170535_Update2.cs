using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class Update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Scene",
                columns: new[] { "UserId", "Scene", "SceneImage" },
                values: new object[] { 10, "Kancelář bez karty", "/images/sc3-office-cardless.png" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 10);
        }
    }
}
